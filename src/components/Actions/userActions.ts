import { ThunkAction } from "redux-thunk";
import { RootState } from "../Slice/store";
import { editUserData, setUserData } from "../Slice/userSlice";
import {  UserData } from "../Slice/types";
import { Action } from "redux";

export const fetchUserData =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      const userDataString = localStorage.getItem("formData");
      if (userDataString) {
        const userData: UserData = JSON.parse(userDataString);
        dispatch(setUserData(userData));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  export const fetchUserDataById = (id: string): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
    try {
      const userDataString = localStorage.getItem("formData");
      if (userDataString) {
        const userData: UserData[] = JSON.parse(userDataString);
        const selectedUserData = userData.find((user) => user.id === id);
        if (selectedUserData) {
          dispatch(editUserData(selectedUserData)); 
        }
      }
    } catch (error) {
      console.error("Error fetching user data by ID:", error);
    }
  };
