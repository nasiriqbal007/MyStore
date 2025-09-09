import { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Category from "./Category";
import Loading from "../assets/Loading4.webm";

const Carousel = () => {
  const { fetchProducts, data } = useContext(DataContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`arrow ${className}`}
        style={{ zIndex: 3 }}
      >
        <AiOutlineArrowLeft
          className="arrows"
          style={{
            ...style,
            display: "block",
            borderRadius: "50px",
            background: "#f53347",
            color: "white",
            position: "absolute",
            padding: "2px",
            left: "50px",
          }}
        />
      </div>
    );
  };
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div onClick={onClick} className={`arrow ${className}`}>
        <AiOutlineArrowRight
          className="arrows"
          style={{
            ...style,
            display: "block",
            borderRadius: "50px",
            background: "#f53347",
            color: "white",
            position: "absolute",
            padding: "2px",
            right: "50px",
          }}
        />
      </div>
    );
  };

  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    pauseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow to="next" />,
    prevArrow: <SamplePrevArrow to="prev" />,
    responsive: [
      { breakpoint: 1024, settings: { arrows: false, slidesToShow: 1 } },
      { breakpoint: 640, settings: { arrows: false, slidesToShow: 1 } },
    ],
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] md:h-[600px]">
        <video
          muted
          autoPlay
          loop
          className="w-[200px] sm:w-[300px] md:w-[400px]"
        >
          <source src={Loading} type="video/webm" />
        </video>
      </div>
    );
  }

  return (
    <div>
      <Slider {...settings}>
        {data.slice(0, 7).map((product, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-[#00f0c29] via-[#302b63] to-[#24233e] -z-10"
          >
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center px-4 py-6 md:h-[600px]">
              {/* Text Section */}
              <div className="space-y-4 md:space-y-6 text-center md:text-left max-w-full md:max-w-[500px]">
                <h3 className="text-red-500 font-semibold font-sans text-sm md:text-sm">
                  Elevate Your Style with Our Latest Collection
                </h3>
                <h1 className="text-xl sm:text-2xl md:text-4xl font-bold uppercase line-clamp-none md:line-clamp-3 text-white">
                  {product.title}
                </h1>
                <p className="text-gray-200 line-clamp-none md:line-clamp-3 sm:text-sm md:text-base">
                  {product.description}
                </p>
                <button className="bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md cursor-pointer mt-2 text-sm sm:text-base">
                  Shop Now
                </button>
              </div>

              {/* Image Section */}
              <div className="flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.title}
                  className="rounded-md sm:rounded-lg md:rounded-full w-[200px] sm:w-[300px] md:w-[500px] h-[200px] sm:h-[350px] md:h-[550px] object-cover hover:scale-105 transition-all shadow-2xl shadow-red-400 mx-auto"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <Category />
    </div>
  );
};

export default Carousel;
