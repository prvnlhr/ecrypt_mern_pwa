import { configureStore } from '@reduxjs/toolkit'
import loginsIdSlice from '../features/loginsId/loginsIdSlice'
import cardsSlice from '../features/cards/cardsSlice'
import docsSlice from "../features/docs/docsSlice"

const store = configureStore({
    reducer: {
        loginIds: loginsIdSlice,
        cards: cardsSlice,
        docs: docsSlice,
    },
})

export default store
