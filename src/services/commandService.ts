import {apiService} from "./apiService";
import {urls} from "../constants/urls";

const commandService = {
    sendData: (data:string) => apiService.post(urls.send.data, data)
}

export {
    commandService
}