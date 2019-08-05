import axios from "axios";
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
} from "./types";

export function LoginUser(dataToSubmit){
  const request = axios.post("/user/login", dataToSubmit).then(response => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
};

export function RegisterUser(dataToSubmit){
  const request = axios.post("/user/register", dataToSubmit).then(response => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
};

export function auth(){
  const request = axios.get("/user/auth").then(res => res.data);

  return {
      type: AUTH_USER,
      payload: request
  }
};

export function logoutUser(){
  const request = axios.get("/user/logout").then(res => res.data)

  return {
    type: LOGOUT_USER,
    payload: request
  }
}

export function addToCart(_id) {
  const request = axios.post(`/user/addToCart?productId=${_id}`).then(res => res.data)
  
  return {
    type: ADD_TO_CART,
    payload: request
  }
}

export function getCartItems(cartItems, userCart) {

  const request = axios
    .get(`/product/product_id?id=${cartItems}&type=array`)
    .then(res => {
      userCart.forEach(item => {
        res.data.forEach((cartInUserProps, i) => {
          if (item.id === cartInUserProps._id) {
            res.data[i].quantity = item.quantity;
          }
        });
      })
      return res.data;
    });

  return {
    type: GET_CART_ITEMS,
    payload: request
  }
}

export function removeCartItem(id) {
  const request = axios
    .get(`/user/removeCartItem?_id=${id}`)
    .then(res => {
      res.data.cart.forEach(item => {
        res.data.cartDetail.forEach((cartInUserProps, i) => {
          if (item.id === cartInUserProps._id) {
            res.data.cartDetail[i].quantity = item.quantity
          };
        });
      });
      return res.data
    });

  return {
    type: REMOVE_CART_ITEMS,
    payload: request
  };
}


export function paymentSuccess(data) {

  const request = axios.post('/user/paymentsuccess', data).then(res => res.data)

  return {
    type: PAYMENT_SUCCESS,
    payload: request
  }
}

export function updateUserInfo(dataToSubmit){
  const request = axios.post('/user/update_profile', dataToSubmit).then(res => res.data)

  return {
    type: UPDATE_USER_INFO,
    payload: request
  }
}

export function clearUpdateUserInfo() {
  return {
    type: CLEAR_UPDATE_USER_INFO,
    payload: ''
  }
}