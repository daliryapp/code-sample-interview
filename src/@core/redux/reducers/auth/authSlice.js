import { createSlice } from '@reduxjs/toolkit'
import {
  changePassword,
  updateUserData,
  register,
  verify,
  login,
  logout,
  forgotPassword,
  updateWallets,
  updateWalletsFromSocket
} from './asyncActions'

const initialState = {
  user: null,
  accessToken: undefined,
  refreshToken: undefined,
  accessTokenExpire: undefined,
  refreshTokenExpire: undefined,
  resendEmail: null,
  resendMobile: null,
  resendPassword: null,
  resendCountryId: null,
  resendName: null,
  status: 'idle',

  wallets: {},
  notifications: [],

  createNftStatus: 'idle',

  //register
  registerError: null,

  //verify
  verifyToken: null,
  verifyType: null,
  verifyError: null,

  //login
  loginError: null,

  //changePassword
  changePasswordError: null,
  resetPasswordError: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, { payload }) => {
      state.resendEmail = payload?.email
      state.resendMobile = payload?.mobile
      state.resendPassword = payload?.password
      state.resendName = payload?.name
      state.resendCountryId = payload?.countryId
    },
    replaceNewRefreshToken: (state, { payload }) => {
      const { data } = payload

      state.status = 'idle'
      state.accessToken = data?.accessToken
      state.refreshToken = data?.refreshToken
      state.accessTokenExpire = data?.accessToken?.expiresAt
      state.refreshTokenExpire = data?.refreshToken?.expiresAt
    },
    setNotifications: (state, { payload }) => {
      const newNotif = Array.isArray(payload) ? payload : [payload]

      state.notifications = [...newNotif, ...state.notifications]
    },
    readNotifications: (state, { payload }) => {
      state.notifications = state.notifications.filter(n => n.id !== payload)
    },
    readAllNotifications: state => {
      state.notifications = []
    },
    goBackFromVerify: state => {
      state.status = 'idle'
    }
  },
  // HANDLE STATE UPDATE FOR ASYNC ACTIONS
  extraReducers: builder => {
    builder

      .addCase(register.pending, state => {
        state.status = 'loading'
        state.registerError = null
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.status = 'fulfilled-register'
        state.verifyToken = payload?.token
        state.verifyType = payload?.verifyType
        state.registerError = null
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.status = 'rejected'
        state.registerError = payload
      })
      .addCase(forgotPassword.fulfilled, (state, { payload }) => {
        state.status = 'fulfilled'
        state.verifyToken = payload?.token
        state.verifyType = payload?.verifyType
      })
      .addCase(updateUserData.pending, state => {
        state.status = 'loading'
      })
      .addCase(updateUserData.fulfilled, (state, { payload }) => {
        state.status = 'fulfilled'
        state.user = {
          ...payload,
          avatar: payload?.avatar || null
        }
      })
      .addCase(updateUserData.rejected, (state, { payload }) => {
        state.status = 'rejected'
      })

      //change password
      .addCase(changePassword.pending, state => {
        state.status = 'loading'
        state.changePasswordError = null
      })
      .addCase(changePassword.fulfilled, state => {
        state.status = 'fulfilled-changePassword'
        state.changePasswordError = null
      })
      .addCase(changePassword.rejected, (state, { payload }) => {
        state.status = 'rejected'
        state.changePasswordError = payload
      })

      // verify ::::
      .addCase(verify.pending, state => {
        state.status = 'loading'
        state.verifyError = null
      })
      .addCase(verify.fulfilled, (state, { payload }) => {
        if (state.verifyType === 'FORGOT_PASSWORD') {
          state.forgotPasswordToken = payload?.accessToken
        } else {
          state.accessToken = payload?.accessToken
          state.refreshToken = payload?.refreshToken
          state.accessTokenExpire = payload?.accessToken?.expiresAt
          state.refreshTokenExpire = payload?.refreshToken?.expiresAt
        }
        // COMMON CHANGES
        state.status = 'fulfilled-verify'
        state.verifyToken = null
        state.verifyType = null
        state.resendEmail = null
        state.resendPassword = null
        state.verifyError = null
      })
      .addCase(verify.rejected, (state, { payload }) => {
        state.status = 'rejected'
        state.verifyError = payload
      })

      // login ::::
      .addCase(login.pending, state => {
        state.status = 'loading'
        state.loginError = null
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        if (payload?.verifyType === 'VERIFY_USER') {
          state.status = 'verify-user'
          state.verifyToken = payload?.accessToken
        } else {
          state.status = 'fulfilled-login'
        }
        state.verifyType = payload?.verifyType
        state.accessToken = payload?.accessToken
        state.refreshToken = payload?.refreshToken
        state.accessTokenExpire = payload?.accessToken?.expiresAt
        state.refreshTokenExpire = payload?.refreshToken?.expiresAt
        state.loginError = null
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.status = 'rejected'
        state.loginError = payload
      })

      // logout ::::
      .addCase(logout.pending, state => {
        state.status = 'loading'
        // state.logoutError = null;
      })
      .addCase(logout.fulfilled, state => {
        state.status = 'fulfilled-logout'
        state.status = 'idle'
        state.user = null
        state.accessToken = null
        state.refreshToken = null
        state.accessTokenExpire = null
        state.refreshTokenExpire = null
        state.logoutError = null
        state.wallets = null
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.status = 'rejected'
        state.logoutError = payload
      })

      .addCase(updateWallets.pending, state => {
        state.status = 'loading'
      })
      .addCase(updateWallets.fulfilled, (state, { payload }) => {
        state.wallets = payload
        state.status = 'fulfilled-updateWallets'
      })
      .addCase(updateWallets.rejected, (state, { payload }) => {
        state.status = 'rejected'
        state.wallets = {}
      })

      .addCase(updateWalletsFromSocket.pending, state => {
        state.status = 'loading'
      })
      .addCase(updateWalletsFromSocket.fulfilled, (state, { payload }) => {
        state.wallets = payload
        state.status = 'fulfilled-updateWalletsFromSocket'
      })
      .addCase(updateWalletsFromSocket.rejected, (state, { payload }) => {
        state.status = 'rejected'
      })
  }
})

export const {
  replaceNewRefreshToken,
  setAuthData,
  setNotifications,
  readAllNotifications,
  readNotifications,
  goBackFromVerify
} = authSlice.actions
export default authSlice
