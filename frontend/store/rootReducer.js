import { combineReducers, createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import SockJS from "sockjs-client";

// 회원정보추가입력 초기값
const signupInitialState = {
  userNickname: "",
  userBirth: "",
  activeAreas: [],
  gender: "",
  userProfileExtension: "",
  imageSource: "",
  interests: [],
};

// 내 정보 초기값
const myInfoInitialState = {
  id: 0,
  userEmail: "",
  userName: "",
  userNickname: "익명",
  userBirth: "yyyy-mm-dd",
  mannerPoint: 0,
  activeAreas: [],
  userProfileImagePath:
    "https://together-sports.com/images/default_user_profile.jpeg",
  interests: [],
  gender: "",
  isInformationRequired: true,
};

// 닉네임 저장 초기값
const saveClickedUserInitialState = {
  id: 0,
  userNickname: "",
};

// 방 생성 초기값
const createRoomInitialState = {
  roomTitle: "",
  roomContent: "",
  roomArea: "",
  limitPeopleCount: 2,
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
  page: 1,
  size: 10,
  sort: "updateTime_DESC",
};

// 필터 적용 및 초기화 클릭 감지용 초기값
const clickDetectionInitialState = {
  detection: "false",
  reset: "false",
  add: "false",
};

// 로그인 상태 확인용 초기값
const loginStatusChangeInitialState = {
  loginStatus: false,
};

// roomID 초기값
const saveRoomIdInitialState = {
  roomId: 0,
};

// 캘린더용 날짜 저장 초기값
const saveRoomDateInitialState = {
  appointmentDate: "",
};

// 활동 지역 초기값
const saveActiveAreaInitialState = {
  activeAreas: [],
  tagAreas: [],
  placeOfMeeting: "",
};

// 방장 정보 저장 초기값
const saveRoomHostInitialState = {
  beforeHostNickname: "",
  beforeHostId: 0,
  afterHostNickname: "",
  afterHostId: 0,
};

const saveRoomCountInitialState = {
  roomCount: 0,
};

// 운동 대기방 페이지 데이터 저장을 위한 초기값
const roomRealTimeInfoInitialState = {
  roomTitle: "",
  roomContent: "",
  roomArea: "",
  exercise: "",
  participantCount: 0,
  limitPeopleCount: 0,
  startAppointmentDate: "",
  endAppointmentDate: "",
  createdTime: "",
  host: "",
  creatorNickName: "",
  roomImages: [
    {
      imagePath: "https://together-sports.com/images/default_room_image.png",
      order: 0,
      roomImageExtension: "png",
    },
  ],
  tags: [],
  viewCount: 0,
  participants: [],
};

// 방 설명 팝업에 쓰일 이미지 저장을 위한 초기값
const saveRoomModalImagesInitialState = {
  roomImages: [
    {
      imagePath: "https://together-sports.com/images/default_room_image.png",
      order: 0,
      roomImageExtension: "png",
    },
  ],
};

// WS 실시간 알림 저장을 위한 초기값
const saveRoomAlarmInitialState = {
  // 임시 텍스트
  messages: [],
};

// 다른 회원 정보 조회를 위한 초기값
const saveOtherInfoInitialState = {
  id: 0,
  userNickname: "",
  mannerPoint: 0,
  mannerType: "",
  activeAreas: [],
  userProfileImagePath: "",
  interests: [],
  gender: "",
};

// 오타 방지용
const PERSONALINFO = "PERSONALINFO";
const INTERESTS = "INTERESTS";
const SAVECLICKEDUSERINFO = "SAVECLICKEDUSERINFO";
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
const SAVEROOMID = "SAVEROOMID";
const SAVEROOMDATE = "SAVEROOMDATE";
const SAVEACTIVEAREA = "SAVEACTIVEAREA";
const SAVETAGAREAS = "SAVETAGAREAS";
const SAVEPOM = "SAVEPOM";
const SAVEROOMHOST = "SAVEROOMHOST";
const SAVEROOMCOUNT = "SAVEROOMCOUNT";
const SAVEROOMINFOS = "SAVEROOMINFOS";
const CHANGEHOST = "CHANGEHOST";
const CHANGEPARTICIPANTSTATUS = "CHANGEPARTICIPANTSTATUS";
const SAVEROOMMODALIMAGES = "SAVEROOMMODALIMAGES";
const SAVEROOMALARM = "SAVEROOMALARM";
const SAVEOTHERINFO = "SAVEOTHERINFO";

// 유저 회원정보추가입력 정보 reducer
const userRequestReducer = (state = signupInitialState, action) => {
  switch (action.type) {
    case PERSONALINFO:
      return {
        ...state,
        userNickname: action.payload.userNickname,
        userBirth: action.payload.userBirth,
        gender: action.payload.gender,
        userProfileExtension: action.payload.userProfileExtension,
        imageSource: action.payload.imageSource,
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
        id: action.payload.id,
        userEmail: action.payload.userEmail,
        userName: action.payload.userName,
        userNickname: action.payload.userNickname,
        userBirth: action.payload.userBirth,
        mannerPoint: action.payload.mannerPoint,
        activeAreas: action.payload.activeAreas.map((el) => el),
        userProfileImagePath: action.payload.userProfileImagePath,
        interests: action.payload.interests.map((el) => el),
        gender: action.payload.gender,
        isInformationRequired: action.payload.isInformationRequired,
      };
    default:
      return state;
  }
};

// 참가자 목록에서 클릭된 유저의 정보 저장용 reducer
const saveClickedUserReducer = (
  state = saveClickedUserInitialState,
  action
) => {
  switch (action.type) {
    case SAVECLICKEDUSERINFO:
      return {
        ...state,
        id: action.payload.id,
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

// 방 번호 저장(chatting 참여를 위해)
const saveRoomIdReducer = (state = saveRoomIdInitialState, action) => {
  switch (action.type) {
    case SAVEROOMID:
      return {
        ...state,
        roomId: action.payload.roomId,
      };
    default:
      return state;
  }
};

// 방 날짜 정보 저장
const saveRoomDateReducer = (state = saveRoomDateInitialState, action) => {
  switch (action.type) {
    case SAVEROOMDATE:
      return {
        ...state,
        appointmentDate: action.payload.appointmentDate,
      };
    default:
      return state;
  }
};

// 활동지역 정보 관련 저장
const saveActiveAreaReducer = (state = saveActiveAreaInitialState, action) => {
  switch (action.type) {
    case SAVEACTIVEAREA:
      return {
        ...state,
        activeAreas: action.payload.activeAreas,
      };
    case SAVETAGAREAS:
      return {
        ...state,
        tagAreas: action.payload.tagAreas,
      };
    case SAVEPOM:
      return {
        ...state,
        placeOfMeeting: action.payload.placeOfMeeting,
      };
    default:
      return state;
  }
};

// 방장이 바뀌면 WS로 알리기위해 해당 내용 저장
const saveRoomHostReducer = (state = saveRoomHostInitialState, action) => {
  switch (action.type) {
    case SAVEROOMHOST:
      return {
        ...state,
        beforeHostNickname: action.payload.beforeHostNickname,
        beforeHostId: action.payload.beforeHostId,
        afterHostNickname: action.payload.afterHostNickname,
        afterHostId: action.payload.afterHostId,
      };
    default:
      return state;
  }
};

// 메인페이지 방 개수 저장 reducer
const saveRoomCountReducer = (state = saveRoomCountInitialState, action) => {
  switch (action.type) {
    case SAVEROOMCOUNT:
      return { ...state, roomCount: action.payload.roomCount };
    default:
      return state;
  }
};

// 운동 대기방(채팅 포함) 방 정보 저장 reducer
const roomRealTimeInfoReducer = (
  state = roomRealTimeInfoInitialState,
  action
) => {
  switch (action.type) {
    case SAVEROOMINFOS:
      return {
        ...state,
        roomTitle: action.payload.roomTitle,
        roomContent: action.payload.roomContent,
        roomArea: action.payload.roomArea,
        exercise: action.payload.exercise,
        participantCount: action.payload.participantCount,
        limitPeopleCount: action.payload.limitPeopleCount,
        startAppointmentDate: action.payload.startAppointmentDate,
        endAppointmentDate: action.payload.endAppointmentDate,
        createdTime: action.payload.createdTime,
        host: action.payload.host,
        creatorNickName: action.payload.createNickName,
        roomImages: action.payload.roomImages,
        tags: action.payload.tags,
        viewCount: action.payload.viewCount,
        participants: action.payload.participants,
      };
    case CHANGEHOST:
      return {
        ...state,
        host: action.payload.host,
      };
    case CHANGEPARTICIPANTSTATUS:
      return {
        ...state,
        participants: action.payload.participants,
      };
    default:
      return state;
  }
};

// 방 설명 팝업 이미지 저장 reducer
const saveRoomModalImagesReducer = (
  state = saveRoomModalImagesInitialState,
  action
) => {
  switch (action.type) {
    case SAVEROOMMODALIMAGES:
      return {
        ...state,
        roomImages: action.payload.roomImages,
      };
    default:
      return state;
  }
};

// WS 실시간 알림 저장을 위한 reducer
const saveRoomAlarmReducer = (state = saveRoomAlarmInitialState, action) => {
  const { messages } = state;
  switch (action.type) {
    case SAVEROOMALARM:
      return {
        ...state,
        messages: [...messages, action.payload.messages],
      };
    default:
      return state;
  }
};

// 다른 회원 정보 조회를 위한 reducer
// 동기문제 없다면 삭제
const saveOtherInfoReducer = (state = saveOtherInfoInitialState, action) => {
  switch (action.type) {
    case SAVEOTHERINFO:
      return {
        ...state,
        id: action.payload.id,
        userNickname: action.payload.userNickname,
        mannerPoint: action.payload.mannerPoint,
        mannerType: action.payload.mannerType,
        activeAreas: action.payload.activeAreas,
        userProfileImagePath: action.payload.userProfileImagePath,
        interests: action.payload.interests,
        gender: action.payload.gender,
      };
    default:
      return state;
  }
};

// rootReducer로 모든 reducer Combine
const rootReducer = combineReducers({
  userRequestReducer,
  saveClickedUserReducer,
  myInfoReducer,
  createRoomReducer,
  roomFilteringDataReducer,
  filteringButtonClickDetectionReducer,
  loginStatusChangeReducer,
  saveRoomIdReducer,
  saveRoomDateReducer,
  saveActiveAreaReducer,
  saveRoomHostReducer,
  saveRoomCountReducer,
  roomRealTimeInfoReducer,
  saveRoomModalImagesReducer,
  saveRoomAlarmReducer,
  saveOtherInfoReducer,
});

const makeStore = () => createStore(rootReducer, composeWithDevTools());

export const wrapper = createWrapper(makeStore, { debug: false });
