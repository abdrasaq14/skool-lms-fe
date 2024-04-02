interface MessageProps {
  imageUrl: string;
  name: string;
  message: string;
  time: string;
  online?: boolean; // New prop for online status
}
const Message = (props: MessageProps) => {
  return (
    <article className=" flex border-b-2 border-gray-300  p-2 mb-3 gap-3">
      <div
        className={`bg-${
          props.online ? "blue" : "gray"
        }-600 mt-5 border w-4 h-4 rounded-full mr-1`}
      ></div>
      <div>
        <img
          alt=""
          src={props.imageUrl}
          className="size-16 rounded-full object-cover"
        />
      </div>
      <div className="w-full p-0">
        <div className="flex flex-row justify-between  w-full">
          <h3 className="text-lg font-bold pb-3 ">{props.name}</h3>
          <p className="font-light text-slate-500">{props.time}</p>
        </div>
        <p className="font-light text-slate-500">{props.message}</p>
      </div>
    </article>
  );
};

export default Message;
