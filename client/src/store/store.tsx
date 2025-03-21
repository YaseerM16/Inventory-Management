import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./slices/UserSlice"


export const makeStore = () => {
    return configureStore({
        reducer: {
            userState: userSlice,
        }
    })
}

// export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = AppStore["dispatch"];
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;

// export default store
