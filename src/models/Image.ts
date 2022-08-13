import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"

@Entity("images")
class Image {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  img_url?: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Image
