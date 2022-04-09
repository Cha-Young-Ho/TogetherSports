import { combineReducers, createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";

//회원가입 초기값
const signupInitialState = {
  userNickname: "",
  userBirth: "",
  activeAreas: [],
  gender: "",
  userProfileImage: {
    userProfileExtension: "",
    imageSource: "",
  },
  interests: [],
};

// 내 정보 초기값
const myInfoInitialState = {
  userEmail: "",
  userName: "",
  userNickname: "",
  userBirth: "yyyy-mm-dd",
  gender: "",
  userProfileImage: {
    userProfileExtension: "",
    imageSource: "",
  },
  activeAreas: [],
  interests: [],
  mannerPoint: "",
};

// 닉네임 저장 초기값
const saveNicknameInitialState = {
  userNickname: "",
};

// 방 생성 초기값
const createRoomInitialState = {
  roomTitle: "",
  roomContent: "",
  roomArea: {},
  limitPeopleCount: "",
  exercise: "",
  tag: [],
  startAppointmentDate: "",
  endAppointmentDate: "",
  roomImages: [],
};

// 방 필터용 데이터 초기값
const roomFilteringDataInitialState = {
  creatorNickname: "",
  roomTitle: "",
  roomContent: "",
  area: "",
  exercise: [],
  tag: [],
  startAppointmentDate: "",
  endAppointmentDate: "",
  date: "",
  startTime: "",
  endTime: "",
};

// 필터 적용 클릭 감지용 초기값
const clickDetectionInitialState = {
  detection: "false",
};

// 오타 방지용
const PERSONALINFO = "PERSONALINFO";
const INTERESTS = "INTERESTS";
const SAVENICKNAME = "SAVENICKNAME";
const SAVEMYINFO = "SAVEMYINFO";
const ROOMSETTING = "ROOMSETTING";
const ROOMSCHEDULE = "ROOMSCHEDULE";
const FILTERINGTITLE = "FILTERINGTITLE";
const ROOMEXERCISES = "ROOMEXERCISES";
const FILTERBUTTONCLICK = "FILTERBUTTONCLICK";
const SETDATE = "SETDATE";
const SETSTARTTIME = "SETSTARTTIME";
const SETENDTIME = "SETENDTIME";

// 유저 회원가입 정보 reducer
const userRequestReducer = (state = signupInitialState, action) => {
  switch (action.type) {
    case PERSONALINFO:
      return {
        ...state,
        userNickname: action.payload.userNickname,
        userBirth: action.payload.userBirth,
        gender: action.payload.gender,
        userProfileImage: {
          userProfileExtension: action.payload.userProfileExtension,
          imageSource: action.payload.imageSource,
        },
      };
    case INTERESTS:
      return {
        ...state,
        interests: Object.entries(action.payload.interests)
          .filter((el) => el[1] === true)
          .map((el) => el[0]),
      };
    default:
      return state;
  }
};

// 내 프로필 조회-> 내 정보 저장 reducer
const myInfoReducer = (state = myInfoInitialState, action) => {
  switch (action.type) {
    case SAVEMYINFO:
      return {
        ...state,
        userEmail: action.payload.userEmail,
        userName: action.payload.userName,
        userNickname: action.payload.userNickname,
        userBirth: action.payload.userBirth,
        gender: action.payload.gender,
        userProfileImage: {
          imageSource: action.payload.imageSource,
        },
        activeAreas: action.payload.activeAreas.map((el) => el),
        interests: action.payload.interests.map((el) => el),
        mannerPoint: action.payload.mannerPoint,
      };
    default:
      return state;
  }
};

// 닉네임 저장 reducer [[[[지울예정]]]]
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

const createRoomReducer = (state = createRoomInitialState, action) => {
  switch (action.type) {
    case ROOMSETTING:
      return {
        ...state,
        roomTitle: action.payload.roomTitle,
        exercise: action.payload.exercise,
        limitPeopleCount: action.payload.limitPeopleCount,
        roomArea: {
          area: action.payload.roomArea.area,
          areaDetail: action.payload.roomArea.areaDetail,
        },
      };
    case ROOMSCHEDULE:
      return {
        ...state,
        startAppointmentDate: action.payload.startAppointmentDate,
        endAppointmentDate: action.payload.endAppointmentDate,
      };
    default:
      return state;
  }
};

// 방 필터용 데이터
const roomFilteringDataReducer = (
  state = roomFilteringDataInitialState,
  action
) => {
  switch (action.type) {
    case FILTERINGTITLE:
      return {
        ...state,
        roomTitle: action.payload.roomTitle,
      };
    case ROOMEXERCISES:
      return {
        ...state,
        exercise: Object.entries(action.payload.exercise)
          .filter((el) => el[1] === true)
          .map((el) => el[0]),
      };
    case SETDATE:
      return {
        ...state,
        date: action.payload.date,
      };
    case SETSTARTTIME:
      return {
        ...state,
        startTime: action.payload.date,
      };
    case SETENDTIME:
      return {
        ...state,
        endTime: action.payload.date,
      };
    default:
      return state;
  }
};

const filteringButtonClickDetectionReducer = (
  state = clickDetectionInitialState,
  action
) => {
  switch (action.type) {
    case FILTERBUTTONCLICK:
      return { ...state, det: action.payload.det };
    default:
      return state;
  }
};

// rootReducer로 모든 reducer Combine
const rootReducer = combineReducers({
  userRequestReducer,
  saveNicknameReducer,
  myInfoReducer,
  createRoomReducer,
  roomFilteringDataReducer,
  filteringButtonClickDetectionReducer,
});

const makeStore = () => createStore(rootReducer, composeWithDevTools());

export const wrapper = createWrapper(makeStore, { debug: true });
