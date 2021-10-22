import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import tokenReducer from '../utils/slices'

export default configureStore({
    reducer: {
        counter: counterReducer,
        token: tokenReducer
    }
})