import { async } from '@firebase/util';
import * as api from '../api/index.js'
import { AUTH } from '../constants/ActionType'



export const signIn = (formData,history) => async(dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        
        dispatch({ type:AUTH, payload:data });

        history('/')
    } catch (error) {
        console.log(error);
    }
};

export const signUp = (formData,history) => async(dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        
        dispatch({ type:AUTH, payload:data });

        history('/')
    } catch (error) {
        console.log(error);
    }
};

export const googleSignIn = (result,history) => async(dispatch) => {
    try {
        const { data } = await api.googleSignIn(result);

        dispatch({ type:AUTH, payload:data });

        history('/')
    } catch (error) {
        console.log(error)
    }
}