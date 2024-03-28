interface MessageProps {
  imageUrl: string;
  name: string;
  message: string;
  time: string;
  online?: boolean; // New prop for online status
}
const Message = (props: MessageProps) => {
  return (
    <article className=" border-b-2 border-gray-300  p-2 mb-3 ">
      <div className="flex items-center gap-4">
       <div className="flex items-center">
        {/* <div className="bg-blue-600 border w-4 h-4 rounded-full mr-1"></div> */}
        <div className={`bg-${props.online ? 'blue' : 'gray'}-600 border w-4 h-4 rounded-full mr-1`}></div>


       <img
          alt=""
          src={props.imageUrl}
          className="size-16 rounded-full object-cover"
        />
       </div>

        <div className="w-full p-0">
          <div className="flex flex-row justify-between  w-full">
            <h3 className="text-lg font-bold pb-10 ">{props.name}</h3>
            <p className="font-light text-slate-500">{props.time}</p>
          </div>
          <p className="font-light text-slate-500">{props.message}</p>
        </div>
      </div>
    </article>
  );
};

export default Message;
