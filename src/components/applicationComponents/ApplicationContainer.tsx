
interface Props {
  header_text: string;
  paragraph_text: string;
}

function ApplicationContainer( {header_text, paragraph_text}: Props ) {
  return (
    <div className="h-32 w-4/12 flex px-5 rounded-xl border border-green-500 bg-white shadow-card justify-between items-center">
      <div className="w-56 flex-shrink-0">
        <div className="font-inter font-semibold text-lg mb-2">
          <h3>{header_text}</h3>
        </div>
        
        <div className="font-inter font-normal text-sm">
          <p>{paragraph_text}</p>
        </div>
      </div>

      <div className="flex-shrink-0 ml-auto">
        <button className="py-2 px-3 rounded-md bg-green-600 text-white text-xs"> Start Now </button>
      </div>
      
    </div>
  )
}

export default ApplicationContainer