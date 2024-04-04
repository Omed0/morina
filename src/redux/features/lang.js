import useStorage from "@/hooks/useStorage";
import { createSlice } from "@reduxjs/toolkit";

const baseLanguage = {
  id: 23,
  name: "English",
  language_code: "en",
}

const storage = new useStorage();

const initialState = {
  language: storage.get("Lang") || baseLanguage,
};

const language = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      // set the venue id with language array of objects in local storage
      storage.set("Lang", action.payload);
    },
  },
});

export const { setLanguage } = language.actions
export default language.reducer