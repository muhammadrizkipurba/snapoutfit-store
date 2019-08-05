import axios from "axios";
import { GET_SITE_INFO, UPDATE_SITE_INFO } from "./types";

export function getSiteInfo() {
    const request = axios.get('/site/site_info').then(res => res.data)

    return {
        type: GET_SITE_INFO,
        payload: request
    }
}

export function updateSiteInfo(dataToSubmit) {
    const request = axios.post('/site/site_info', dataToSubmit).then(res => res.data)

    return {
        type: UPDATE_SITE_INFO,
        payload: request
    }
}