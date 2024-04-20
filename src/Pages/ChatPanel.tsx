import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../src/app/hooks';
import { RootState } from '../../src/app/store';
import {Client, Message} from '@stomp/stompjs';
import {WebSocket} from 'ws';
import { useNavigate } from 'react-router';

interface MessageProps{
    sendId:string;
    recipientId:string;
    content:string;
    timestamp:Date | null;
}

interface UserProps{
    userName:string;
    status:string;
}

export default function ChatPanel() {
    const dispatch = useAppDispatch();
    const name = useAppSelector((state: RootState) => state.name);
    const isAuthenticated = useAppSelector((state: RootState) => state.isAuthenticated);
    const [messages, setMessages] = useState<MessageProps[]>([{
        sendId:'',
        recipientId:'',
        content:'',
        timestamp: null,
    }]);
    const [currentUser] = useState<UserProps>({
        userName:name,
        status: 'ONLINE'
    })
    const [wsUrl] = useState<string>(`ws://localhost:${import.meta.env.VITE_BACKEND_PORT}/ws`);
    const [isConnected, setConnected] = useState<Boolean>(false);
    const onMessageReceive = (message:any)=>{
        console.log(message.body);
    }
    const navigate = useNavigate();
    Object.assign(global, {WebSocket}); // Fix for stompjs
    useEffect(()=>{
        if(!isAuthenticated){
            navigate('/login', {replace:true});
        }
        const client  = new Client({
            brokerURL: wsUrl,
            onConnect: ()=>{
                console.log('connect');
                client.subscribe(`/user/${currentUser.userName}/queue/messages`, onMessageReceive);
                client.subscribe(`/user/public`, onMessageReceive);
                client.publish({destination: `/app/user.addUser`, body:JSON.stringify(currentUser)});
                setConnected(true);
            },
            onDisconnect:()=>{
                client.unsubscribe('/user/public');
                setConnected(false);
            },
            
        });
        if(!isConnected){
            console.log('activating');
            client.activate();
        }
        return ()=>{
            console.log('exited panel');
            client.deactivate();
        }
        
    }, [])

    
    

    return (
        <div className="chat-panel">
            <h1>Chat Panel</h1>
        </div>
    );
}