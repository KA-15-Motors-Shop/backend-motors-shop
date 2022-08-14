import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm"

import Comment from "./Comment"
import Announcement from "./Announcement"
import Address from "./Address"

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  cpf: string

  @Column()
  phone: string

  @Column()
  birth_date: Date

  @Column()
  description: string

  @Column()
  account_type: string

  @Column()
  password: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[]

  @OneToMany(() => Announcement, (announcement) => announcement.user)
  announcements: Announcement[]

  @ManyToMany(() => Address)
  @JoinTable()
  addresses: Address[]
}

export default User
