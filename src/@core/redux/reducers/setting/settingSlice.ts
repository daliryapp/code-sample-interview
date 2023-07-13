import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  theme: 'light',
}

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {

    toggleTheme: state => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    changeTheme: (state, { payload }) => {
      state.theme = payload
    },

  }
})

export const { toggleTheme, changeTheme } = settingSlice.actions
export default settingSlice
