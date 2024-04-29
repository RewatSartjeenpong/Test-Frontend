/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { UserData} from "./types";

interface UserState {
  userData: UserData | null;
  editUser: UserData | null;
}

const initialState: UserState = {
  userData: null,
  editUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
    setEditUser: (state, action: PayloadAction<UserData>) => {
      state.editUser = action.payload;
    },
    deleteUserData: (state, action: PayloadAction<string>) => {
      if (state.userData) {
        const filteredData = state.userData.filter(
          (item: { id: string }) => item.id !== action.payload
        );

        state.userData = filteredData;

        localStorage.setItem("formData", JSON.stringify(filteredData));
      }
    },
    editUserData: (state, action: PayloadAction<UserData>) => {
      if (state.userData && state.editUser) {
        const updatedData = state.userData.map((item: { id: any }) =>
          item.id === action.payload.id ? action.payload : item
        );
        state.userData = updatedData;
        state.editUser = null; // กำหนดค่าของ editUser เป็น null เมื่อข้อมูลถูกแก้ไขแล้ว
        localStorage.setItem("formData", JSON.stringify(updatedData));
      }
    },
  },
});

export const { setUserData, deleteUserData, editUserData } = userSlice.actions;

export const selectUserData = (state: RootState) => state.user.userData;
export const selectEditUser = (state: RootState) => state.user.editUser;
export default userSlice.reducer;
