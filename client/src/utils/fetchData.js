import axios from 'axios';
// const BASE_URL = 'http://localhost:5000';


export const getDataAPI = async (url,token) =>{
	const res = await axios.get(`/api/${url}`,{
		headers:{
			Authorization: `Bearer ${token}`
		}
	});
	return res;
}


export const postDataAPI = async (url,data,token) =>{
	const res = await axios.post(`/api/${url}`,data,{
		headers:{
			Authorization: `Bearer ${token}`
		}
	});
	return res;
}


export const putDataAPI = async (url,data,token) =>{
	const res = await axios.put(`/api/${url}`,data,{
		headers:{
			Authorization: `Bearer ${token}`
		}
	});
	return res;
}


export const patchDataAPI = async (url,data,token) =>{
	// console.log(token)
	const res = await axios.patch(`/api/${url}`,data,{
		headers:{
			Authorization: `Bearer ${token}`
		}
	});
	return res;
}


export const deleteDataAPI = async (url,token) =>{
	const res = await axios.delete(`/api/${url}`,{
		headers:{
			Authorization: `Bearer ${token}`
		}
	});
	return res;
}