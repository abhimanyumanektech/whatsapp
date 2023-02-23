import { Box, styled, Typography } from '@mui/material'
import React from 'react'
import WpEmptyChat from "../../assets/images/wp-emptychat.svg"
import {Lock} from "@mui/icons-material"

const Wrapper = styled(Box)`
    background-color: #222e35;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 40px);
    color: rgba(255, 255, 255, 0.7);
    border-bottom: 7px solid #00a884;
    box-sizing: border-box;
    position: relative;
    border-left: 0.5px solid rgba(255, 255, 255, 0.2)
`

const EndToEnd = styled(Typography)`
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0.5;
    font-size: 13px;
    letter-spacing: 0.5px;

    @media (max-height: 630px){
        position: unset;
        text-align: center;
        transform: translateX(0%);
        margin: 30px 0 20px
    }
`

const EmptyChat = () => {
    
  return (
    <Wrapper>
        <Typography align='center' variant='div'>
            <img width={400} height={280} style={{objectFit: "cover"}} src={WpEmptyChat} alt="" />
            <Typography variant='h4' sx={{mb: 3}} className='font-30'>WhatsApp Web</Typography>
            <Typography variant='body2' sx={{mb: 0.5}}>Send and receive messages without keeping your phone online.</Typography>
            <Typography variant='body2'>Use WhatsApp on up to 4 linked devices and 1 phone at the same time.</Typography>
            <EndToEnd variant='body2' className=''><Lock fontSize="20px" /> End-to-end encrypted</EndToEnd>
        </Typography>
    </Wrapper>
  )
}

export default EmptyChat