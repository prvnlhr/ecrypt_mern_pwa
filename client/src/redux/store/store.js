import { configureStore } from '@reduxjs/toolkit'
import loginsIdSlice from '../features/loginsId/loginsIdSlice'
import cardsSlice from '../features/cards/cardsSlice'
import docsSlice from "../features/docs/docsSlice"
import activitiesSlice from '../features/activity/activitiesSlice'
const store = configureStore({
    reducer: {
        loginIds: loginsIdSlice,
        cards: cardsSlice,
        docs: docsSlice,
        activities: activitiesSlice,
    },
})

export default store
