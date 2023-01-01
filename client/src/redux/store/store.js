import { configureStore } from '@reduxjs/toolkit'
import loginsIdSlice from '../features/loginsId/loginsIdSlice'

const store = configureStore({
    reducer: {
        loginsId: loginsIdSlice,
    },
})

export default store