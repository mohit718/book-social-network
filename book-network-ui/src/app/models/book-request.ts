export interface BookRequest {
  archived?: boolean;
  authorName: string;
  bookCover?: string;
  id?: number;
  isbn: string;
  shareable?: boolean;
  synopsis: string;
  title: string;
}
