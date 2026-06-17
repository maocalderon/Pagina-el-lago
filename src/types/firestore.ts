export type ReservationInput = {
  name: string;
  phone: string;
  email: string;
  people: number;
  date: string;
  time: string;
  comments: string;
};

export type ReviewInput = {
  name: string;
  rating: number;
  comment: string;
};

export type ApprovedReview = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt?: Date | null;
};
