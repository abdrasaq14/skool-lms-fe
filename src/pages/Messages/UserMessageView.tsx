import Message from "../../components/Message";

function UserMessageView() {
  return (
    <div className="bg-white w-6/12 mx-auto mt-10 py-8 px-7 border rounded-2xl">
      <div>
        <h2 className="font-serif text-4xl text-black-100">Messages</h2>

        <div className="relative mt-3 mb-7">
          <input
            type="text"
            id="Search"
            placeholder="Search"
            className="w-full rounded-2xl border-gray-200 py-2.5 pr-10 shadow-sm sm:text-md px-5 bg-zinc-200"
          />
        </div>
      </div>
      <div>
        <Message
          imageUrl="https://images.unsplash.com/photo-1614644147724-2d4785d69962?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
          name="Olalekan"
          message="Kindly check my document again"
          time="9:40 AM"
        />
      </div>
    </div>
  );
}

export default UserMessageView;
