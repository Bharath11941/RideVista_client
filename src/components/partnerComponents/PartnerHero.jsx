import { Carousel } from "@material-tailwind/react";
export function PartnerCarousel() {
  return (
    <Carousel transition={{ duration: 2 }}>
    <img
      src="/src/assets/images/ParnerCarousel/carousel1.jpg"
      alt="image 1"
      className="h-96 w-full object-cover"
    />
    <img
      src="/src/assets/images/ParnerCarousel/carousel2.jpg"
      alt="image 2"
      className="h-96 w-full object-cover"
    />
    <img
      src="/src/assets/images/ParnerCarousel/carousel3.jpg"
      alt="image 3"
      className="h-96 w-full object-cover"
    />
  </Carousel>

  );
}
