import axios from "axios";

const URLMain = "/api/Staff";

export class StaffService {
    GetAllList(filterObj) {
        return axios.post(`${URLMain}/GetList`, filterObj)
            .then(res => res.data);
    }
    GetItemById(itemId) {
        return axios.get(`${URLMain}/GetItemById?Id=` + itemId)
            .then(res => res.data);
    }
    AddUpdateItem(model) {
        return axios.put(`${URLMain}/AddUpdateItem`, model)
            .then(res => res.data);
    }
    DeleteItem(itemId) {
        return axios.delete(`${URLMain}/DeleteItem?Id=` + itemId)
            .then(res => res.data);
    }

}
