import { AppDataSource } from '../../data-source';
import Comment from '../../models/Comment';

const getCommentsService = async () => {
  const commentRepository = AppDataSource.getRepository(Comment);

  const comments = await commentRepository.find();

  return comments;
};

export default getCommentsService;
