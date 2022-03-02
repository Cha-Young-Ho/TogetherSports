import { createStore } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

const initialState = {
  user: {
    isLogin: false,
  },
};

const REQUESTUSERS = "REQUESTUSERS";

const userRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      console.log("hydrate");
      return { ...state, ...action.payload };
    case REQUESTUSERS:
      console.log("회원가입 신청");
      console.log(state.user.isLogin);

      return {
        ...state,
        user: {
          ...state.user,
          isLogin: true,
        },
      };
    default:
      console.log("start");
      return state;
  }
};

const makeStore = (context) => createStore(userRequestReducer);

export const wrapper = createWrapper(makeStore, { debug: true });
