import axios from "axios";
import md5 from "md5";

const URLAdmin = "/api/admin";
const URLAuth = "/api/account";

export class AccountService {
    login(model) {
        return axios.post(`${URLAuth}/login`, { userName: model.userName, password: md5(model.password) });
    }
    register(model) {
        model.password = md5(model.password);
        return axios.post(`${URLAuth}/register`, model);
    }

    getUsers(filterObj) {
        return axios
            .post(`${URLAdmin}/getUsersList`, filterObj)
            .then(res => res.data);
    }
    getUserById(userId) {
        return axios
            .post(`${URLAdmin}/getUserById?userId=` + userId)
            .then(res => res.data);
    }
    setUser(model) {
        return axios.post(`${URLAdmin}/setUser`, model).then(res => res.data);
    }
    resetPasswordUser(model) {
        return axios
            .post(`${URLAuth}/resetPasswordUser?userEmail=` + model)
            .then(res => res.data);
    }
    getUserData() {
        return axios.post(`${URLAuth}/getUserData`).then(res => res.data);
    }
}
