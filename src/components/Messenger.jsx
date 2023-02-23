import React, { useContext, useEffect } from "react";
import LoginDialog from "./account/LoginDialog";
import { AppBar, Toolbar, styled, Box, Typography } from "@mui/material";
import WpLogo from "../assets/images/wp-svg.svg";
import { AccountContext } from "./context/AccountProvider";
import ChatDialog from "./chat/ChatDialog";

const styling = {
  toolbar: {
    maxWidth: "65%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
    width: "100%",
  },
  span: {
    fontWeight: 600,
    fontSize: 14,
    marginLeft: 14,
  },
};

const Header = styled(AppBar)`
  height: 220px;
  background-color: #00a884;
  box-shadow: none;
  position: relative;
`;

const AfterLoginHeader = styled(AppBar)`
  height: 120px;
  background-color: #00a884;
  box-shadow: none;
  position: relative;
`;

const Wrapper = styled(Box)`
  background-color: #111b21;
//   padding-bottom: 100px;
  min-height: 100vh;
`;

const Messenger = () => {

  const { account, setAccount, setProfilePic } = useContext(AccountContext);

  useEffect(() => {
    const parsed = JSON.parse(localStorage.getItem("account"))
    setAccount(parsed);
    setProfilePic(parsed?.picture)
  }, [])

  return (
    <Wrapper>
      {account ? (
        <>
          <AfterLoginHeader>
            <Toolbar style={styling.toolbar} />
          </AfterLoginHeader>
          <ChatDialog />
        </>
      ) : (
        <>
          <Header>
            <Toolbar style={styling.toolbar}>
              <img src={WpLogo} width="40px" alt="" />
              <Typography variant="span" style={styling.span}>
                WHATSAPP WEB
              </Typography>
            </Toolbar>
          </Header>
          <LoginDialog />
        </>
      )}
    </Wrapper>
  );
};

export default Messenger;
