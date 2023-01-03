import axios from "axios";
// import store from "../store/store"
// import { store } from "../store/store";
// let url = process.env.REACT_APP_BASE_URL;
// console.log(process.env.REACT_APP_BASE_URL);


// for development server
const API = axios.create({
  baseURL: "http://localhost:9000"
});


// > LoginIds Api__

export const fetchUserLoginIds = (user_id) =>
  API.get("/user/loginIds/getLoginIds", {
    params: {
      user_id: user_id,
    },
  });

export const addNewLoginIdA = (newLoginData, user_id) =>
  API.post("/user/loginIds/addLoginId", {
    data: newLoginData,
    user_id: user_id,
  });

//edit loginId___
export const editLoginId = (loginId_id, loginIdData) =>
  API.patch(`/user/loginIds/editLoginId/${loginId_id}`, loginIdData);

export const deleteLoginId = (loginCardId, user_id) =>
  API.delete(`/user/loginIds/deleteLoginId/${loginCardId}`, {
    data: { user_id: user_id },
  });