import axios from "axios";
import { setAuthToken, forceLogout, logOutUser } from "../features/auth/authSlice"
let url = process.env.REACT_APP_BASE_URL;
console.log(process.env.REACT_APP_BASE_URL);


// //for production server
// const API = axios.create({
//   baseURL: url,
// });

// for development server
const API = axios.create({
  baseURL: "http://localhost:9000"
});


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

  //> method used by API.interceptor to handle error
  const errorHandler = (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config.url !== "/user/auth/access_token" && error.config.url !== "/user/auth/activation" && error.config.url !== "/user/auth/resetPassword" && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios
        .post(`${url}/user/auth/access_token`, null, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            store.dispatch(setAuthToken(res.data));
            originalRequest.headers['Authorization'] = "Bearer " + res.data;
            return axios(originalRequest);
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            console.log('logging out')
            console.log('logging out 1')
          }
          store.dispatch(logOutUser());
          console.log(err);
          return Promise.reject(err);
        });
    }
    return Promise.reject(error);
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

export const addNewLoginId = (newLoginData, user_id) =>
  API.post("/user/loginIds/addLoginId", {
    data: newLoginData,
    user_id: user_id,
  });

export const editLoginId = (loginId_id, loginIdData) =>
  API.patch(`/user/loginIds/editLoginId/${loginId_id}`, loginIdData);

export const deleteLoginId = (loginCardId, user_id) =>
  API.delete(`/user/loginIds/deleteLoginId/${loginCardId}`, {
    data: { user_id: user_id },
  });


// > CARDS API_______________________________________
export const fetchUserCards = (user_id) =>
  API.get("/user/cards/getCards", {
    params: {
      user_id: user_id,
    },
  });
//add card____
export const addNewCard = (newCardData, user_id) =>
  API.post("/user/cards/addCard", {
    data: newCardData,
    user_id: user_id,
  });
//edit card___
export const editCard = (card_id, cardData) =>
  API.patch(`/user/cards/editCard/${card_id}`, cardData);

export const deleteCard = (card_id, user_id, carData) =>
  API.delete(`/user/cards/deleteCard/${card_id}`, {
    data: {
      user_id: user_id,
      cardData: carData,
    },
  });

//> DOCS API______________________________________________
export const fetchDocs = (user_id) =>
  API.get("/user/docs/getDocs", {
    params: {
      user_id: user_id,
    },
  });
//add new doc___
export const addNewDoc = (data) => API.post("/user/docs/addDoc", data);

//edit doc___
export const editDoc = (doc_Id, docData) =>
  API.patch(`/user/docs/editDoc/${doc_Id}`, docData);
//delete doc___
export const deleteDoc = (doc_id, user_id, cloud_id) =>
  API.delete(`/user/docs/deleteDoc/${doc_id}`, {
    data: {
      userId: user_id,
      cloudId: cloud_id,
    },
  });

//> ACTIVITY API___________________________________________________________________________________________
export const fetchUserActivities = (user_id) =>
  API.get("/user/activity/getActivities", {
    params: {
      user_id: user_id,
    },
  });
//>add activity___
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
export const loginIdFavouriteToggle = (loginCard_Id, isFav) =>
  API.patch(`/user/loginIds/toggleFavourite/${loginCard_Id}`, {
    data: isFav,
  });

export const cardFavouriteToggle = (card_id, isFav, category) =>
  API.patch(`/user/cards/toggleFavourite/${card_id}`, {
    data: {
      isFav,
      category,
    },
  });
export const docsFavouriteToggle = (doc_id, isFav) =>
  API.patch(`/user/docs/toggleFavourite/${doc_id}`, {
    data: isFav,
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
export const logoutUser = () =>
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
export default axiosInterceptor;

//> Get user
export const getUser = (token) =>
  API.get("/user/auth/info", {
    headers: {
      "Authorization": `Bearer ${token}`
      // "Authorization": 'Bearer' + token
    },
  });

  // originalRequest.headers["Authorization"] = "Bearer " + res.data;