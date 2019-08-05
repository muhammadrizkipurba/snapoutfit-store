import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART,
  GET_CART_ITEMS,
  REMOVE_CART_ITEMS,
  PAYMENT_SUCCESS,
  UPDATE_USER_INFO,
  CLEAR_UPDATE_USER_INFO
} from "../actions/types";

export default function(state={}, action){
    switch(action.type){
        case REGISTER_USER: 
            return {
                ...state,
                register: action.payload
            } 
        case LOGIN_USER: 
            return {
                ...state,
                loginSuccess: action.payload
            } 
        case AUTH_USER: 
            return {
                ...state,
                userData: action.payload
            } 
        case LOGOUT_USER: 
            return {
                ...state
            } 
            case ADD_TO_CART: 
            return {
                ...state,
                userData: {
                    ...state.userData,
                    cart: action.payload
                }
            } 
        case GET_CART_ITEMS:
            return {
                ...state,
                cartDetail: action.payload
            }
        case REMOVE_CART_ITEMS:
            return {
                ...state,
                cartDetail: action.payload.cartDetail,
                userData: {
                    ...state.userData,
                    cart: action.payload.cart
                }
            }
        case PAYMENT_SUCCESS:
            return {
                ...state,
                successPayment: action.payload.success,
                userData: {
                    ...state.userData,
                    cart: action.payload.cart,
                },
                cartDetail: action.payload.cartDetail
            }
        case UPDATE_USER_INFO: 
            return {
                ...state,
                updateUserInfo: action.payload
            }
        case CLEAR_UPDATE_USER_INFO: 
            return {
                ...state,
                updateUserInfo: action.payload
            }
        default:
            return state
    }
}