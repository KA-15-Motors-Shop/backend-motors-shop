import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm"

import Comment from "./Comment"

@Entity("announcements")
class Announcement {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  announcement_type: string

  @Column()
  title: string

  @Column()
  year: string

  @Column()
  km: number

  @Column()
  price: number

  @Column()
  vehicle_type: string

  @Column()
  description: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @OneToMany(() => Comment, (comment) => comment.announcement)
  comments: Comment[]
}

export default Announcement
