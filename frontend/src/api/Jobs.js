import { API } from "./axiosInstance";

export const getAllJobs=async ()=>{

    const response=await API.get('/jobs');
    return response.data;
    
}
export const getJobById=async (id)=>{
    
    const response=await API.get(`/jobs/${id}`);

    return response.data;
}
export const updatedApplicationStatus=async(applicationId,newStatus)=>{
    console.log(newStatus);  

    const response=await  API.patch(`/jobs/${applicationId}/status`,{status:newStatus});
    console.log(response.data);

    return response.data;

}
export const getApplicant=async (jobId)=>{
    console
     const response=await API.get(`/jobs/${jobId}/applicants`);
     console.log(response.data);

     return response.data;
}
