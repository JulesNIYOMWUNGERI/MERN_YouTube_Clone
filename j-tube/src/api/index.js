import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
});


export const getVideoBySearch = (searchQuery) => API.get(`/videos/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags || 'none'}`)
export const getVideos = (type) => API.get(`/videos/${type}`)
export const getTrendVideos = () => API.get('/videos/trend')
export const createVideo = (inputs) => API.post('/videos', inputs);
export const updateVideo = (inputs,id) => API.patch(`/videos/${id}`,{inputs})
export const getVideoById = (id) => API.get(`/videos/find/${id}`);
export const getComment = (id) => API.get(`/comment/find/${id}`);
export const sendComment = (comment) => API.post('/comment/send',comment)
export const deleteVideo = (id) => API.delete(`/videos/${id}`)

export const signIn = (formData) => API.post('/auth/signin',formData)
export const signUp = (formData) => API.post('/auth/signup',formData)
export const googleSignIn = (result) => API.post('/auth/google',result)

export const sendLike = (videoId) => API.patch(`/user/like/${videoId}`)
export const sendDislike = (videoId) => API.patch(`/user/dislike/${videoId}`)
export const getCreator = (creatorId) => API.get(`/user/find/${creatorId}`)
export const sendSub = (creatorId) => API.patch(`/user/sub/${creatorId}`)
export const removeSub = (creatorId) => API.patch(`/user/unsub/${creatorId}`)
export const updatedCurrentUser = (id) => API.get(`/user/find/${id}`)