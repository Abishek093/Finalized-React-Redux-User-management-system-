import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";

const admin = JSON.parse(localStorage.getItem("admin"));

const initialState = {
  admin: admin ? admin : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  users: [],
};

//Login admin
export const login = createAsyncThunk(
  "adminAuth/login",
  async (admin, thunkAPI) => {
    try {
      console.log("Slice", admin);
      return await adminService.login(admin);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Logout
export const logout = createAsyncThunk("adminAuth/logout", async () => {
  console.log("admin logout slice");
  adminService.logoutAdmin();
});

//get all users

export const getAllusers = createAsyncThunk(
  "adminAuth/getAllusers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.admin.token;
      const response = await adminService.getAllusers(token);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editUser = createAsyncThunk("adminAuth/editUser", async ({userId , name , email}, thunkAPI)=>{
  try {
    const token = thunkAPI.getState().adminAuth.admin.token
    const response = await adminService.editUser(token, userId, name , email)

    return response.data
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

export const blockUser = createAsyncThunk(
  "adminAuth/userBlock",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.admin.token;
      console.log("Call 2", userId, token);
      return await adminService.blockUser(userId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const AddNewUser = createAsyncThunk ('adminAuth/addUser' , async(userData , thunkAPI)=> {
  try {
     const token  = thunkAPI.getState().adminAuth.admin.token;
     const response = await adminService.createUser(token , userData);
     console.log(userData, token);
     return response.data
  } catch (error) {
    const message = (error.response && error.response.data.message) || error.message
    || error.toString();
     return thunkAPI.rejectWithValue(message)
  }
})


export const adminSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admin = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.admin = null;
      })

      //
      .addCase(logout.fulfilled, (state) => {
        state.admin = null;
        state.isError = false; // Reset any error state
        state.isSuccess = false; // Reset any success state
        state.message = ""; // Reset any message
      })

      ///
      .addCase(getAllusers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllusers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.users = action.payload;
      })
      ///
      .addCase(blockUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload.users;
      })
      .addCase(blockUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      ///
      .addCase(editUser.pending , (state ) => {
        state.isLoading = true
      })
      .addCase(editUser.fulfilled , (state , action)=> {
        state.isLoading = false
        state.isSuccess = true
        state.users = action.payload.users 
      })
      .addCase(editUser.rejected , (state ,action)=> {
        state.isLoading = false
        state.isError = true
        state.message = action.payload.users
      })

      .addCase(AddNewUser.pending,(state)=> {
        state.isLoading = true
      })
      // .addCase(AddNewUser.fulfilled ,(state , action)=> {
      //   state.isLoading = false
      //   state.isSuccess = true
      //   state.users = action.payload
      // })
      // .addCase(AddNewUser.rejected ,(state ,action)=> {
      //   state.isLoading = false
      //   state.isError = true
      //   state.message = action.payload
      // })
      
  },
});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;
