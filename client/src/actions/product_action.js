import axios from "axios";
import {
  GET_BEST_SELL_PRODUCTS,
  GET_NEW_ARRIVAL_PRODUCTS,
  GET_BRANDS,
  GET_COLORS,
  GET_PRODUCT_TO_DISPLAY,
  ADD_PRODUCT,
  ADD_BRAND,
  ADD_COLOR,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL,
  CLEAR_PRODUCT
} from "./types";


export function getBestSellProducts() {
    const request = axios.get("/product/sort_product?sortBy=sold&order=desc&limit=4").then(res => res.data)

    return {
        type: GET_BEST_SELL_PRODUCTS,
        payload: request
    }
};

export function getNewArrivalProducts() {
    const request = axios.get("/product/sort_product?sortBy=createdAt&order=desc&limit=4").then(res => res.data)

    return {
        type: GET_NEW_ARRIVAL_PRODUCTS,
        payload: request
    }
};

export function getProductDetail(id) {
    const request = axios.get(`/product/product_id?id=${id}&type=single`).then(res => res.data[0])

    return {
        type: GET_PRODUCT_DETAIL,
        payload: request
    }
};

export function clearProductDetail() {

    return {
        type: CLEAR_PRODUCT_DETAIL,
        payload: ""
    }
};

export function getProductsToDisplay(skip, limit, filters = [], previousState = []) {
    const data = { 
      limit,
      skip,
      filters
    };


    const request = axios.post("/product/shop", data).then(response => {
        let newState = [
            ...previousState,
            ...response.data.articles
        ];

        return {
            size: response.data.size,
            articles: newState
        };
    });

    return {
        type: GET_PRODUCT_TO_DISPLAY,
        payload: request
    }
}

export function addProduct(dataToSubmit) {
    const request = axios.post("/product",dataToSubmit).then(res => res.data);

    return {
        type: ADD_PRODUCT,
        payload: request
    }
}

export function clearProduct() {
    return {
        type: CLEAR_PRODUCT,
        payload: ""
    }
}

//---------------------------------------//
//------------- CATEGORIES --------------//
//---------------------------------------//

export function getBrands() {
    const request = axios.get("/product/brand").then(res => res.data)

    return {
        type: GET_BRANDS,
        payload: request
    }
}

export function addBrand(dataToSubmit, existingBrands) {
    const request = axios.post("/product/brand",dataToSubmit).then(res => {
        let brands = [ ...existingBrands, res.data.brand ]
        
        return {
            success: res.data.success,
            brands
        }
    })

    return {
        type: ADD_BRAND,
        payload: request
    }
}

export function getColors() {
    const request = axios.get("/product/color").then(res => res.data)
    
    return {
        type: GET_COLORS,
        payload: request
    }
}

export function addColor(dataToSubmit, existingColors) {
    const request = axios.post("/product/color",dataToSubmit).then(res => {
        let colors = [ ...existingColors, res.data.color ]
        
        return {
            success: res.data.success,
            colors
        }
    })

    return {
        type: ADD_COLOR,
        payload: request
    }
}