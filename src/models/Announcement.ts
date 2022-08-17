import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm"

import Comment from "./Comment"
import User from "./User"
import Image from "./Image"

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

  @Column()
  is_active: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @OneToMany(() => Comment, (comment) => comment.announcement)
  comments: Comment[]

  @ManyToOne(() => User, (user) => user.announcements)
  user: User

  @OneToMany(() => Image, (image) => image.announcement)
  images: Image[]
}

export default Announcement
