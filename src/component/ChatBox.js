import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const ChatBox = ({
  messagesContainerRef,
  message,
  setMessage,
  handleSendMessage,
}) => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear cookies
    cookies.remove("token");
    cookies.remove("name");
    // Redirect to the login page
    navigate("/login");
  };
  return (
    <div className="mt-4 flex w-full" ref={messagesContainerRef}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 p-2 border border-gray-300 w-full rounded-l"
      />
      <button
        onClick={handleSendMessage}
        className="bg-blue-500 text-white px-4 rounded-r"
      >
        Send
      </button>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 ml-2"
      >
        Logout
      </button>
    </div>
  );
};

export default ChatBox;
