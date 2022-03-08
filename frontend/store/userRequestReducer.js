import { createStore } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
  userEmail: "",
  userName: "",
  userNickname: "",
  userBirthYear: "",
  userBirthMonday: "",
  userBirthDay: "",
  gender: "",
  profile_fileName: "",
  profile_extention: "",
  imagesrc: "",
  admin: "",
  provider: "",
  activeAreas: [],
  interests: [],
};

const PERSONALINFO = "PERSONALINFO";
const REQUESTUSERS = "REQUESTUSERS";
const INTERESTS = "INTERESTS";

const userRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      console.log("hydrate");
      return { ...state, ...action.payload };
    case PERSONALINFO:
      console.log(state);
      return {
        ...state,
        userNickname: action.payload.userNickname,
        userBirthYear: action.payload.userBirthYear,
        userBirthMonday: action.payload.userBirthMonday,
        userBirthDay: action.payload.userBirthDay,
        gender: action.payload.gender,
        profile_fileName: action.payload.profile_fileName,
        profile_extention: action.payload.profile_extention,
        imagesrc: action.payload.imagesrc,
      };
    case INTERESTS:
      console.log(state);
      return {
        ...state,
        interests: Object.entries(action.payload.interests)
          .filter((el) => el[1] === true)
          .map((el) => el[0]),
      };
    case REQUESTUSERS:
      console.log("회원가입 신청");
      console.log(action.payload);

      return {
        ...state,
      };
    default:
      console.log("start");
      return state;
  }
};

const makeStore = (context) =>
  createStore(userRequestReducer, composeWithDevTools());

export const wrapper = createWrapper(makeStore, { debug: true });
