import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"

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
}

export default Announcement
