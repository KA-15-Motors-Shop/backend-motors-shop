import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm"

import Announcement from "./Announcement"
import User from "./User"

@Entity("comments")
class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  text: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @ManyToOne(() => Announcement, (announcement) => announcement.comments)
  announcement: Announcement

  @ManyToOne(() => User, (user) => user.comments)
  user: User
}

export default Comment
