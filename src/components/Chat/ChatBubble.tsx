export const ChatBubble = ({ user, message }) => {
  const me = message.user_id === user?.id;

  return (
    <div className={`w-full flex my-2 ${ me ? 'justify-end' : 'justify-start'}`}>
      <div className={`w-full max-w-[200px] ${ me ? 'bg-slate-500' : 'bg-indigo-500'} rounded p-2`}>
        <div className="flex justify-between">
          <p className="text-xs">{message.user_name}</p>
            <p className="text-xs">{message.time}</p>
              </div>
              <hr className="my-2 border-white-800" />
          <p className="">{message.content}</p>
                  </div>
      </div>
  );
}

