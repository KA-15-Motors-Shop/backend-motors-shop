import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Announcement from './Announcement';
import { User } from './User';

@Entity('comments')
class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Announcement, (announcement) => announcement.comments)
  @JoinColumn()
  announcement: Announcement;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn()
  user: User;
}
export default Comment;
