import Comment from '../models/Comment';

interface Props {
  comment: Comment;
}

export const formatedCommentResponse = ({ comment }: Props) => {
  const formatedResponse = {
    id: comment.id,
    text: comment.text,
    created_at: comment.created_at,
    owner: {
      id: comment.user.id,
      name: comment.user.name,
    },
  };

  return formatedResponse;
};
