import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"

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

  // @Column()
  // password: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default User