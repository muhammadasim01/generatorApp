import { LOGIN_USER ,SERVICE} from "./actionTypes";

export const loginUser = payload => async dispatch => {
    console.log(payload)
    dispatch({
      type: LOGIN_USER,
      payload: payload,
    });
  
  };

  export const setService = payload => async dispatch => {
    console.log(payload)
    dispatch({
      type: SERVICE,
      payload: payload,
    });
  
  };