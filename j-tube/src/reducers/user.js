import { GET_USER,UPDATED_USER,GET_COMMENT_CREATOR,GET_CREATOR  } from "../constants/ActionType";

const userReducer = (state={ updatedUser:[], creator:[] },action) => {
    switch (action.type) {
        case GET_CREATOR:
          return {
            ...state, creator:action?.payload
          };
        case GET_COMMENT_CREATOR:
          return {
            ...state, commentCreator:action?.payload
           };
        case UPDATED_USER:
          return {
            ...state, updatedUser:action?.payload
          }
        default:
          return state;
    }
}

export default userReducer;