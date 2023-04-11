import { useEffect, useState } from 'react';
import { getPersonajes } from '../../slices/PersonajesSlice';
import './grilla-personajes.css';
import TarjetaPersonaje from './tarjeta-personaje.componente';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Loader from '../loader/loader';
import { Personaje } from '../../types/personaje.types';

/**
 * Grilla de personajes para la pagina de inicio
 * 
 * Deberás agregar las funciones necesarias para mostrar y paginar los personajes
 * 
 * 
 * @returns un JSX element 
 */

interface GrillaPersonajesProps {
    page: number;
    onFavoriteClick: (id:number) => void;
    favoritos: number[];
    personaje: Personaje[];
}

const GrillaPersonajes = ({page, onFavoriteClick, favoritos}: GrillaPersonajesProps) => {
    const dispatch = useAppDispatch()
    const { personajes, loading } = useAppSelector(state => state.personajes)

    useEffect(() => {
      dispatch(getPersonajes(page))
    }, [page])
    

    return <>
        <div className="grilla-personajes">
            {
            personajes.map( (personaje: Personaje) => 
                    <TarjetaPersonaje 
                    key={personaje.id} 
                    personaje={personaje} 
                    onFavoriteclick={() => onFavoriteClick(personaje.id)}
                    esFavorito={favoritos.some(
                        (favorito) => favorito === personaje.id
                    )}
                    />
                )
            }
        </div>
        { loading && <Loader /> }
    </>
    
}
 
export default GrillaPersonajes;