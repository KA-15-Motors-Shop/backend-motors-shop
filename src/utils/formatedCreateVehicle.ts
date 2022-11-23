import Vehicle from '../models/Announcement';

interface Props {
  announcement: Vehicle;
}

export const formatedCreateVehicle = ({ announcement }: Props) => {
  const formatedVehicle = {
    id: announcement.id,
    title: announcement.title,
    type_of_ad: announcement.type_of_ad,
    type_of_vehicle: announcement.type_of_vehicle,
    year: announcement.year,
    km: announcement.km,
    price: announcement.price,
    description: announcement.description,
    // cover_image: announcement.cover_image,
    // gallery_image: announcement.gallery_image,
    // gallery_image2: announcement.gallery_image2,
    // gallery_image3: announcement.gallery_image3,
    // gallery_image4: announcement.gallery_image4,
    // gallery_image5: announcement.gallery_image5,
    // gallery_image6: announcement.gallery_image6,
    published: announcement.is_published,
    owner: {
      id: announcement.user.id,
      name: announcement.user.name,
    },
  };

  return formatedVehicle;
};
