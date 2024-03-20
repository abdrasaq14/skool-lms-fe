interface MessageProps {
  imageUrl: string;
  name: string;
  message: string;
  time: string;
}
const Message = (props: MessageProps) => {
  return (
    <article className=" border-b-2 border-gray-300  p-2 mb-3 ">
      <div className="flex items-center gap-4">
       <div className="flex items-center">
        <span>sam</span>
       <img
          alt=""
          src={props.imageUrl}
          className="size-16 rounded-full object-cover"
        />
       </div>

        <div className="w-full p-0">
          <div className="flex flex-row justify-between  w-full">
            <h3 className="text-2xl font-bold  ">{props.name}</h3>
            <p>{props.time}</p>
          </div>
          <p className="text-lg font-medium ">{props.message}</p>
        </div>
      </div>
    </article>
  );
};

export default Message;
