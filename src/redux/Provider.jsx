"use client";

import { Toaster } from "react-hot-toast";
import store from "./store";
import { Provider } from "react-redux";

export function Providers({ children }) {

    return (
        <Provider store={store}>
            {children}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 2000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                        margin: '0 auto',
                    }
                }}
                reverseOrder={false}
            />
        </Provider>
    )
}
