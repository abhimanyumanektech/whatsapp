import { MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { AccountContext } from "../../context/AccountProvider";

const Wrapper = styled(Box)`
  height: 64px;
  background-color: #222e35;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  box-sizing: border-box;
`;

const Status = styled(Typography)`
  color: rgba(255, 255, 255, 0.5);
  font-size: 11px;
`;

const ChatHeader = () => {
  const { selectedChat, activeUsers } = useContext(AccountContext);

  useEffect(() => {
    console.log(activeUsers, "activeUsers");
  }, [activeUsers])

  return (
    <Wrapper>
      <Avatar src={selectedChat?.picture} />
      <Box sx={{ ml: 1.5 }}>
        <Typography>{selectedChat?.name}</Typography>
        <Status>{activeUsers?.find(user => user?.sub == selectedChat?.sub) ? "Online" : "Offline"}</Status>
      </Box>
      <Button
        // onClick={handleClick}
        sx={{ p: 0, minWidth: "auto", color: "#fff", opacity: 0.6 }}
        className="ml-auto"
      >
        <MoreVert />
      </Button>
    </Wrapper>
  );
};

export default ChatHeader;
