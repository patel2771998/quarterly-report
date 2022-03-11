import Constants from "./Constants";

export default {
    REGISTER_USER: Constants.BASE_API_URL + 'user/register',
    LOGIN_USER: Constants.BASE_API_URL + 'user/login',
    GET_REPORT: Constants.BASE_API_URL + 'stock/list',
    FOLLOW: Constants.BASE_API_URL + 'stock/follow',
    UNFOLLOW: Constants.BASE_API_URL + 'stock/unfollow',
    CHECK_FOLLOW: Constants.BASE_API_URL + 'stock/follow/check',
}