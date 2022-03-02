import { createWrapper } from "next-redux-wrapper";
import { createStore } from "redux";
import userRequestReducer from "./userRequestReducer";

const configureStore = () => {
  const store = createStore(userRequestReducer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: true,
});

export default wrapper;
