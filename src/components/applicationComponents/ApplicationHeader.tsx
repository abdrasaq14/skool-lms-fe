import decagonLogo from "/images/decagon-logo.png";
import leftArrow from "/images/left-arrow.png";
import { Link } from "react-router-dom";


interface Header{
  header_text: string;
  linkTo: string;
}

function ApplicationHeader( {header_text, linkTo}: Header) {

  const firstName = localStorage.getItem("name")

  return (

    <div className="w-10/12 mx-auto py-6">
      <div className="flex justify-between">
        <img src={decagonLogo} alt="Decagon logo" />

        <div className=" flex justify-between gap-6 align-middle items-center">
          <div className=" font-semibold text-base">Contact Us</div>

          <div className="flex justify-center items-center gap-2">
            <div className=" bg-blue-400 text-blue-600 rounded-full w-10 h-10 flex justify-center items-center">
              <p className="font-semibold text-base">NN</p>
            </div>

            <div className=" font-normal text-base">{firstName}</div>
          </div>
        </div>
      </div>

      <div className=" mt-6">
        <Link className=" flex gap-1" to={linkTo}>
          <img src={leftArrow} alt="Arrow to go back to the previous page" />
          <div>{header_text}</div>
        </Link>
      </div>



    </div>
  )
}

export default ApplicationHeader