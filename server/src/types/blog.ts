export interface BlogComment {
  id: string;
  slug: string;
  name: string;
  body: string;
  createdAt: string;
}

export interface BlogCommentInput {
  name: string;
  email: string;
  body: string;
}

export interface BlogCommentsResponse {
  success: boolean;
  comments: BlogComment[];
}

export interface BlogCommentSubmitResponse {
  success: boolean;
  message: string;
  comment?: BlogComment;
}
