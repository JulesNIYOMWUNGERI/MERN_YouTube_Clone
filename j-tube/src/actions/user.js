import * as api from '../api/index'
import { GET_USER,UPDATED_USER,GET_COMMENT_CREATOR,GET_CREATOR  } from '../constants/ActionType'


export const getCreator = (creatorId) => async(dispatch) => {
    try {
        const { data } = await api.getCreator(creatorId);

        dispatch({ type:GET_CREATOR, payload:data });
    } catch (error) {
        console.log(error);
    }
}

export const sendSub = (creatorId) => async(dispatch) => {
    try {
        const { data } = await api.sendSub(creatorId)

    } catch (error) {
        console.log(error)
    }
}

export const removeSub = (creatorId) => async(dispatch) => {
    try {
        const { data } = await api.removeSub(creatorId)

    } catch (error) {
        console.log(error)
    }
}

export const updatedCurrentUser = (id) => async(dispatch) => {
    try {
        const { data } = await api.updatedCurrentUser(id)

        dispatch({ type:UPDATED_USER, payload:data })
    } catch (error) {
        console.log(error)
    }
}

