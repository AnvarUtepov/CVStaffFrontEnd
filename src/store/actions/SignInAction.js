import axios from "axios";
import { AccountService } from "../apiServices/AccountService";
const accountService = new AccountService();

export const AUTHENTICATED = "authenticated_user";
export const UNAUTHENTICATED = "unauthenticated_user";
export const AUTHENTICATION_ERROR = "authentication_error";
export const AUTHENTICATION_DATA = "authentication_data";

const initialState = {
    userData: {
        fio: "",
        userName: "",
        roleId: "",
        mainRole: ""
    },
    authenticated: false,
    isAdmin: false
};

export const SignInActions = {
    signInAction: (model, history) => {
        return async dispatch => {
            try {
                const res = await accountService.login(model);
                //console.log(res);
                dispatch({ type: AUTHENTICATED });
                localStorage.setItem(process.env.REACT_APP_USER, res.data);
                axios.defaults.headers.common["Authorization"] =
                    "Bearer " + localStorage.getItem(process.env.REACT_APP_USER);
                history.push("/dashboard");
            } catch (error) {
                dispatch({
                    type: AUTHENTICATION_ERROR,
                    payload: "Неправильный логин или пароль"
                });
            }
        };
    },

    signOutAction: () => {
        return async dispatch => {
            localStorage.removeItem(process.env.REACT_APP_USER);
            axios.defaults.headers.common["Authorization"] = "";
            dispatch({ type: UNAUTHENTICATED });
        };
    },

    regInAction: (user, history) => {
        return async dispatch => {
            try {
                const res = await accountService.register(user);
                dispatch({ type: AUTHENTICATED });
                localStorage.setItem(process.env.REACT_APP_USER, res.data);
                axios.defaults.headers.common["Authorization"] =
                    "Bearer " + localStorage.getItem(process.env.REACT_APP_USER);
                history.push("/dashboard");
            } catch (error) {
                dispatch({
                    type: AUTHENTICATION_ERROR,
                    payload: "Пользователь уже зарегистрирован"
                });
            }
        };
    },
    getUserData: (history) => {
        return async dispatch => {
            try {
                // setTimeout(()=>{
                //         let sideBar = document.getElementsByClassName("sidebar-nav");
                //         document.body.classList.add('sidebar-minimized');
                //         sideBar[0].classList.remove('ps');
                //         sideBar[0].classList.remove('scrollbar-container');
                //     }, 5000
                // );
                const res = await accountService.getUserData();

                if (
                    res.status === "Token is Expired" ||
                    res.status === "Token is Invalid" ||
                    res.status === "Authorization Token not found"
                ) {
                    this.signOutAction();
                    return;
                }
                dispatch({
                    type: AUTHENTICATION_DATA,
                    payload: res
                });
            } catch (error) {
                //console.log(error);
                history.push("/");
                if (error.toString().includes("Error: Network Error")) {
                    dispatch({
                        type: AUTHENTICATION_ERROR,
                        payload: "Доступ к серверу отсутствует: " + process.env.REACT_APP_URL
                    });
                } else {
                    dispatch({ type: UNAUTHENTICATED });
                }
            }
        };
    }
};

export const reducer = (state, action) => {
    state = state || initialState;
    switch (action.type) {
        case AUTHENTICATED:
            return { ...state, error: "", authenticated: true };
        case UNAUTHENTICATED:
            return { ...state, authenticated: false, isAdmin: false };
        case AUTHENTICATION_ERROR:
            return {
                ...state,
                error: action.payload,
                authenticated: false,
                isAdmin: false
            };
        case AUTHENTICATION_DATA:
            return {
                ...state,
                error: "",
                userData: action.payload,
                authenticated: true,
                isAdmin: action.payload.mainRole === "PiligrimAdmin"
            };
        default:
            return state;
    }
};
