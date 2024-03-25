import backgroundImage from "/images/signup-background-image.jpeg";
import decagonLogoWht from "/images/decagonLogoWht.png";
import MainButton from "../../components/MainButton";
import searchButton from "/images/searchButton.png";
import { useNavigate } from "react-router-dom";

const HeroPage = () => {
  const navigate = useNavigate();
  return (
    <section
      className="bg-[image-url] bg-cover bg-center min-h-screen "
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(16, 24, 40, 0.5), rgba(16, 24, 40, 0.5)), url(${backgroundImage})`,
      }}
    >
      <div className="mx-auto w-10/12 max-w-screen-xl px-4 sm:px-6 lg:px-8 flex flex-col">
        <div className="flex justify-between mt-3">
          <div>
            <img
              className="cursor-pointer"
              src={decagonLogoWht}
              alt="decagon logo"
            />
          </div>
          <div className="text-white mb-4 flex justify-between gap-4">
            <div className="cursor-pointer">Study</div>
            <div className="cursor-pointer">Life on Campus</div>
            <div className="cursor-pointer">Contact Us</div>
          </div>
        </div>

        <div>
          <h1 className="text-center text-xl font-bold mx-auto md:w-10/12 xl:w-6/12 text-white sm:text-4xl lg:text-5xl lg:w-8/12  leading-tight tracking-wider inknut-antiqua-regular mt-20">
            Forge Your Legacy at Decagon
          </h1>
          <h2 className="text-center text-white font-light mt-5 mx-auto xl:w-2/5 flex flex-col justify-center">
            Forge your heroic legacy at Decagon, where diverse passions meet
            cutting-edge education, propelling you towards an extraordinary
            future."
            <div className="flex justify-items-center mt-12 w-1/3 mx-auto">
              <MainButton
                button_text="Apply Now!"
                onClick={() => {
                  navigate("/");
                }}
              />
            </div>
          </h2>
        </div>

        <div className="flex justify-between mx-auto gap-5 mt-44 mb-4border border-blue-400 w-10/12">
          <div className="flex justify-between mx-auto w-full">
            <input
              className="px-4 sm:px-6 lg:px-8 rounded-md focus:outline-none focus:border-green-500 border border-gray-300 flex-1 flex justify-between"
              type="text"
              placeholder="Search Course or Study Mode"
            />
          </div>
          <button>
            <img src={searchButton} alt="search-button" />
          </button>
        </div>

        <footer className="w-full text-white mt-12 leading-8 tracking-wider flex flex-col items-center lg:flex-row lg:items-center lg:justify-between">
          <h5 className="cursor-pointer">Website Terms and Conditions</h5>
          <h5 className="cursor-pointer">Privacy Notice </h5>
        </footer>
      </div>
    </section>
  );
};

export default HeroPage;
