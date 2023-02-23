import { Box, styled } from "@mui/material";
import React from "react";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import ChatBG from "../../../assets/images/wpchatbg.webp"

const Wrapper = styled(Box)`
  color: rgba(255, 255, 255, 0.9);
  height: calc(100vh - 40px);
  position: relative;
  border-left: 1px solid rgba(255, 255, 255, 0.15);
  background-image: url(${ChatBG});
  background-repeat: repeat-x;
  background-size: contain;
  display: flex;
  flex-direction: column;
`

const ChatBox = () => {
  
  return (
    <Wrapper>
      <ChatHeader />
      <Messages />
      <ChatFooter />
    </Wrapper>
  );
};

export default ChatBox;
