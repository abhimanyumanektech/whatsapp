import { Avatar, Box, styled, Typography } from "@mui/material";
import React, { useContext } from "react";
import { AccountContext } from "../context/AccountProvider";

const Wrapper = styled(Box)(({ theme }) => ({
  padding: "15px 12px",
  display: "flex",
  alignItems: "center",
  position: "relative",
  cursor: "pointer",
  "&::after": {
    content: '""',
    width: "calc(100% - 66px)",
    height: "1px",
    bottom: 0,
    right: "0",
    background: "rgba(255, 255, 255, 0.05)",
    position: "absolute",
  },
  "&:last-child::after": {
    display: "none",
  },
}));

const Message = styled(Typography)`
  font-size: 12px;
`;

const Username = styled(Typography)`
  font-weight: 400;
  -webkit-text-stroke: 0.3px;
  font-family: "Roboto";
  font-size: 1rem;
  margin-bottom: 3px;
`;

const MessageTime = styled(Typography)`
  font-size: 10px;
  opacity: 0.5;
  position: absolute;
  right: 15px;
  top: 20px;
`;

const ChatUser = ({ chat, onClick }) => {

    const { selectedChat } = useContext(AccountContext);

  return (
    <Wrapper onClick={onClick} style={selectedChat?.sub === chat?.sub ? {background: "#222e35"} : {}}>
      <Avatar src={chat?.picture} alt="avatar"></Avatar>
      <div className="pl-3">
        <Username variant="body1">{chat?.name}</Username>
        <Message variant="body2">Message</Message>
        <MessageTime>9:15 PM</MessageTime>
      </div>
    </Wrapper>
  );
};

export default ChatUser;
