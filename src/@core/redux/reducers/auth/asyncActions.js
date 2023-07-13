import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "src/@core/configs/config";
import customAxios from "src/@core/client/http";
import translateServerErrors from "src/@core/utils/translateServerErrors";

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const {
        email = undefined,
        mobile = undefined,
        name,
        password,
        referredCode,
        gRecaptchaResponse,
        countryId,
      } = data;

      const response = await axios.post(`${BASE_URL}auth/register`, {
        email,
        mobile,
        name,
        password,
        referredCode,
        gRecaptchaResponse,
        countryId,
      });

      return { ...response.data?.data, verifyType: "REGISTER" };
    } catch (error) {
      if (error?.response) {
        const errorMessage = translateServerErrors(error?.response);

        return rejectWithValue(errorMessage);
      } else {
        return rejectWithValue("somethingWentWrong");
      }
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const {
        email = undefined,
        password,
        gRecaptchaResponse,
        isManager = false,
      } = data;
      let response = null;
      if (!isManager) {
        response = await axios.post(`${BASE_URL}auth/login`, {
          email,
          password,
          gRecaptchaResponse,
        });
      } else {
        response = await axios.post(`${BASE_URL}manager/login`, {
          email,
          password,
          gRecaptchaResponse,
        });
      }

      if (!response.data?.data?.isVerify) {
        return { ...response.data?.data, verifyType: "VERIFY_USER" };
      } else {
        return { ...response.data?.data };
      }
    } catch (error) {
      if (error?.response) {
        const errorMessage = translateServerErrors(error?.response);

        return rejectWithValue(errorMessage);
      } else {
        return rejectWithValue("somethingWentWrong");
      }
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (data, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();

      if (auth.logoutError) return;
      const response = await customAxios.delete("user/logout", {
        data: {
          accessToken: auth.accessToken,
        },
      });

      return response.data?.data;
    } catch (error) {
      if (error?.response) {
        const errorMessage = translateServerErrors(error?.response);

        return rejectWithValue(errorMessage);
      } else {
        return rejectWithValue("somethingWentWrong");
      }
    }
  }
);

export const verify = createAsyncThunk(
  "auth/verify",
  async (data, { rejectWithValue }) => {
    try {
      const { token, code, gRecaptchaResponse } = data;

      const response = await axios.post(`${BASE_URL}auth/verify`, {
        token,
        code,
        gRecaptchaResponse,
      });

      return response.data?.data;
    } catch (error) {
      if (error?.response) {
        const errorMessage = translateServerErrors(error?.response);

        return rejectWithValue(errorMessage);
      } else {
        return rejectWithValue("somethingWentWrong");
      }
    }
  }
);

export const updateUserData = createAsyncThunk(
  "user/update-user",
  async (data, { rejectWithValue }) => {
    try {
      const response = await customAxios.get("user/me");

      return response.data?.data;
    } catch (error) {
      if (error?.response) {
        const errorMessage = translateServerErrors(error?.response);

        return rejectWithValue(errorMessage);
      } else {
        return rejectWithValue("somethingWentWrong");
      }
    }
  }
);
export const updateManagerData = createAsyncThunk(
  "user/update-user",
  async (data, { rejectWithValue }) => {
    try {
      const response = await customAxios.get("manager/managers");

      return response.data?.data;
    } catch (error) {
      if (error?.response) {
        const errorMessage = translateServerErrors(error?.response);

        return rejectWithValue(errorMessage);
      } else {
        return rejectWithValue("somethingWentWrong");
      }
    }
  }
);

export const refreshUserToken = createAsyncThunk(
  "user/refresh-user-token",
  async (refreshToken, { rejectWithValue }) => {
    try {
      const response = await customAxios.post("user/refresh-token", {
        refreshToken: "Bearer " + refreshToken,
      });

      return response.data?.data;
    } catch (error) {
      if (error?.response) {
        const errorMessage = translateServerErrors(error?.response);

        return rejectWithValue(errorMessage);
      } else {
        return rejectWithValue("somethingWentWrong");
      }
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgot-password",
  async (data, { rejectWithValue }) => {
    try {
      const { email = undefined, gRecaptchaResponse } = data;
      const response = await customAxios.post(`${BASE_URL}auth/forget-pass`, {
        email,
        gRecaptchaResponse,
      });
      return { ...response.data?.data, verifyType: "FORGOT_PASSWORD" };
    } catch (error) {
      if (error?.response) {
        const errorMessage = translateServerErrors(error?.response);

        return rejectWithValue(errorMessage);
      } else {
        return rejectWithValue("somethingWentWrong");
      }
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (data, { rejectWithValue }) => {
    try {
      const { token, password, gRecaptchaResponse } = data;

      const response = await axios.post(`${BASE_URL}auth/reset-password`, {
        token,
        password,
        gRecaptchaResponse,
      });

      return response.data?.data;
    } catch (error) {
      if (error?.response) {
        const errorMessage = translateServerErrors(error?.response);

        return rejectWithValue(errorMessage);
      } else {
        return rejectWithValue("somethingWentWrong");
      }
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/change-password",
  async (data, { rejectWithValue }) => {
    try {
      const { newPassword, oldPassword } = data;

      const response = await customAxios.put("user/password", {
        oldPassword,
        newPassword,
      });

      return response.data?.data;
    } catch (error) {
      if (error?.response) {
        const errorMessage = translateServerErrors(error?.response);

        return rejectWithValue(errorMessage);
      } else {
        return rejectWithValue("somethingWentWrong");
      }
    }
  }
);

export const updateWallets = createAsyncThunk(
  "user/update-wallets",
  async (data, { rejectWithValue }) => {
    try {
      const walletResponse = await customAxios.get("wallet");

      const formattedWallets = {};

      return formattedWallets;
    } catch (error) {
      if (error?.response) {
        const errorMessage = translateServerErrors(error?.response);

        return rejectWithValue(errorMessage);
      } else {
        return rejectWithValue("somethingWentWrong");
      }
    }
  }
);

export const updateWalletsFromSocket = createAsyncThunk(
  "user/update-wallets-socket",
  async (data, { rejectWithValue, getState }) => {
    try {
      const newWallets = Object.values(getState()?.auth?.wallets);

      data?.forEach((item) => {
        const index = newWallets?.findIndex?.(
          (w) => w.assetId === item.assetId
        );

        if (index !== -1) newWallets[index] = { ...newWallets[index], ...item };
      });

      const finalWallets = {};
      newWallets?.forEach?.((item) => {
        finalWallets[item.coin] = item;
      });

      return finalWallets;
    } catch (error) {
      if (error?.response) {
        const errorMessage = translateServerErrors(error?.response);

        return rejectWithValue(errorMessage);
      } else {
        return rejectWithValue("somethingWentWrong");
      }
    }
  }
);

export const getWizardData = createAsyncThunk(
  "auth/get-wizard-data",
  async (data, { rejectWithValue }) => {
    try {
      const response = await customAxios.get(`${BASE_URL}user/wizard-list`);

      const formattedWizardObj = {};
      response.data?.data?.forEach(
        (w) => (formattedWizardObj[w.type] = w?.step)
      );

      return formattedWizardObj;
    } catch (error) {
      if (error?.response) {
        const errorMessage = translateServerErrors(error?.response);

        return rejectWithValue(errorMessage);
      } else {
        return rejectWithValue("somethingWentWrong");
      }
    }
  }
);
