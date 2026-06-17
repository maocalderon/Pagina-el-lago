import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  where,
  type Timestamp
} from "firebase/firestore";

import { getFirestoreDb } from "@/lib/firebase";
import type {
  ApprovedReview,
  ReservationInput,
  ReviewInput
} from "@/types/firestore";

export async function createReservation(data: ReservationInput) {
  const db = getFirestoreDb();

  if (!db) {
    throw new Error("Firebase no está configurado.");
  }

  await addDoc(collection(db, "reservations"), {
    ...data,
    status: "pending",
    createdAt: serverTimestamp()
  });
}

export async function createReview(data: ReviewInput) {
  const db = getFirestoreDb();

  if (!db) {
    throw new Error("Firebase no está configurado.");
  }

  await addDoc(collection(db, "reviews"), {
    ...data,
    approved: false,
    createdAt: serverTimestamp()
  });
}

export async function fetchApprovedReviews(): Promise<ApprovedReview[]> {
  const db = getFirestoreDb();

  if (!db) {
    return [];
  }

  const reviewsQuery = query(
    collection(db, "reviews"),
    where("approved", "==", true),
    orderBy("createdAt", "desc"),
    limit(8)
  );

  const snapshot = await getDocs(reviewsQuery);

  return snapshot.docs.map((doc) => {
    const data = doc.data() as {
      name?: string;
      rating?: number;
      comment?: string;
      createdAt?: Timestamp;
    };

    return {
      id: doc.id,
      name: data.name || "Cliente",
      rating: data.rating || 5,
      comment: data.comment || "",
      createdAt: data.createdAt?.toDate() ?? null
    };
  });
}
