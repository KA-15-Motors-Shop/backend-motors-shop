// import {
//   Entity,
//   Column,
//   PrimaryGeneratedColumn,
//   CreateDateColumn,
//   UpdateDateColumn,
//   ManyToOne,
// } from "typeorm"

// import Announcement from "./Announcement"

// @Entity("images")
// class Image {
//   @PrimaryGeneratedColumn("uuid")
//   id: string

//   @Column()
//   img_url?: string

//   @CreateDateColumn()
//   created_at: Date

//   @UpdateDateColumn()
//   updated_at: Date

//   @ManyToOne(() => Announcement, (announcement) => announcement.images)
//   announcement: Announcement
// }

// export default Image
