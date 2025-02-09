import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.js";
import { authApi } from "../features/api/authApi.js";
import { courseApi } from "@/features/api/courseApi.js";
export const appStore = configureStore({
    reducer: rootReducer,
    middleware: (defaultMiddleware) => defaultMiddleware().concat(authApi.middleware, courseApi.middleware)
})

//on refresh user data redux toolkit se chala ja raha tha to do kaam kar sakte hai -> persist user khud se try karna

const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({}, { forceRefetch: true }))
}
initializeApp();