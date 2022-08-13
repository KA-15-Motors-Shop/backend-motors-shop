import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"

@Entity("addresses")
class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  zipcode: string

  @Column()
  street: string

  @Column()
  detail: string

  @Column()
  state: string

  @Column()
  city: string

  @Column()
  additional: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Address
