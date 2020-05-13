import { createStore, applyMiddleware,thunk,logger} from "../kRudux";

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "add":
      return state + 1;
    case "minus":
      return state - 1;
    default:
      return state;
  }
};

const store = createStore(
    counterReducer,
    applyMiddleware(thunk, logger)
);
export default store;
