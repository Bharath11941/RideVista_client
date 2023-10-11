import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {persistStore} from 'redux-persist'
import {configureStore} from "@reduxjs/toolkit"
import {combineReducers} from "@reduxjs/toolkit"
import userReducer from "../reduxStore/slices/userSlice"
import partnerReducer from '../reduxStore/slices/partnerSlice'

const persistConfig = { key: 'root', storage, version: 1 };
const reducer = combineReducers({
  userReducer,
  partnerReducer
})
const persistedReducer = persistReducer(persistConfig,reducer)
const store = configureStore({
  reducer:persistedReducer
})
const persistor = persistStore(store)

export {store,persistor}