import React, { useContext, useEffect, useState } from "react";
import { Box, Button, MenuItem, Menu, styled } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { AccountContext } from "../../context/AccountProvider";

const Wrapper = styled(Box)`
  background-color: #222e35;
  color: rgba(255, 255, 255, 0.85);
  min-height: 60px;
  padding: 12px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between
`;

const ProfilePic = styled("img")`
    border-radius: 50%;
    width: 40px;
    height: 40px;
    object-fit: cover;
    cursor: pointer
`

const MenuHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {setAccount, profilePic, setSelectedChat, setProfilePic, account} = useContext(AccountContext)

  const handleLogout = () => {
    localStorage.removeItem("account")
    setAccount();
    setSelectedChat({});
    setProfilePic("")
  }

  return (
    <Wrapper>
      <ProfilePic
        width={30}
        src={profilePic}
        alt=""
        title={account?.name}
      />
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ p: 0, minWidth: "auto", color: "#fff", opacity: 0.6 }}
        className="ml-auto"
      >
        <MoreVert />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={() => {
            handleClose();
            setTimeout(() => {
                handleLogout();
            }, 500);
        }}>Logout</MenuItem>
      </Menu>
    </Wrapper>
  );
};

export default MenuHeader;
