import Vehicle from "../models/Vehicle";

interface Props {
  vehicle: Vehicle;
}

export const formatedCreateVehicle = ({ vehicle }: Props) => {
  const formatedVehicle = {
    id: vehicle.id,
    title: vehicle.title,
    type_of_ad: vehicle.type_of_ad,
    type_of_vehicle: vehicle.type_of_vehicle,
    year: vehicle.year,
    km: vehicle.km,
    price: vehicle.price,
    description: vehicle.description,
    cover_image: vehicle.cover_image,
    gallery_image: vehicle.gallery_image,
    gallery_image2: vehicle.gallery_image2,
    gallery_image3: vehicle.gallery_image3,
    gallery_image4: vehicle.gallery_image4,
    gallery_image5: vehicle.gallery_image5,
    gallery_image6: vehicle.gallery_image6,
    published: vehicle.published,
    owner: {
      id: vehicle.user.id,
      name: vehicle.user.name,
    },
  };

  return formatedVehicle;
};
