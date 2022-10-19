import Announcement from '../models/Announcement';
import Comment from '../models/Comment';

// import Vehicle from "../models/Vehicle";
import { formatedCommentResponse } from './formatedCommentResponse';

interface Props {
  announcement: Announcement;
  comments: Comment[];
}

export const formatedResponse = ({ announcement, comments }: Props) => {
  const messages = comments.map((comment) => {
    if (comment.announcement.id === announcement.id) {
      return formatedCommentResponse({ comment });
    }
  });

  const formatedAnnouncement = {
    id: announcement.id,
    title: announcement.title,
    vehicle_type: announcement.type_of_vehicle,
    announcement_type: announcement.type_of_ad,
    year: announcement.year,
    km: announcement.km,
    price: announcement.price,
    description: announcement.description,
    is_published: announcement.is_published,
    owner: {
      id: announcement.user.id,
      name: announcement.user.name,
      description: announcement.user.description,
      cel: announcement.user.phone,
    },
    comments: messages.filter((message) => message != undefined),
  };

  return formatedAnnouncement;
};
