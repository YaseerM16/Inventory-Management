"use client";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { userLogin, UserState } from "./store/slices/UserSlice";
import { AppStore, makeStore } from "./store/store";

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const storeRef = useRef<AppStore>(makeStore());

    useEffect(() => {
        const userJson = localStorage.getItem("user");

        if (userJson) {
            const user: UserState = JSON.parse(userJson);
            // console.log("UserJOSN : ", user);
            storeRef.current?.dispatch(userLogin(user));
        }

    }, []);

    return <Provider store={storeRef.current}>{children}</Provider>;
}