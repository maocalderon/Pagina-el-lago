import type { ApprovedReview, ReviewInput } from "@/types/firestore";

type ApiReview = Omit<ApprovedReview, "createdAt"> & {
  createdAt?: string | null;
};

function toReview(review: ApiReview): ApprovedReview {
  return {
    ...review,
    createdAt: review.createdAt ? new Date(review.createdAt) : null
  };
}

export async function fetchApprovedReviews(): Promise<ApprovedReview[]> {
  const response = await fetch("/api/reviews", {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("No se pudieron cargar las reseñas.");
  }

  const data = (await response.json()) as { reviews?: ApiReview[] };

  return Array.isArray(data.reviews) ? data.reviews.map(toReview) : [];
}

export async function createReview(data: ReviewInput): Promise<ApprovedReview> {
  const response = await fetch("/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("No se pudo guardar la reseña.");
  }

  const result = (await response.json()) as { review?: ApiReview };

  if (!result.review) {
    throw new Error("La respuesta de reseñas no fue válida.");
  }

  return toReview(result.review);
}
