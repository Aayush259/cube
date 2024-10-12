"use client";
import { Provider } from "react-redux";
import store from "./store";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                {children}
            </Provider>
        </QueryClientProvider>
    );
};

export default StoreProvider;
