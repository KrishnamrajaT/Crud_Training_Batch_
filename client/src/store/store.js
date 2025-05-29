import { configureStore } from '@reduxjs/toolkit'
import userSlice from './usersReducer'

export const store = configureStore({
  reducer: {
    userReducer: userSlice,
  },
})