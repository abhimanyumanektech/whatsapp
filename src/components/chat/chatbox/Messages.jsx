import { Box, CircularProgress, styled, Typography } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AccountContext } from '../../context/AccountProvider';
import moment from "moment"

const Wrapper = styled(Box)`
    max-height: calc(100vh - 168px);
    // min-height: calc(100vh - 168px);
    overflow: auto;
    padding: 10px 15px;    
    box-sizing: border-box
`

const SentMessage = styled(Typography)`
  background-color: #005c4b;
  color: #fff;
  font-size: 14px;
  padding: 6px 10px;
  line-height: 1.7;
  box-sizing: border-box;
  border-radius: 8px;
  display: inline-block;
`

const SentWrapper = styled(Box)`
  text-align: right;
  margin: 6px 0;
`

const ReceivedMessage = styled(Typography)`
  background-color: #24323a;
  color: #fff;
  font-size: 14px;
  padding: 6px 10px;
  line-height: 1.7;
  box-sizing: border-box;
  border-radius: 8px;
  display: inline-block;
`

const ReceivedWrapper = styled(Box)`
  text-align: left;
  margin: 6px 0;
`

const MsgTime = styled("span")`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
  margin-left: 12px
`

const Messages = () => {
    const {socket, allMessagesToShow, setAllMessagesToShow, account, loadingGlobal, selectedChat } = useContext(AccountContext);
    const [incomingMessage, setIncomingMessage] = useState(null)

    useEffect(() => {
      socket.current.on("getMessage", data => {
        setIncomingMessage({
          ...data,
          createdAt: moment(),
        })
      })
    }, [])

    // useEffect(() => {
    //   console.log(allMessagesToShow, "allMessagesToShow")
    // }, [allMessagesToShow])

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  
    useEffect(() => {
      scrollToBottom()
    }, [allMessagesToShow]);

    useEffect(() => {
      if(incomingMessage && selectedChat.sub === incomingMessage.senderId){
        setAllMessagesToShow(prev => [...prev, incomingMessage])
      }
    }, [incomingMessage])

  return (
    <Wrapper className='main_chat_messages_area'>
        {
          loadingGlobal && (
            <Typography key={"null"} align='center' style={{marginTop: 40}}>
              <CircularProgress size={30} />
            </Typography>
          )
        }
        {
          allMessagesToShow?.length > 0 && (
            <>
              {
                allMessagesToShow.map((message) => {
                  if(message.senderId === account?.sub){
                    return(
                      <SentWrapper key={message._id}>
                        <SentMessage variant='span'>
                          {message.message}
                          <MsgTime>{moment(message.createdAt).format("hh:mm A")}</MsgTime>
                        </SentMessage>
                      </SentWrapper>
                    )
                  } else {
                    return(
                      <ReceivedWrapper key={message._id}>
                        <ReceivedMessage variant='span'>
                          {message.message}
                          <MsgTime>{moment(message.createdAt).format("hh:mm A")}</MsgTime>
                        </ReceivedMessage>
                      </ReceivedWrapper>
                    )
                  }
                })
              }
              <div ref={messagesEndRef} />
            </>
          )
        }
    </Wrapper>
  )
}

export default Messages