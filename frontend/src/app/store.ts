import { configureStore } from '@reduxjs/toolkit'
import IpSlice from './reducer/IpSlice';

export function makeStore() {
    return configureStore({
        reducer: {
            IpSlice
        },
        devTools: true
    })
}
  
const store = makeStore()

export default store

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
