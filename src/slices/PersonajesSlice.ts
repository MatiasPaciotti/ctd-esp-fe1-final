import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Paginacion } from "../types/paginacion.types"
import { Personaje } from "../types/personaje.types"

interface initialType {
    personajes: Personaje[]
    paginacion: Paginacion
    personajesFiltrados: Personaje[]
    favoritos: number[]
    buscador: string
    loading: boolean
    error: boolean
}


const initialState: initialType = {
    personajes: [],
    paginacion: {
        count: undefined,
        pages: undefined,
        next: '',
        prev: '',
    },
    personajesFiltrados: [],
    favoritos: [],
    buscador: '',
    loading: false,
    error: false
}

export const getPersonajes = createAsyncThunk(
    'personajes',
    async (page: number) => {
        const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
        const parseRes = await res.json()
        return parseRes
    }
)

export const getPersonaje = createAsyncThunk(
    'personaje',
    async (personaje: string) => {
        const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${personaje}`)
        const parseRes = await res.json()
        return parseRes
    }
)

const personajesSlice = createSlice({
    name: 'personajes',
    initialState,
    reducers: {
        actionBuscar: (state, action) => {
            state.buscador = action.payload
        },
        updateFavoritos: (state, action) => {
            state.favoritos = action.payload
        },
        limpiarBusqueda: (state) => {
            state.buscador= ""
        },
        limpiarFavoritos: (state) => {
            state.favoritos= []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPersonajes.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(getPersonajes.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.personajes = action.payload.results
                state.paginacion = action.payload.info
            })
            .addCase(getPersonajes.rejected, (state, action) => {
                state.loading = false
                state.error = true
            })
            .addCase(getPersonaje.pending, (state) => {
                state.loading = true
                state.error = false
                state.personajes = []
            })
            .addCase(getPersonaje.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.personajes= action.payload.results
                state.paginacion = action.payload.info
            })
            .addCase(getPersonaje.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.personajes = []
            })
    }
})

export const { actionBuscar , updateFavoritos, limpiarBusqueda, limpiarFavoritos} = personajesSlice.actions

export default personajesSlice.reducer