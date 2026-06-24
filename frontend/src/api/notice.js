
import { API } from "./axiosInstance";

export const getallNotice=async()=>{
    const response=await API.get('/notice/getallNotification');
   
    return response.data;
}
export const postNotification=async(data)=>{
    const response=await API.post('/notice/post-notification',data);
    return response.data;
}