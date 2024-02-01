import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { lifeAxios } from '../../../utility/apiAccess';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* Initial State */
const initialState = {
  loading: true,
  user: {},
  error: null,
  tokenError: null,
};
/* It will store jwt token in the local storage */
const storeJwt = async (jwt) =>
{
  await AsyncStorage.setItem("jwt", jwt)
};

const getJwt = async () =>
{
  return await AsyncStorage.getItem('jwt');
}

/* It will remove jwt token from the local storage */
const removeJwt = async () =>
{
  await AsyncStorage.removeItem("jwt")
};

const userSignupAsync = async ({ formData, showNotification }, { rejectWithValue }) =>
{
  try {
    const response = await lifeAxios(await getJwt()).post(
      `/users/signup`,
      formData
    );
    if (response.data.status === 'success') await storeJwt(response.data.token);
    showNotification('success');
    return response.data.data.user;
  } catch (error) {
    showNotification('error', error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
}

/* Signup User */
export const userSignup = createAsyncThunk(
  'user/signup',
  userSignupAsync
);


const userLoginAsync = async ({ formData, showNotification }, { rejectWithValue }) =>
{
  try {
    const response = await lifeAxios(await getJwt()).post(
      `/users/login`,
      formData
    );
    if (response.data.status === 'success') await storeJwt(response.data.token);
    showNotification('success');
    return response.data.data.user;
  } catch (error) {
    showNotification('error', error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
}

/* Login User */
export const userLogin = createAsyncThunk(
  'user/login',
  userLoginAsync
);

const loginWithSocialAsync = async ({ formData, showNotification }, { rejectWithValue }) =>
{
  try {
    const response = await lifeAxios(await getJwt()).post(
      `/users/loginWithSocialMedia`,
      formData
    );
    if (response.data.status === 'success') await storeJwt(response.data.token);
    showNotification('success');
    return response.data.data.user;
  } catch (error) {
    showNotification('error', error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
}

/* Login User Social */
export const userLoginWithSocialMedia = createAsyncThunk(
  'user/loginWithSocialMedia',
  loginWithSocialAsync
);
/* Logout User */
export const userLogout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) =>
  {
    try {
      const response = await lifeAxios(await getJwt()).get(
        `/users/logout`
      );
      if (response.data.status === 'success') await removeJwt();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const getMeAsync = async () =>
{
  try {
    const response = await lifeAxios(await getJwt()).get(
      `/users/me`
    );
    return response.data.data.data;
  } catch (error) {
    return error.response.data;
  }
}

/* Get the current login user */
export const getMe = createAsyncThunk(
  'user/me',
  getMeAsync
);

const updateMeAsync = async (formData) =>
{
  try {
    const response = await lifeAxios(await getJwt()).patch(
      `/users/updateMe`,
      formData
    );
    return response.data.data.user;
  } catch (error) {
    return error.response.data;
  }
}

export const updateMe = createAsyncThunk(
  'user/updateMe',
  updateMeAsync
);

const verifyEmailAsync = async (token, { rejectWithValue }) =>
{
  try {
    const response = await lifeAxios(await getJwt()).patch(
      `/users/verifyEmail/${token}`
    );
    return response.data.data.user;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
}

/* Verify Email */
export const verifyEmail = createAsyncThunk(
  'user/verifyEmail',
  verifyEmailAsync
);

const forgotPasswordAsync = async ({ formData, showNotification }, { rejectWithValue }) =>
{
  try {
    const response = await lifeAxios(await getJwt()).post(
      `/users/forgotPassword`,
      formData
    );
    showNotification('success');
    return response.data.data.user;
  } catch (error) {
    showNotification('error', error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
}

/* Forgot Password */
export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  forgotPasswordAsync
);


const resetPasswordAsync = async ({ token, formData, showNotification }, { rejectWithValue }) =>
{
  try {
    const response = await lifeAxios(await getJwt()).patch(
      `/users/resetPassword/${token}`,
      formData
    );
    if (response.data.status === 'success') await storeJwt(response.data.token);
    showNotification('success');
    return response.data.data.user;
  } catch (error) {
    showNotification('error', error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
}
/* Reset Password */
export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  resetPasswordAsync
);

const userUpdateReceiveEmailsAsync = async ({ userId, receiveEmails }, { rejectWithValue }) =>
{
  try {
    const response = await lifeAxios(await getJwt()).patch(
      `/users/${userId}/receiveEmails`,
      { receiveEmails }
    );
    return response.data.data.user;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
}

export const userUpdateReceiveEmails = createAsyncThunk(
  'user/updateReceiveEmails',
  userUpdateReceiveEmailsAsync
);

/* User Reducer */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) =>
  {
    builder
      .addCase(verifyEmail.rejected, (state, action) =>
      {
        state.tokenError = action.payload;
      })
      .addCase(userLogout.fulfilled, (state) =>
      {
        state.user = {};
        state.loading = false;
        state.error = null;
        state.tokenError = null;
      })
      .addCase(userUpdateReceiveEmails.fulfilled, (state, action) =>
      {
        state.loading = false;
        state.user.receiveEmails = action.payload.receiveEmails;
        state.error = null;
      })
      .addCase(userUpdateReceiveEmails.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.payload;
      })
      .addMatcher(
        isAnyOf(
          userSignup.pending,
          userLogin.pending,
          userLoginWithSocialMedia.pending,
          verifyEmail.pending,
          forgotPassword.pending,
          resetPassword.pending,
          getMe.pending,
          updateMe.pending
        ),
        (state) =>
        {
          state.loading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          userSignup.fulfilled,
          userLogin.fulfilled,
          userLoginWithSocialMedia.fulfilled,
          verifyEmail.fulfilled,
          forgotPassword.fulfilled,
          resetPassword.fulfilled,
          getMe.fulfilled,
          updateMe.fulfilled
        ),
        (state, action) =>
        {
          state.loading = false;
          state.user = action.payload;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          userSignup.rejected,
          userLogin.rejected,
          userLoginWithSocialMedia.rejected,
          verifyEmail.rejected,
          forgotPassword.rejected,
          resetPassword.rejected,
          getMe.rejected,
          updateMe.rejected
        ),
        (state, action) =>
        {
          state.loading = false;
          state.user = {};
          state.error = action.payload;
        }
      );
  },
});

export default userSlice.reducer;
