const Stepper = () => {
  return (
    <div className="mx-4 p-4 flex justify-between items-center ">
      <div className="relative flex flex-col items-center text-teal-600">
        <div className="rounded-full transition duration-500  ease-in-out border-2 border-gray-300 h-12 w-12 flex flex-items justify-center py-3 "> {/* Display number */} 
        
        </div>

        <div> {/* Display description */} </div>
      </div>

      <div> {/* Display line */} </div>
    </div>
  );
};

export default Stepper;
