import { async } from '@firebase/util';
import * as api from '../api/index.js'
import { FETCH_ALL,GET,CREATE,GET_BY_SEARCH,LIKE,GET_COMMENT,SEND_COMMENT,FETCH_TREND, UPDATED_VIDEO} from '../constants/ActionType'


export const getVideos = (type) => async(dispatch) => {
    try {
        const { data } = await api.getVideos(type);

        dispatch({ type:FETCH_ALL, payload:data })
    } catch (error) {
        console.log(error);
    }
}

export const getTrendVideos = () => async(dispatch) => {
    try {
        const { data } = await api.getTrendVideos();

        dispatch({ type:FETCH_TREND, payload:data })
    } catch (error) {
        console.log(error);
    }
}

export const createVideo = (inputs,type) => async(dispatch) => {
    try {
        await api.createVideo(inputs);
        
        const { data } = await api.getVideos(type);

        dispatch({ type:FETCH_ALL, payload:data })
    } catch (error) {
        console.log(error);
    }
}

export const updateVideo = (inputs,videoId,type) => async(dispatch) => {
    try {
        await api.updateVideo(inputs,videoId)

        const { data } = await api.getVideos(type);

        dispatch({ type:FETCH_ALL, payload:data })
    } catch (error) {
        console.log(error);
    }
}

export const getVideoById = (id) => async(dispatch) => {
    try {
        const { data } = await api.getVideoById(id);

        dispatch({ type:GET, payload:data })
    } catch (error) {
        console.log(error);
    }
}

export const sendLike = (videoId) => async(dispatch) => {
    try {
        const { data } = await api.sendLike(videoId)

        dispatch({ type:LIKE, payload:data })
    } catch (error) {
        console.log(error);
    }
}

export const sendDislike = (videoId) => async(dispatch) => {
    try {
        const { data } = await api.sendDislike(videoId)

    } catch (error) {
        console.log(error)
    }
}

export const sendComment = (comment,id) => async(dispatch) => {
    try {
        await api.sendComment(comment)

        const { data } = await api.getComment(id)

        dispatch({ type:GET_COMMENT, payload:data })
    } catch (error) {
        console.log(error)
    }
}

export const getComment = (id) => async(dispatch) => {
    try {
        const { data } = await api.getComment(id)

        dispatch({ type:GET_COMMENT, payload:data })
    } catch (error) {
        console.log(error)
    }
}

export const getVideoBySearch = (searchQuery) => async(dispatch) => {
    try {
        const { data } = await api.getVideoBySearch(searchQuery)

        dispatch({type:GET_BY_SEARCH, payload:data})
    } catch (error) {
        console.log(error)
    }
}

export const deleteVideo = (videoId,type) => async(dispatch) => {
    try {
        await api.deleteVideo(videoId)

        const { data } = await api.getVideos(type);

        dispatch({ type:FETCH_ALL, payload:data })
    } catch (error) {
        console.log(error)
    }
}

