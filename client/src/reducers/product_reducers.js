import {
  GET_BEST_SELL_PRODUCTS,
  GET_NEW_ARRIVAL_PRODUCTS,
  GET_BRANDS,
  GET_COLORS,
  GET_PRODUCT_TO_DISPLAY,
  ADD_PRODUCT,
  ADD_BRAND,
  ADD_COLOR,
  CLEAR_PRODUCT,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL
} from "../actions/types";


export default function(state={}, action){
    switch(action.type){
        case GET_BEST_SELL_PRODUCTS: 
            return {
                ...state,
                bestSell: action.payload
            } 
        case GET_NEW_ARRIVAL_PRODUCTS: 
            return {
                ...state,
                newArrival: action.payload    
            } 
        case GET_PRODUCT_DETAIL: 
            return {
                ...state,
                productDetail: action.payload    
            } 
        case CLEAR_PRODUCT_DETAIL: 
            return {
                ...state,
                productDetail: action.payload    
            } 
        case GET_BRANDS:
            return {
                ...state,
                brands: action.payload
            }
        case ADD_BRAND:
            return {
                ...state,
                addBrand: action.payload.success, 
                brands: action.payload.brands
            }
        case GET_COLORS:
            return {
                ...state,
                colors: action.payload
            }
        case ADD_COLOR:
            return {
                ...state,
                addColor: action.payload.success,
                colors: action.payload.colors
            }
        case GET_PRODUCT_TO_DISPLAY:
            return {
                ...state,
                toDisplay: action.payload.articles,
                numberOfProduct: action.payload.size
            }
        case ADD_PRODUCT:
            return {
                ...state,
                addProduct: action.payload
            }
        case CLEAR_PRODUCT:
            return { 
                ...state, 
                addProduct: action.payload 
            }
        default:
            return state
    }
}