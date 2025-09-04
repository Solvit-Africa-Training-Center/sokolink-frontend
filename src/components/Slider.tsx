// import Swiper core and required modules
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

const images = [
  "https://images.pexels.com/photos/592815/pexels-photo-592815.jpeg",
  "https://media.istockphoto.com/id/1246138278/photo/silver-metallic-white-wireless-headphones-in-the-air-isolated-on-white-background-music.jpg?b=1&s=612x612&w=0&k=20&c=HgJppqNiRMq3DGLNrEmtV3-DOHJ-W4_9pavpKqsQjeo=",
  "https://images.pexels.com/photos/29181503/pexels-photo-29181503.jpeg",
  "https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg",
];

const Slider = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{
        delay: 3000, // 3 seconds
        disableOnInteraction: false,
      }}
      loop={true} // infinite loop
      className="rounded-lg shadow-lg"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <img
            src={img}
            alt={`Slide ${index + 1}`}
            className="w-full h-[400px] object-cover rounded-lg"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
