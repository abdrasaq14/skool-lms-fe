import { Link } from "react-router-dom";

interface Props {
  header_text: string;
  paragraph_text: string;
  link_to: string;
  isFilled: string | boolean | null;
}

function ApplicationContainer( {header_text, paragraph_text, link_to, isFilled}: Props ) {
  return (
    <div className={`application-container h-32 w-4/12 flex px-5 rounded-xl border border-green-500 ${isFilled === null ? "bg-white" : "bg-green-600"} shadow-card justify-between items-center`}>
      <div className="w-56 flex-shrink-0">
        <div className={`font-inter font-semibold text-lg mb-2 ${isFilled === null ? "text-black" : "text-white" }`}>
          <h3>{header_text}</h3>
        </div>
        
        <div className={`font-inter font-normal text-sm ${isFilled === null ? "text-black" : "text-white" }`}>
          <p>{paragraph_text}</p>
        </div>
      </div>

      <div className="flex-shrink-0 ml-auto">
        <Link to={link_to}>
          <button className={`py-2 px-3 rounded-md ${isFilled === null ? "bg-green-600" : "bg-gray-500"} text-white text-xs font-bold`}> {isFilled === null ? "Start Now" : "Edit Details"} </button>
        </Link>
      </div>
      
    </div>
  )
}

export default ApplicationContainer