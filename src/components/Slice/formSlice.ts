import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { newForm } from "./types"; // Import your FormState interface
import { v4 as uuidv4 } from 'uuid'; // Import UUID function
interface FormStateSlice {
  form: newForm;
}

const initialState: FormStateSlice = {
  form: {
    id: undefined,
    title: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    nationality: "",
    idCardNumber: "",
    gender: [],
    mobileNumber: "",
    passportNumber: "",
    expectedSalary: "",
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    // Ensure the PayloadAction is correctly typed with `FormState`
    saveForm: (state, action: PayloadAction<newForm>) => {
      // Generate a new ID only if it's missing from the payload
      const newForm = {
        ...action.payload,
        id: action.payload.id || uuidv4(), // Use existing id or generate a new one
      };
      state.form = newForm;

      const existingFormData = localStorage.getItem("formData");
      const allFormData: newForm[] = existingFormData ? JSON.parse(existingFormData) : [];
      allFormData.push(newForm);
      localStorage.setItem("formData", JSON.stringify(allFormData));
    },
    resetForm: (state) => {
      state.form = initialState.form;
      localStorage.removeItem("formData"); // Corrected to match the key used for saving data
    },
  },
});

export const {

  saveForm,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;
