import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import Comment from './Comment';
import Announcement from './Announcement';
import Address from './Address';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column()
  phone: string;

  @Column()
  birth_date: string;

  @Column()
  description: string;

  @Column()
  account_type: string;

  @Exclude()
  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne((type) => Address, {
    eager: true,
  })
  @JoinColumn()
  address: Address;

  @OneToMany(() => Comment, (comment) => comment.user)
  @JoinColumn()
  comments: Comment[];

  @OneToMany(() => Announcement, (announcement) => announcement.user, {
    eager: true,
  })
  @JoinColumn()
  announcements: Announcement[];
}
