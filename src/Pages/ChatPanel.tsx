import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../src/app/hooks';
import { RootState } from '../../src/app/store';
import { useNavigate } from 'react-router';
import { Box, List, ListItem, ListItemText, ListItemButton, ListItemAvatar, Avatar, TextField, Button, Divider, IconButton, Typography, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import SendIcon from '@mui/icons-material/Send';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import axios from 'axios';
import { PATIENT, DOCTOR } from '../../src/constants/constants';
import { socket } from '../../src/socket-server/socket';
interface MessageProps {
    sender: string;
    receiver: string;
    message: string;
    senderProfile?: string;
    timestamp: Date | null;
}

interface UserProps {
    username: string;
    email: string;
    role: string;
    userProfile: string;
    status: string;
}

const Sidebar = styled(Box)({
    backgroundColor: '#2C3E50',
    color: 'white',
    height: '100vh',
    width: '20%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
});

const ChatList = styled(Box)({
    width: '30%',
    overflowY: 'auto',
    borderRight: '1px solid #ccc',
});

const MainChat = styled(Box)({
    width: '50%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
});

export default function ChatPanel() {
    const name = useAppSelector((state: RootState) => state.profileReducer.username);
    const email = useAppSelector((state: RootState) => state.profileReducer.email);
    const roleType = useAppSelector((state: RootState) => state.authReducer.roleType);
    const userProfile = useAppSelector((state: RootState) => state.profileReducer.profile);
    const userId = useAppSelector((state: RootState) => state.authReducer.userId);
    const isAuthenticated = useAppSelector((state: RootState) => state.authReducer.isAuthenticated);
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [isConnected, setConnected] = useState<Boolean>(socket.connected);

    const [currentUser] = useState<UserProps>({
        username: name,
        email: email,
        role: roleType,
        userProfile: userProfile,
        status: 'ONLINE'
    })
    const [onlineUsers, setOnlineUsers] = useState<UserProps[]>([]);

    const [messageValue, setMessageValue] = useState<string>('');
    const [recipientName, setRecipientName] = useState<string>('');

    const onUserConnect = (user: any) => {
        console.log(user);
        setOnlineUsers((prev) => {
            let userIdx = prev.findIndex((onlineUser) => onlineUser.email == user.email);
            if (userIdx != -1) {
                prev[userIdx].status = 'ONLINE';
                return [...prev];
            } else {
                return [...prev, user];
            }
        })

    }

    const onUserDisconnect = (user: any) => {
        setOnlineUsers((prev) => {
            let userIdx = prev.findIndex((onlineUser) => onlineUser.email === user.email);
            prev[userIdx].status = 'OFFLINE';
            return [...prev];

        })
    }

    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/Sign-in', { replace: true });
        }
        roleType === PATIENT && displayDoctors();
        roleType === DOCTOR && displayPatients();

        socket.connect()
        socket.emit('user connected', currentUser);
        socket.on('user connected', onUserConnect)
        socket.on('private message', onMessageReceive);
        socket.on('user disconnected', onUserDisconnect);

        return () => {
            socket.emit('user disconnect', currentUser);
            socket.off('user connect', onUserConnect);
            socket.off('private message', onMessageReceive);
            socket.off('user disconnected', onUserDisconnect);
            socket.disconnect();
        }

    }, [isAuthenticated])



    const isSender = (username: string, message: MessageProps): Boolean => {
        return username === message.sender;
    }

    const ChatMessages: React.FC<{ messages: MessageProps[], currentUser: string }> = ({ messages, currentUser }) => {
        return (
            <Box sx={{ padding: '1rem', overflowY: 'auto', height: 'calc(100% - 60px)' }}>

                {messages.length === 0 ? (
                    <ChatRoom recipientId={recipientName} />
                ) : (
                    messages.map((message, index) => (
                        <Box key={index} sx={{ display: 'flex', justifyContent: isSender(currentUser, message) ? 'flex-end' : 'flex-start' }}>
                            <Box
                                sx={{
                                    backgroundColor: isSender(currentUser, message) ? '#2C3E50' : '#ccc',
                                    color: isSender(currentUser, message) ? 'white' : 'black',
                                    padding: '0.5rem',
                                    borderRadius: '10px',
                                    maxWidth: '60%',
                                }}
                            >
                                <Typography>{message.message}</Typography>
                                <Typography variant="caption">{new Date((message.timestamp as Date)).toLocaleString()}</Typography>
                            </Box>
                        </Box>
                    ))
                )}
            </Box>
        )
    }

    const ChatRoom: React.FC<{ recipientId: string }> = ({ recipientId }) => {
        if (recipientId !== '') {
            let recipientIdx = onlineUsers.findIndex((onlineUser) => onlineUser.username === recipientId);
            console.log(recipientIdx);
            if (recipientIdx != -1) {
                let recipientProfile = onlineUsers[recipientIdx].userProfile;
                let recipientStatus = onlineUsers[recipientIdx].status;
                return (
                    <>
                        <Box sx={{ textAlign: 'center' }}>
                            <Badge color={isOnline(recipientStatus) ? 'success' : 'secondary'} variant='dot'>
                                <Avatar
                                    sx={{ width: 70, height: 70, mb: 3, marginX: 'auto' }}
                                    src={recipientProfile ? `/api/profile/uploads/${recipientProfile}` : ''}
                                    alt={recipientName} />


                            </Badge>
                            <Typography variant='h6'>
                                {recipientName}
                            </Typography>

                        </Box>


                    </>
                )
            } else {
                return (
                    <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '1rem' }}>
                        Start a conversation
                    </Typography>
                )
            }
        } else {
            return (
                <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '1rem' }}>
                    Start a conversation
                </Typography>
            )
        }
    }

    const displayMessage = async (senderId: string, recipientId: string) => {
        setRecipientName(recipientId);
        try {
            let response = await axios.get(`/chat/messages/${senderId}/${recipientId}`);
            let data = await response.data;
            setMessages(data);
        } catch (err) {
            console.log(err);
        }
    }

    const sendMessage = (username: string, recipientName: string, content: string) => {
        if (recipientName === '' || content === '') {
            return;
        }
        let message: MessageProps = {
            sender: username,
            receiver: recipientName,
            message: content,
            senderProfile: userProfile,
            timestamp: new Date()
        };
        socket.emit('private message', message);
        setMessages([...messages, message]);

    }

    const onMessageReceive = (message: any) => {
        console.log(messages);
        setMessages((prev) => [...prev, message]);
    }

    const displayDoctors = async () => {
        try {
            let response = await axios.get(`/chat/doctors`);
            setOnlineUsers(await response.data);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const displayPatients = async () => {
        try {
            let response = await axios.get(`/chat/patients`);
            setOnlineUsers(response.data);
            console.log(onlineUsers);
        } catch (err) {
            console.log(err);
        }
    }

    const isOnline = (status: string) => {
        return status === 'ONLINE';
    }


    return (
        <Box display="flex" height="100vh">
            <Sidebar>
                <Avatar src={currentUser.userProfile ? `/api/profile/uploads/${currentUser.userProfile}` : ''} sx={{ width: 70, height: 70 }} />
                <Typography variant="h6">{name}</Typography>
                <Button startIcon={<LogoutIcon />} sx={{ color: 'white' }}>Logout</Button>
            </Sidebar>

            <ChatList>
                <TextField
                    variant="outlined"
                    placeholder="Search"
                    size="small"
                    sx={{ marginBottom: '1rem' }}
                    InputProps={{
                        startAdornment: <SearchIcon />,
                    }}
                />
                <Button variant="contained" size='medium' startIcon={<AddIcon />}>
                    New
                </Button>
                <List>
                    {/* Map through your chat data here */}
                    {onlineUsers && onlineUsers.map(({ userProfile, username: userName, status }, index) => {
                        console.log(userProfile);
                        return (
                            <ListItem key={index}>
                                <ListItemButton id={userName} onClick={(e) => displayMessage(name, e.currentTarget.id)}>
                                    <ListItemAvatar>
                                        <Badge color={isOnline(status) ? 'success' : 'secondary'} badgeContent=" " variant='dot'>
                                            <Avatar src={`/api/profile/uploads/${userProfile}`} />
                                        </Badge>
                                    </ListItemAvatar>
                                    <ListItemText primary={userName} secondary="Message placeholder" />
                                    <Badge badgeContent={2} color="primary" />
                                </ListItemButton>

                            </ListItem>
                        )
                    })}
                    {/* Repeat for each chat */}
                </List>
            </ChatList>

            <MainChat>
                <ChatMessages messages={messages} currentUser={currentUser.username} />
                <Divider />
                <Box /* Add styles for the message input area */>
                    <TextField
                        placeholder="Type message"
                        fullWidth
                        onChange={(e) => setMessageValue(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={(e) => sendMessage(name, recipientName, messageValue)}>
                                    <SendIcon />
                                </IconButton>
                            ),
                        }}
                    />
                </Box>
            </MainChat>
        </Box>
    );
}