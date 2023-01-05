import { configureStore } from '@reduxjs/toolkit'
import loginsIdSlice from '../features/loginsId/loginsIdSlice'
import cardsSlice from '../features/cards/cardsSlice'

const store = configureStore({
    reducer: {
        loginIds: loginsIdSlice,
        cards: cardsSlice
    },
})

export default store
