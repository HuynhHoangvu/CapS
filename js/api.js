import {DOMAIN} from"../common/constants.js"
export default class Api{
    callApi(uri,method,data){ 
        return axios({
            url: `${DOMAIN}/${uri}`,
            method,
            data,
        });
    }
}
