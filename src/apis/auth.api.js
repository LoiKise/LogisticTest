import requestAPI from "./index";

const authApi = {
  register(data) {
    return requestAPI("/register", "POST", data);
  },
  login(data) {
    return requestAPI("/login", "POST", data);
  },
};
export default authApi;
