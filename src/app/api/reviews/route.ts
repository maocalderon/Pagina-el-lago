import { NextResponse, type NextRequest } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

import { ensureReviewsTable, getMysqlPool } from "@/lib/mysql";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ReviewRow = RowDataPacket & {
  id: number;
  name: string;
  rating: number;
  comment: string;
  createdAt: Date | string | null;
};

function formatReview(row: ReviewRow) {
  return {
    id: String(row.id),
    name: row.name,
    rating: Number(row.rating),
    comment: row.comment,
    createdAt: row.createdAt ? new Date(row.createdAt).toISOString() : null
  };
}

function validateReviewBody(body: unknown) {
  if (!body || typeof body !== "object") {
    return null;
  }

  const values = body as {
    name?: unknown;
    rating?: unknown;
    comment?: unknown;
  };

  const name = typeof values.name === "string" ? values.name.trim() : "";
  const rating = Number(values.rating);
  const comment =
    typeof values.comment === "string" ? values.comment.trim() : "";

  if (
    name.length < 2 ||
    name.length > 80 ||
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5 ||
    comment.length < 2 ||
    comment.length > 500
  ) {
    return null;
  }

  return {
    name,
    rating,
    comment
  };
}

export async function GET() {
  try {
    await ensureReviewsTable();

    const [rows] = await getMysqlPool().execute<ReviewRow[]>(
      `
        SELECT
          id,
          name,
          rating,
          comment,
          created_at AS createdAt
        FROM reviews
        WHERE approved = TRUE
        ORDER BY created_at DESC
        LIMIT 8;
      `
    );

    return NextResponse.json({
      reviews: rows.map(formatReview)
    });
  } catch (error) {
    console.error("Error loading reviews", error);

    return NextResponse.json(
      { error: "No se pudieron cargar las reseñas." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const review = validateReviewBody(body);

    if (!review) {
      return NextResponse.json(
        { error: "Completa tu nombre, calificación y comentario." },
        { status: 400 }
      );
    }

    await ensureReviewsTable();

    const [result] = await getMysqlPool().execute<ResultSetHeader>(
      `
        INSERT INTO reviews (name, rating, comment, approved)
        VALUES (?, ?, ?, TRUE);
      `,
      [review.name, review.rating, review.comment]
    );

    const [rows] = await getMysqlPool().execute<ReviewRow[]>(
      `
        SELECT
          id,
          name,
          rating,
          comment,
          created_at AS createdAt
        FROM reviews
        WHERE id = ?
        LIMIT 1;
      `,
      [result.insertId]
    );

    return NextResponse.json(
      {
        review: rows[0] ? formatReview(rows[0]) : null
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving review", error);

    return NextResponse.json(
      { error: "No se pudo guardar la reseña." },
      { status: 500 }
    );
  }
}
