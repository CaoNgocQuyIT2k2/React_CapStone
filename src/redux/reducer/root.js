import { combineReducers } from "redux";
import {movieReducer} from './movie'

export let rootReducer = combineReducers({
  movieReducer: movieReducer,
});