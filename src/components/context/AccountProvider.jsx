import { createContext, useEffect, useRef, useState } from "react";
import {io} from "socket.io-client"
export const AccountContext = createContext(null);


const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState();
  const [loadingGlobal, setLoadingGlobal] = useState(true);
  const [profilePic, setProfilePic] = useState("");
  const [selectedChat, setSelectedChat] = useState({});
  const [searchText, setSearchText] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [allMessagesToShow, setAllMessagesToShow] = useState([]);
  const [activeUsers, setActiveUsers] = useState([])
  const [chatList, setChatList] = useState([]);
  const socket = useRef();
  
  useEffect(() => {
    socket.current = io('https://socket-mauve.vercel.app', {
      transports: ['websocket']
    })
  }, [])

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
        profilePic,
        setProfilePic,
        selectedChat,
        setSelectedChat,
        searchText,
        setSearchText,
        conversationId,
        setConversationId,
        allMessagesToShow, 
        setAllMessagesToShow,
        loadingGlobal, setLoadingGlobal,
        socket,
        activeUsers, setActiveUsers,
        chatList, setChatList
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
