import { configureStore } from '@reduxjs/toolkit'
import loginsIdSlice from '../features/loginsId/loginsIdSlice'

const store = configureStore({
    reducer: {
        loginIds: loginsIdSlice,
    },
})

export default store
