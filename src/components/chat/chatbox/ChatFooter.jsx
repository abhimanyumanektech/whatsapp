import { Box, IconButton, styled } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  EmojiEmotionsOutlined,
  AttachFile,
  SendSharp,
} from "@mui/icons-material";
import { AccountContext } from "../../context/AccountProvider";
import { getMessages, newMessage } from "../../service/api";
import toast, { Toaster } from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";

const Wrapper = styled(Box)(({ theme }) => ({
  // position: "absolute",
  // bottom: 0,
  // left: 0,
  marginTop: "auto",
  width: "100%",
  backgroundColor: "#222e35",
  display: "flex",
  alignItems: "center",
  padding: "10px 5px",
  flexWrap: "wrap",
  WebkitTransition: "0.3s all ease-in-out",
  transition: "0.3s all ease-in-out",

  "& .emojipicker_div": {
    // position: "absolute !important",
    // left: 20,
    // bottom: 75,
    width: "100%",

    "& .EmojiPickerReact": {
      width: "100% !important",
      height: "200px !important",
      borderRadius: "0 !important",
      background: "transparent !important",
      border: "none !important",
      marginTop: "10px",

      "& .epr-emoji-category-label": {
        background: "transparent !important",
      }
    },

    "& .epr-header": {
      display: "none",
    },
    "& .epr-preview": {
      display: "none",
    }
  },
}));

const styling = {
  iconButton: {
    fontSize: 26,
    opacity: 0.5,
    color: "#fff",
  },
  sendIconButton: {
    fontSize: 26,
    opacity: 1,
    color: "#fff",
  },
  sendBUtton: {
    width: 46,
    height: 46,
    background: "#00a884",
    color: "#fff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
};

const Input = styled("input")`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 10px 20px;
  box-sizing: border-box;
  outline: none;
  border: none;
  color: #fff;
  height: 46px;
  font-size: 15px;
  margin-left: 12px;
  max-width: calc(100% - 160px);
  width: 100%;
`;

const AttachmentButton = styled(IconButton)`
  position: relative;
`

const FileInput = styled("input")`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: pointer;
`

const ChatFooter = () => {
  const [message, setMessage] = useState("");
  const {
    account,
    selectedChat,
    conversationId,
    setAllMessagesToShow,
    setLoadingGlobal,
    socket
  } = useContext(AccountContext);
  const inputFocus = useRef(null);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("")
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name)
  }

  const handleEmojiWithMessage = (emojiData) => {
    console.log(emojiData);
    setMessage(message.concat(emojiData.emoji));
    inputFocus.current.focus();
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    setMessage("");
    let messageObject = {
      senderId: account?.sub,
      receiverId: selectedChat?.sub,
      conversationId: conversationId,
      type: "text",
      message: message,
    };
    socket.current.emit("sendMessage", messageObject)
    await newMessage(messageObject)
      .then((res) => {
        if (res) {
          getMessages(conversationId)
            .then((messages) => {
              setAllMessagesToShow(messages?.data);
              setLoadingGlobal(false);
            })
            .catch((err) => {
              console.log(err);
              setLoadingGlobal(false);
            });
        }
      })
      .catch((err) => {
        toast(err.message);
      });
  };

  useEffect(() => {
    inputFocus.current.focus();
  }, [selectedChat]);

  return (
    <form style={{marginTop: "auto"}}>
      <Wrapper>
        <IconButton
          onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
          style={{ position: "relative" }}
        >
          <EmojiEmotionsOutlined style={styling.iconButton} />
        </IconButton>
        <AttachmentButton>
          <AttachFile style={styling.iconButton} />
          <FileInput onChange={handleFileChange} type="file" />
        </AttachmentButton>
        <Input
          type="text"
          value={message || fileName}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          ref={inputFocus}
          autoFocus
        />
        <IconButton
          style={styling.sendBUtton}
          disabled={!message}
          type="submit"
          onClick={handleSubmitMessage}
        >
          <SendSharp style={styling.sendIconButton} />
        </IconButton>
        {openEmojiPicker && (
          <div className="emojipicker_div">
            <EmojiPicker onEmojiClick={handleEmojiWithMessage} />
          </div>
        )}
      </Wrapper>
      <Toaster />
    </form>
  );
};

export default ChatFooter;
