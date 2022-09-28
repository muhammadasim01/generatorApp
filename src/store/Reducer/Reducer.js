import { LOGIN_USER, SERVICE } from "../Actions/actionTypes";

const initialState = {
    user : null,
    service : null,
};


const Reducer = (state = initialState, action) => {
    const { type, payload } = action;
  switch(type){
    case LOGIN_USER : 
    return {
        ...state,
        user: payload,
      };
      case SERVICE : 
      return {
          ...state,
          service: payload,
        };
    default:
        return state;
    }
  }
   

  export default Reducer