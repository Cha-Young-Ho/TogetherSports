import { createStore } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
  userEmail: "",
  userName: "",
  userNickname: "",
  userBirth: "YYMMDD",
  gender: "",
  admin: "",
  provider: "",
  locationX: "",
  locationY: "",
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
        userBirth: action.payload.userBirth,
        gender: action.payload.gender,
      };
    case INTERESTS:
      // console.log(
      //   Object.entries(action.payload.interests)
      //     .filter((el) => el[1] === true)
      //     .map((el) => el[0])
      // );
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
