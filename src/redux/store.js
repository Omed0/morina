import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import VenueDataReducer from './features/venueSlice';
import langaugeReducer from './features/lang';

const store = configureStore({
    reducer: {
        menu: VenueDataReducer,
        language: langaugeReducer,
    },
    devTools: false,
    middleware: [thunk],
});


export default store;