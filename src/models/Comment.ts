import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"

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
}

export default Comment
