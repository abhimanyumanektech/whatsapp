import { Box, Grid, List, ListItem, styled, Typography } from "@mui/material";
import React, {useContext} from "react";
import QRCode from "../../assets/images/qrcode.png";
import {GoogleLogin} from "@react-oauth/google"
import jwt_decode from "jwt-decode"
import { AccountContext } from "../context/AccountProvider";
import { addUser } from "../service/api";

const styling = {
  h5: {
    fontWeight: 100,
    WebkitTextStroke: 0.4,
    color: "#41525d",
    fontFamily: "Roboto",
    fontSize: 28,
  },
  QrDiv: {
    position: "relative",
    height: "fit-content"
  },
  googleAuth: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    right: 0,
    width: 265
  }
};

const Dialog = styled(Box)`
  // height: 96%;
  margin: -120px auto 0;
  padding: 65px;
  box-sizing: border-box;
  width: 100%;
  max-width: 65%;
  background-color: #fff;
  position: relative;
  z-index: 1111;
  border-radius: 3px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
`;

const Image = styled("img")`
  width: 265px;
  display: block;
  margin-left: auto;
`;

const ListChild = styled(ListItem)`
  padding-left: 0;
  font-size: 18px;
  color: #3b4a54;
  padding: 12px 16px 12px 0;
`;

const LoginDialog = () => { 

    const {setAccount, setProfilePic} = useContext(AccountContext)

    const onLoginSuccess = async (res) => {
        const decoded = jwt_decode(res.credential)
        console.log(decoded, "decoded")
        setAccount(decoded);
        await addUser(decoded);
        localStorage.setItem("account", JSON.stringify(decoded))
        setProfilePic(decoded?.picture)
    }
    
    const onLoginError = (err) => {
        console.log(err)
    }

  return (
    <Dialog>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography style={styling.h5} variant="h5" sx={{ mb: 4 }}>
              Use WhatsApp on your computer
            </Typography>
            <List>
              <ListChild>1. Open WhatsApp on your phone</ListChild>
              <ListChild>2. Tap menu and open Whatsapp Web</ListChild>
              <ListChild>3. Tap on Link a Device</ListChild>
              <ListChild>
                4. Point your phone to this screen to capture the code
              </ListChild>
            </List>
          </Grid>
          <Grid item xs={6} style={styling.QrDiv}>
            <Image src={QRCode} alt="QRCode" />
            <div style={styling.googleAuth}>
            <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} />
            </div>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default LoginDialog;
