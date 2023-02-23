import { Box, CircularProgress, styled, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "../context/AccountProvider";
import { getMessages, getUsers, setConversations } from "../service/api";
import ChatUser from "./ChatUser";

const Wrapper = styled(Box)`
  background-color: #111b21;
  color: rgba(255, 255, 255, 0.85);
  height: calc(100vh - 164px);
`;

const ChatList = () => {
  const {
    setSelectedChat,
    searchText,
    account,
    setConversationId,
    setAllMessagesToShow,
    loadingGlobal,
    setLoadingGlobal,
    chatList, setChatList
  } = useContext(AccountContext);

  const fetchUsers = async () => {
    await getUsers()
      .then((res) => {
        if (res) {
          setChatList(res?.users);
          setLoadingGlobal(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoadingGlobal(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchText) {
      const localSub = JSON.parse(localStorage.getItem("account"))?.sub;
      const filtered = chatList.filter(
        (one) =>
          one.name.toLowerCase().includes(searchText.toLowerCase()) &&
          one.sub !== localSub
      );
      setChatList(filtered);
    } else {
      fetchUsers();
    }
  }, [searchText]);

  const handleChatUserClicked = async (chat) => {
    setSelectedChat(chat);
    setAllMessagesToShow([]);
    await setConversations({
      senderId: account?.sub,
      receiverId: chat?.sub,
    })
      .then((res) => {
        if (res) {
          setConversationId(res?._id);
          setLoadingGlobal(true);
          setTimeout(() => {
            getMessages(res?._id)
              .then((messages) => {
                setAllMessagesToShow(messages?.data);
                setLoadingGlobal(false);
              })
              .catch((err) => {
                console.log(err);
                setLoadingGlobal(false);
              });
          }, 500);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingGlobal(false);
      });
  };

  

  return (
    <Wrapper>
      {chatList?.length > 0 ? (
        <>
          {chatList.map((chat) => {
            const subject = JSON.parse(localStorage.getItem("account"))?.sub;
            if (chat?.sub !== subject) {
              return (
                <ChatUser
                  key={chat?.sub}
                  chat={chat}
                  onClick={() => {
                    handleChatUserClicked(chat);
                  }}
                />
              );
            }
          })}
        </>
      ) : (
        <>
          {!loadingGlobal && chatList?.length === 0 ? (
            <Typography>No chat found.</Typography>
          ) : (
            <Typography align="center" style={{ paddingTop: 40 }}>
              <CircularProgress size={20} />
            </Typography>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default ChatList;
