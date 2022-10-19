import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
// import { VehicleType, AnnouncementType } from '../interfaces';
import Comment from './Comment';
import { User } from './User';
// import Image from './Image';

@Entity('announcements')
class Announcement {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  // @Column({ type: 'text' })
  // announcement_type: string;

  @Column()
  type_of_ad: string;

  // @Column({
  //   type: 'enum',
  //   enum: AnnouncementType,
  //   default: AnnouncementType.VENDA,
  // })
  // announcement_type: AnnouncementType;

  @Column()
  title: string;

  @Column()
  year: string;

  @Column()
  km: number;

  @Column()
  price: number;

  // @Column({
  //   type: 'enum',
  //   enum: VehicleType,
  //   default: VehicleType.CAR,
  // })
  // vehicle_type: VehicleType;

  @Column()
  type_of_vehicle: string;

  @Column()
  description: string;

  @Column()
  is_published: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Comment, (comment) => comment.announcement)
  @JoinColumn()
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.announcements, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  // @OneToMany(() => Image, (image) => image.announcement)
  // images: Image[];

  // constructor() {
  //   if (!this.id) {
  //     this.id = uuid();
  //   }
  // }
}

export default Announcement;
