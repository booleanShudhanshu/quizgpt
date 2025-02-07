import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Use localStorage
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import quizzes from "./quiz";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  quizzes: quizzes,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
