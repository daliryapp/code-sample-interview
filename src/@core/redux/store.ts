import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import settingSlice from './reducers/setting/settingSlice'
import appSlice from './reducers/app/appSlice'
import authSlice from './reducers/auth/authSlice'

const persistedSettingReducer = persistReducer(
  {
    key: 'site.setting',
    storage,
    whitelist: ['theme']
  },
  settingSlice.reducer
)
const persistedAuthReducer = persistReducer(
  {
    key: 'site.auth',
    storage,
    whitelist: [
      'user',
      'address',
      'accessToken',
      'refreshToken',
      'accessTokenExpire',
      'refreshTokenExpire',
    ]
  },
  authSlice.reducer
)
const rootReducer = combineReducers({
  app: appSlice.reducer,
  setting: persistedSettingReducer,
  auth: persistedAuthReducer
})
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;