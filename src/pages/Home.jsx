// Importing required components and assets  
import Carousel from "../components/Carousel";  
import { Link } from "react-router-dom";  
import RotatingText from '../components/RotatingText';  
import HomeCategories from "../assets/imageImports";  // ✅ Importing category images  
import RollingGallery from "../components/RollingGallery";  
import FlashSaleTimer from "../components/Timer";  
import ScrollVelocity from '../components/ScrollVelocity';  

// Defining product categories with their names and keys  
const categories = [  
  { name: 'Electronics', key: 'electronics' },  
  { name: 'Fashion', key: 'fashion' },  
  { name: 'Home & Kitchen', key: 'home' },  
  { name: 'Books', key: 'books' },  
  { name: 'Sports', key: 'sports' },  
];  

function Home() {  
  return (  
    <div className="flex flex-col min-h-screen p-1">  

      {/* Hero Section - Introduction and Carousel */}  
      <section className="relative">  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-center">  

          {/* Text Section with Rotating Product Categories */}  
          <div className="text-center md:text-left mb-8 md:mb-12 ">  
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 md:mb-1 lg:mb-8">  
              Discover Your <br /> Perfect{" "}  
              <span className="inline-block">  
                <RotatingText  
                  texts={['Clothing', 'Gadgets', 'Apparel', 'Footwear']}  // Rotating product types  
                  mainClassName="px-2 sm:px-3 lg:px-4 bg-purple-900 text-white overflow-hidden py-0.5 sm:py-1 lg:py-2 justify-center rounded-lg"  
                  staggerFrom={"last"}  
                  initial={{ y: "100%" }}  
                  animate={{ y: 0 }}  
                  exit={{ y: "-120%" }}  
                  staggerDuration={0.025}  
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 lg:pb-1"  
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}  
                  rotationInterval={2000}  
                />  
              </span>  
            </h1>  
            <p className="text-lg sm:text-xl md:text-lg lg:text-2xl text-black mb-1 sm:mb-4 md:mb-2">  
              Shop premium products at unbeatable prices  
            </p>  
          </div>  

          {/* Carousel Section - Displays Featured Images */}  
          <div className="mt-6 md:mt-0">  
            <Carousel />  
          </div>  
        </div>  
      </section>  

      {/* Scrolling Flash Sale Banner */}  
      <section>  
        <ScrollVelocity  
          texts={['FLASH SALE', 'GRAB NOW']}  // Animated scrolling text  
          velocity={200}  
          className="custom-scroll-text italic mt-7"  
        />  
      </section>  

      {/* Shop by Category Section */}  
      <section className="py-8 sm:py-12 lg:py-16">  
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-10 text-purple-900">  
          Shop by Category  
        </h2>  

        {/* Displaying Product Categories */}  
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">  
          {categories.map((category) => (  
            <Link  
              key={category.key}  
              to={`/products?category=${category.name.toLowerCase()}`}  
              className="group relative overflow-hidden border rounded-lg shadow-md hover:shadow-xl transition duration-300"  
            >  
              {/* Category Image - Uses Imported Assets */}  
              <img  
                src={HomeCategories[category.key] || "default.jpg"}  // ✅ Fetch image dynamically  
                alt={category.name}  
                className="w-full h-40 sm:h-48 lg:h-56 object-cover group-hover:scale-110 transition duration-300"  
              />  

              {/* Category Name Overlay */}  
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">  
                <span className="text-white text-base sm:text-lg lg:text-xl font-semibold">  
                  {category.name}  
                </span>  
              </div>  
            </Link>  
          ))}  
        </div>  
      </section>  

      {/* Featured Products Section */}  
      <section className="py-8 sm:py-12 lg:py-16">  
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-10 text-purple-900">  
          Featured Products  
        </h2>  
        <RollingGallery autoplay={true} pauseOnHover={true} />  {/* Product Gallery */}  
      </section>  

      {/* Promotional Timer Banner - Flash Sale Countdown */}  
      <section>  
        <FlashSaleTimer />  
      </section>  

    </div>  
  );  
}  

export default Home;  
