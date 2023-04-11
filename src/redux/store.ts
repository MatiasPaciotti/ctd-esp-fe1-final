import { configureStore } from '@reduxjs/toolkit'
import personajesReducer from '../slices/PersonajesSlice'

const store = configureStore({
  reducer: {
    personajes: personajesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store