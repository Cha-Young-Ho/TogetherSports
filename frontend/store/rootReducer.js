import { combineReducers, createStore } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";

//회원가입 초기값
const signupInitialState = {
  userEmail: "",
  userName: "",
  userNickname: "",
  userBirthYear: "",
  userBirthMonday: "",
  userBirthDay: "",
  mannerPoint: "10",
  gender: "",
  userProfileImage: [],
  provider: "",
  activeAreas: [],
  interests: [],
};

// 닉네임 저장 초기값
const saveNicknameInitialState = {
  userNickname: "",
};

const PERSONALINFO = "PERSONALINFO";
const INTERESTS = "INTERESTS";
const ACTIVEAREA = "ACTIVEAREA";
const AUTHDATA = "AUTHDATA";
const SAVENICKNAME = "SAVENICKNAME";

// 유저 회원가입 정보 reducer
const userRequestReducer = (state = signupInitialState, action) => {
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      console.log("hydrate");
      return { ...state, ...action.payload };
    case AUTHDATA:
      return {
        ...state,
        userEmail: action.payload.userEmail,
        userName: action.payload.userName,
        provider: action.payload.provider,
      };
    case PERSONALINFO:
      console.log(state);
      return {
        ...state,
        userNickname: action.payload.userNickname,
        userBirthYear: action.payload.userBirthYear,
        userBirthMonday: action.payload.userBirthMonday,
        userBirthDay: action.payload.userBirthDay,
        gender: action.payload.gender,
        userProfileImage: [
          {
            userProfileRealName: action.payload.userProfileRealName,
            userProfileExtension: action.payload.userProfileExtension,
            imageSource: action.payload.imageSource,
          },
        ],
      };
    case INTERESTS:
      console.log(state);
      return {
        ...state,
        interests: Object.entries(action.payload.interests)
          .filter((el) => el[1] === true)
          .map((el) => el[0]),
      };
    case ACTIVEAREA:
      console.log(state);
      return {
        ...state,
        activeAreas: action.payload.activeAreas.map((el) => el),
      };
    default:
      console.log("start");
      return state;
  }
};

const userUpdateReducer = (state, action) => {};

// 닉네임 저장 reducer
const saveNicknameReducer = (state = saveNicknameInitialState, action) => {
  switch (action.type) {
    case SAVENICKNAME:
      return {
        ...state,
        userNickname: action.payload.userNickname,
      };
    default:
      return state;
  }
};

// rootReducer로 모든 reducer Combine
const rootReducer = combineReducers({
  userRequestReducer,
  saveNicknameReducer,
});

const makeStore = () => createStore(rootReducer, composeWithDevTools());

export const wrapper = createWrapper(makeStore, { debug: true });