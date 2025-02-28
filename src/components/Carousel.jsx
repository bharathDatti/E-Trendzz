import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Carousel() {
  const slides = [
    {
      img: './src/assets/Home/shopnowimg.jpg',
      cta: "Shop Now",
      link: "/products?category=sale",
    },
    {
      img: "./src/assets/Home/exploreimg.jpg",
      cta: "Explore",
      link: "/products?category=electronics",
    },
    {
      img: "./src/assets/Home/buynowimg.jpg",
      cta: "Buy Now",
      link: "/products",
    },
  ];

  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      className="w-full h-[500px]  rounded-xl md:h-[600px]"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative rounded-lg  w-full h-full">
            <img
              src={slide.img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 rounded-md flex flex-col items-center justify-center text-white  ">
              <h2 className="text-3xl md:text-5xl font-bold  mb-4">{slide.cta}</h2>
              <a
                href={slide.link}
                className="bg-purple-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition"
              >
                {slide.cta}
              </a>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Carousel;