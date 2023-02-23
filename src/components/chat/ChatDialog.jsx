import React, { useContext, useEffect } from "react";
import { Box, Grid, styled } from "@mui/material";
import { AccountContext } from "../context/AccountProvider";
import EmptyChat from "./EmptyChat";
import ChatList from "./ChatList";
import MenuHeader from "./menu/Menu";
import Search from "./Search";
import ChatBox from "./chatbox/ChatBox";

const styling = {
  pt0: {
    paddingTop: 0,
  },
};

const Dialog = styled(Box)`
  margin: -100px auto 0;
  min-height: calc(100vh - 40px);
  box-sizing: border-box;
  width: 100%;
  max-width: calc(100% - 30px);
  background-color: #111b21;
  position: relative;
  z-index: 1111;
  border-radius: 3px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const ChatDialog = () => {
  const { selectedChat, socket, account, setActiveUsers } =
    useContext(AccountContext);

  useEffect(() => {
    socket.current.emit("addUsers", account);
    socket.current.on("getUsers", (users) => {
      setActiveUsers(users);
    });
  }, [account]);

  return (
    <Dialog>
      <Box>
        <Grid container spacing={0}>
          <Grid item xs={3}>
            <MenuHeader />
            <Search />
            <ChatList />
          </Grid>
          <Grid item xs={9}>
            {selectedChat?.sub ? <ChatBox /> : <EmptyChat />}
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default ChatDialog;
