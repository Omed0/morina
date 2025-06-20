import { createSlice } from '@reduxjs/toolkit'
import { fetchAllData, venueInfo } from '@/lib/axiosConfig'


const initialState = {
    landingPage: null,
    menuBanners: [],
    currentVenue: null,
    activeOnlyCategoriesFixed: false,
    firstMenuLoad: [],
    allMenus: [],
    AllItems: [],
    indexBanners: [],
    theme: [],
    listLanguage: [],
    loading: false,
    error: null,

    selectedItem: null,
}

export const VenueData = createSlice({
    name: "menu",
    initialState,
    reducers: {
        changeMenu: (state, action) => {
            state.firstMenuLoad = action.payload
        },
        setSelectedItem: (state, action) => {
            state.selectedItem = action.payload
        },
        setLanguageChangeLoading: (state, action) => {
            state.loading = action.payload
        },
        setSearchModal: (state) => {
            state.searchItem = !state.searchItem
        }
    },
    extraReducers(builder) {
        //i dont use loading in here because i dont need to show loading spinner when langauge change i set it by manually
        builder
            .addCase(fetchAllData.fulfilled, (state, action) => {
                state.loading = false;
                state.currentVenue = action.payload?.venue;
                state.menuBanners = action.payload?.menuBanners;
                state.allMenus = action.payload?.menus;
                state.firstMenuLoad = action.payload?.menus[0];
                state.AllItems = action.payload?.items;
                state.indexBanners = action.payload?.indexBanners;
                state.theme = action.payload?.theme;
                state.activeOnlyCategoriesFixed = action.payload?.theme?.MV_HideCategoryOnScroll;
                state.listLanguage = action.payload?.language;
                state.error = null;
            })
            .addCase(fetchAllData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error;
            })
        builder
            .addCase(venueInfo.fulfilled, (state, action) => {
                state.landingPage = action.payload?.venue;
                state.theme = action.payload?.theme;
                state.error = null;
            })
            .addCase(venueInfo.rejected, (state, action) => {
                state.landingPage = null;
                state.error = action.payload?.error;
            })
    }
})

export const { changeMenu, setSelectedItem, setLanguageChangeLoading, setSearchModal } = VenueData.actions


export default VenueData.reducer