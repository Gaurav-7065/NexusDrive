import { Children, createContext, useContext, useEffect, useState } from "react";
import { getallNotice } from "../api/notice";
import { useAuth } from "./AuthContext";


export const NotifyContext=createContext();

export const NotifyProvider=({children})=>{
    const [messages,setMessages]=useState([]);
    const [loading,setLoading]=useState(true);
    const {user}=useAuth();

    const[readMessageId,setReadMessageIds]=useState(()=>{
        if(typeof window!=='undefined'){
            const saved=localStorage.getItem('nexus_read_messages');
            return saved ?JSON.parse(saved):[];
        }
        return [];
    })

    useEffect(()=>{
        const fetchMessages=async()=>{
            try{
                const response=await getallNotice();
                const data=response.data;
                setMessages(data);
            }
            catch(error){
                console.error("Error fetching notification board messages:",error);
            }
            finally{
                setLoading(false);
            }
        }
        
      if(user){
       fetchMessages();
       
       
      }
      
       

    },[]);

    const unreadCount=messages.filter(msg=>!readMessageId.includes(msg._id)).length;

    const markAsRead=(id)=>{
        if(!readMessageId.includes(id)){
            const updated=[...readMessageId,id];
            setReadMessageIds(updated);
            localStorage.setItem('nexus_read_messages',JSON.stringify(updated));
        }
    }

    const markAllasRead=()=>{
        const allIds=messages.map(msg=>msg._id);
        setReadMessageIds(allIds);
        localStorage.setItem('nexus_read_messages',JSON.stringify(allIds));
    }

    return <NotifyContext.Provider value={{markAllasRead,unreadCount,readMessageId,messages,loading,markAsRead}}>
        {children}
    </NotifyContext.Provider>
}
export const  useNotification=()=>useContext(NotifyContext);