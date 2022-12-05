import { FETCH_ALL,GET,GET_BY_SEARCH,CREATE,LIKE,GET_COMMENT,FETCH_TREND,UPDATED_VIDEO } from '../constants/ActionType'


const videoReducers = (state={ videos:[] },action) => {
    switch (action.type) {
        case FETCH_ALL:
           return {
            ...state,videos:action?.payload
           }
         case GET_BY_SEARCH:
            return {
               ...state,videos:action?.payload
            }
         case UPDATED_VIDEO:
            return state;
         case FETCH_TREND:
            return {
               ...state, trendVideos:action?.payload
            }
        case CREATE:
           return {
            ...state,videos:action?.payload
           }
         case GET:
            return {
             ...state,vodeo:action?.payload
            }
         case LIKE:
            return state;
         case GET_COMMENT:
            return {
               ...state,comments:action?.payload
            }
        default:
           return state
    }
}

export default videoReducers