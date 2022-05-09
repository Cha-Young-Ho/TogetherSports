import { combineReducers, createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";

// 회원정보추가입력 초기값
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
  userNickname: "익명",
  userBirth: "yyyy-mm-dd",
  gender: "",
  userProfileImagePath: "/base_profileImage.jpg",
  activeAreas: [],
  interests: [],
  mannerPoint: "",
  isInformationRequired: "true",
};

// 닉네임 저장 초기값
const saveNicknameInitialState = {
  userNickname: "",
};

// 방 생성 초기값
const createRoomInitialState = {
  roomTitle: "",
  roomContent: "",
  roomArea: "",
  limitPeopleCount: "",
  exercise: "",
  tags: [],
  startAppointmentDate: "",
  endAppointmentDate: "",
  roomImages: [],
};

// 방 필터용 데이터 초기값
const roomFilteringDataInitialState = {
  roomTitle: "",
  roomContent: "",
  area: [],
  exercise: [],
  tags: [],
  startAppointmentDate: "",
  endAppointmentDate: "",
  containTimeClosing: "false",
  containNoAdmittance: "false",
  requiredPeopleCount: "",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  page: "1",
  size: "10",
  sort: "updateTime_DESC",
};

// 필터 적용 및 초기화 클릭 감지용 초기값
const clickDetectionInitialState = {
  detection: "false",
  reset: "false",
  add: "false",
};

const loginStatusChangeInitialState = {
  loginStatus: "false",
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
const SELECTEDAREA = "SELECTEDAREA";
const FILTERBUTTONCLICK = "FILTERBUTTONCLICK";
const RESETBUTTONCLICK = "RESETBUTTONCLICK";
const ADDAREABUTTONCLICK = "ADDAREABUTTONCLICK";
const SETSTARTDATE = "SETSTARTDATE";
const SETENDDATE = "SETENDDATE";
const SETSTARTTIME = "SETSTARTTIME";
const SETENDTIME = "SETENDTIME";
const SETAPPOINTMENTDATE = "SETAPPOINTMENTDATE";
const SETCONTAINTIMECLOSING = "SETCONTAINTIMECLOSING";
const SETCONTAINNOADMITTANCE = "SETCONTAINNOADMITTANCE";
const SETREQUIREDPPLCOUNT = "SETREQUIREDPPLCOUNT";
const RESETALLDATAS = "RESETALLDATAS";
const CHANGELOGINSTATUS = "CHANGELOGINSTATUS";

// 유저 회원정보추가입력 정보 reducer
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
        userProfileImagePath: action.payload.userProfileImagePath,
        activeAreas: action.payload.activeAreas.map((el) => el),
        interests: action.payload.interests.map((el) => el),
        mannerPoint: action.payload.mannerPoint,
        isInformationRequired: action.payload.isInformationRequired,
      };
    default:
      return state;
  }
};

// 타인 정보 확인 시 필요한 닉네임 저장 reducer
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

// 방 생성 reducer
const createRoomReducer = (state = createRoomInitialState, action) => {
  switch (action.type) {
    case ROOMSETTING:
      return {
        ...state,
        roomTitle: action.payload.roomTitle,
        exercise: action.payload.exercise,
        limitPeopleCount: action.payload.limitPeopleCount,
        roomArea: action.payload.roomArea,
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
    case SELECTEDAREA:
      return {
        ...state,
        area: action.payload.area,
      };
    case SETSTARTDATE:
      return {
        ...state,
        startDate: action.payload.startDate,
      };
    case SETENDDATE:
      return {
        ...state,
        endDate: action.payload.endDate,
      };
    case SETSTARTTIME:
      return {
        ...state,
        startTime: action.payload.startTime,
      };
    case SETENDTIME:
      return {
        ...state,
        endTime: action.payload.endTime,
      };
    case SETAPPOINTMENTDATE:
      return {
        ...state,
        startAppointmentDate: action.payload.startAppointmentDate,
        endAppointmentDate: action.payload.endAppointmentDate,
      };
    case SETCONTAINTIMECLOSING:
      return {
        ...state,
        containTimeClosing: action.payload.containTimeClosing,
      };
    case SETCONTAINNOADMITTANCE:
      return {
        ...state,
        containNoAdmittance: action.payload.containNoAdmittance,
      };
    case SETREQUIREDPPLCOUNT:
      return {
        ...state,
        requiredPeopleCount: action.payload.requiredPeopleCount,
      };
    case RESETALLDATAS:
      return roomFilteringDataInitialState;
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
      return { ...state, detection: action.payload.detection };
    case RESETBUTTONCLICK:
      return { ...state, reset: action.payload.reset };
    case ADDAREABUTTONCLICK:
      return { ...state, add: action.payload.add };
    default:
      return state;
  }
};

const loginStatusChangeReducer = (
  state = loginStatusChangeInitialState,
  action
) => {
  switch (action.type) {
    case CHANGELOGINSTATUS:
      return { ...state, loginStatus: action.payload.loginStatus };
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
  loginStatusChangeReducer,
});

const makeStore = () => createStore(rootReducer, composeWithDevTools());

export const wrapper = createWrapper(makeStore, { debug: true });
