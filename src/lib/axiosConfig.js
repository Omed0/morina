import { setLanguageChangeLoading } from "@/redux/features/venueSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const config = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

config.defaults.headers.common['Authorization'] = `${process.env.NEXT_PUBLIC_TOKEN}`;


export const fetchAllData = createAsyncThunk(
  "venue/fetchAllData",
  async ({ username, langCode, pending }, { dispatch }) => {
    const menus = [];
    const categories = [];
    const items = [];
    await dispatch(setLanguageChangeLoading(pending))

    const endPoint = langCode ? `/venues/username/${username}?lang=${langCode}` : `/venues/username/${username}`;

    const { data, status } = await config.get(endPoint);
    if (status !== 200 || !data) new Error("Something went wrong");

    try {
      const venue = data?.venue;

      data.menu.forEach((menu) => {
        menus.push(menu);
        categories.push(menu.Categories);
        menu.Categories.forEach((category) => {
          items.push(category.Items);
        });
      });

      return {
        venue: venue,
        theme: venue?.Theme,
        language: venue?.Languages,
        menuBanners: venue.Venue_cover_images,
        indexBanners: venue.Banners,
        menus: menus,
        categories: [].concat(...categories),
        items: [].concat(...items),
        error: null,
      };
    } catch (error) {
      return {
        venue: null,
        error: error.message,
      };
    } finally {
      dispatch(setLanguageChangeLoading(false))
    }
  }
);

export const venueInfo = createAsyncThunk(
  "venue/venueInfo",
  async (username) => {
    try {
      const { data } = await config.get(`/venues/details/${username}`);
      return {
        venue: data?.venue,
        theme: data?.venue.Theme,
        error: null,
      };
    } catch (error) {
      return {
        venue: null,
        error: error.message,
      };
    }
  }
);


export const feedBack = async (id, feedback) => {
  try {
    const { data } = await config.post(`/feedback/${id}`, feedback);
    return { feedback: data }

  } catch (error) {
    return {
      feedback: null,
      error: error.message,
    };
  }
}
