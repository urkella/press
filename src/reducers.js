import getReducers from "./pages/reducers";
import combineReducers from "react-combine-reducers";

const reducers = getReducers();
const appReducers = combineReducers(reducers);

const createReducer = () => {
  const [reducer, initialState] = appReducers;
  return { reducer, initialState };
};

export default createReducer;
