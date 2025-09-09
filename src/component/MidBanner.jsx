import cover from "../assets/cover.webp";

const MidBanner = () => {
  return (
    <div className="bg-gray-100 md:py-24">
      <div
        className="relative max-w-7xl mx-auto md:rounded-2xl pt-28 bg-cover bg-center h-[550px] md:h-[600px] "
        style={{
          backgroundImage: `url(${cover})`,
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/60 md:rounded-2xl bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
              Elevate Your Style with Our New Collection
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Explore trendy outfits, timeless classics, and exclusive fashion
              pieces crafted for every occasion.
            </p>
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 md:py-3 md:px-6 rounded-lg transition duration-300">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MidBanner;
