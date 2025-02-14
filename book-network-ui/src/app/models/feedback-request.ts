export interface FeedbackRequest {
  bookId: number;
  comments: string;
  rating?: number;
}
