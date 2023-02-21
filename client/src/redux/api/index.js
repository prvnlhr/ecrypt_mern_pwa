import axios from "axios";
import { setAuthToken, forceLogout, logOutUser } from "../features/auth/authSlice"
let url = process.env.REACT_APP_BASE_URL;
// console.log(process.env.REACT_APP_BASE_URL);


// //for production server
const API = axios.create({
  baseURL: url,
});

// const API = axios.create({
//   baseURL: "https://ecrypt-api.onrender.com"
// });

// for development server
// const API = axios.create({
//   baseURL: "http://localhost:9000"
// });

// ->______________________________________________________________________________
const reqHandler = (request) => {
  return request;
};

const resHandler = (response) => {
  if (response.status === 401) {
  }
  return response;
};


const axiosInterceptor = async (store) => {

  const errorHandler = async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config.url !== "/user/auth/access_token" && error.config.url !== "/user/auth/activation" && error.config.url !== "/user/auth/resetPassword" && !originalRequest._retry) {
      originalRequest._retry = true;

      try {

        const res = await axios.post(`${url}/user/auth/access_token`, null, {
          withCredentials: true,
        });

        if (res.status === 200) {
          store.dispatch(setAuthToken(res.data));
          originalRequest.headers['Authorization'] = "Bearer " + res.data;
          return axios(originalRequest);
        }

      }
      catch (err) {
        if (err.response.status === 401) {
          let resMsg;
          if (err.response.data.msg) {
            resMsg = err.response.data.msg
          }
          const ress = await axios.get(`${url}/user/auth/logout`, { withCredentials: true });
          store.dispatch(forceLogout({ msg: resMsg }));
          // console.log('Token-Expired :force logging out')
        }
        return Promise.reject(err);
      }

    }
    else {
      return Promise.reject(error);
    }
  };

  API.interceptors.request.use(
    (request) => reqHandler(request),
    (error) => errorHandler(error)
  );

  API.interceptors.response.use(
    (response) => resHandler(response),
    (error) => errorHandler(error)
  );
}


// ->_______________________________________________________________________________

// > LOGINIDS API_______________________________________
export const fetchUserLoginIds = (user_id) =>
  API.get("/user/loginIds/getLoginIds", {
    params: {
      user_id: user_id,
    },
  });

export const addNewLoginId = (newLoginData, user_id, token) =>
  API.post("/user/loginIds/addLoginId", { newLoginData, user_id }, {
    headers: {
      "Authorization": `Bearer ${token}`
    },

  });


export const editLoginId = (loginId_id, loginIdData, token) =>
  API.patch(`/user/loginIds/editLoginId/${loginId_id}`, loginIdData, {
    headers: {
      "Authorization": `Bearer ${token}`
    },
  });

export const deleteLoginId = (loginCardId, user_id, token) =>
  API.delete(`/user/loginIds/deleteLoginId/${loginCardId}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    },
    data: { user_id: user_id },
  });


// > CARDS API_______________________________________
export const fetchUserCards = (user_id) =>
  API.get("/user/cards/getCards", {
    params: {
      user_id: user_id,
    },
  });
//> add card____
export const addNewCard = (newCardData, user_id, token) =>
  API.post("/user/cards/addCard", { newCardData, user_id }, {
    headers: {
      "Authorization": `Bearer ${token}`
    },
  });

//>edit card___
export const editCard = (card_id, cardData, token) =>
  API.patch(`/user/cards/editCard/${card_id}`, cardData, {
    headers: {
      "Authorization": `Bearer ${token}`
    },
  });

//> delete card___
export const deleteCard = (card_id, user_id, cardData, token) =>
  API.delete(`/user/cards/deleteCard/${card_id}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    },
    data: {
      user_id: user_id,
      cardData: cardData,
    },
  });

//> DOCS API______________________________________________
export const fetchDocs = (user_id) =>
  API.get("/user/docs/getDocs", {
    params: {
      user_id: user_id,
    },
  });

//> add new doc___
export const addNewDoc = (data, token) => API.post("/user/docs/addDoc", data, {
  headers: {
    "Authorization": `Bearer ${token}`
  },
});

// export const addNewDoc = (data) => API.post("/user/docs/addDoc", data);


//> edit doc___
export const editDoc = (doc_Id, docData, token) =>
  API.patch(`/user/docs/editDoc/${doc_Id}`, docData, {
    headers: {
      "Authorization": `Bearer ${token}`
    },
  });

//> delete doc___
export const deleteDoc = (doc_id, user_id, cloud_id, token) =>
  API.delete(`/user/docs/deleteDoc/${doc_id}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    },
    data: {
      userId: user_id,
      cloudId: cloud_id,
    },
  });
// export const deleteDoc = (doc_id, user_id, cloud_id) =>
//   API.delete(`/user/docs/deleteDoc/${doc_id}`, {
//     data: {
//       userId: user_id,
//       cloudId: cloud_id,
//     },
//   });


//> ACTIVITY API___________________________________________________________________________________________
export const fetchUserActivities = (user_id) =>
  API.get("/user/activity/getActivities", {
    params: {
      user_id: user_id,
    },
  });
//> add activity___
export const addActivity = (user_id, activityData) =>
  API.post("/user/activity/addActivity", {
    data: activityData,
    user_id: user_id,
  });

//> RECENTLY ADDED API___________________________________________________________________________________________
export const fetchUserRecentlyAddedData = (user_id) =>
  API.get("/user/recentlyAdded/getRecentlyAdded", {
    params: {
      user_id: user_id,
    },
  });

//>add activity___
export const addRecentlyData = (user_id, activityData) =>
  API.post("/user/recentlyAdded/addRecentlyAdded", {
    data: activityData,
    user_id: user_id,
  });

//>FAVOURITE TOGGLE URL_____________________________________________________________________
export const loginIdFavouriteToggle = (loginCard_Id, isFav, token) =>
  API.patch(`/user/loginIds/toggleFavourite/${loginCard_Id}`, { data: isFav }, {
    headers: {
      "Authorization": `Bearer ${token}`
    },
  });


export const cardFavouriteToggle = (card_id, isFav, category, token) =>
  API.patch(`/user/cards/toggleFavourite/${card_id}`, { isFav, category }, {
    headers: {
      "Authorization": `Bearer ${token}`
    },
  });



export const docsFavouriteToggle = (doc_id, isFav, token) =>
  API.patch(`/user/docs/toggleFavourite/${doc_id}`, { data: isFav }, {
    headers: {
      "Authorization": `Bearer ${token}`
    },
  });

export const fetchFavorites = (user_id) =>
  API.get("/user/loginIds/getFavorites", {
    params: {
      user_id: user_id,
    },
  });


// __________________________________________________________
// __________________________________________________________
// ** Auth api

//> Register new user
export const registerNewUser = (formData) =>
  API.post("/user/auth/register", formData);


//> Login user
export const login = (formData) =>
  API.post("/user/auth/login", formData, {
    withCredentials: true,
  });

//> Logout
export const logout = () =>
  API.get("/user/auth/logout", { withCredentials: true });


//> Account activate 
export const accountActivation = (activation_token) =>
  API.post("/user/auth/activation", {
    data: {
      activation_token,
    },
  });

//> get access Token
export const getToken = () =>
  API.post("/user/auth/access_token", null, {
    withCredentials: true,
  });

//> Get user
export const getUser = (token) =>
  API.get("/user/auth/info", {
    headers: {
      "Authorization": `Bearer ${token}`
    },
  });

//> forgot user
export const forgotPass = (email) =>
  API.post("/user/auth/forgotPassword", { email });

//> reset password_____
export const resetPass = (token, password) =>
  API.post(
    "/user/auth/resetPassword",
    { password },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );


// > edit password____
export const editProfile = (token, profileData) =>
  API.post(
    "/user/auth/updateProfile",
    { profileData },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
// > edit profile Pic__
export const editProfilePic = (data, token) => API.post("/user/auth/updateProfilePic", data, {
  headers: {
    "Authorization": `Bearer ${token}`
  },
});

// > change password____
export const changePass = (oldPassword, newPassword, token) =>
  API.post(
    "/user/auth/changePassword",
    { oldPassword, newPassword },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
// originalRequest.headers["Authorization"] = "Bearer " + res.data;


// const frcLogout = async (store) => {
//   try {
//     console.log(store)
//     store.dispatch(logOutUser());
//   } catch (error) {
//     console.log(error);
//   }
// }

// export { axiosInterceptor, frcLogout };
export default axiosInterceptor;
