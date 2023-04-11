import { useEffect, useState } from "react";
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { limpiarFavoritos, updateFavoritos } from "../slices/PersonajesSlice";
import { Personaje } from "../types/personaje.types";

/**
 * Esta es la pagina de favoritos. Aquí se deberan ver todos los personajes marcados como favoritos
 * 
 * Uso: 
 * ``` <PaginaFavoritos /> ```
 * 
 * @returns la pagina de favoritos
 */
const PaginaFavoritos = () => {
    const favoritos = useAppSelector((state) => state.personajes.favoritos);
    const [listaFavoritos, setListaFavoritos] = useState<Personaje[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (favoritos.length > 0) {
            fetch(`https://rickandmortyapi.com/api/character/${favoritos}`)
                .then((res) => res.json())
                .then((result) => {
                    if (Array.isArray(result)) {
                        setListaFavoritos(result);
                    } else {
                        setListaFavoritos([result]);
                    }
                });
        }
    }, [favoritos]);

    const clearFavorites = (): void => {
        dispatch(limpiarFavoritos())
    };

    const onFavoriteClick = (id: number) => {
        const idExist = favoritos.some((favorito) => favorito === id);
        if (idExist) {
            const updateId = favoritos.filter((favorito) => favorito !== id);
            dispatch(updateFavoritos(updateId));
        } else {
            dispatch(updateFavoritos([...favoritos, id]));
        }
    };

    return (
        <div className='container'>
            <div className='actions'>
                <h3>Personajes Favoritos</h3>
                <button className={!!favoritos.length ? 'danger' : 'primary'} onClick={clearFavorites} disabled={favoritos.length <= 0}>
                    Reset
                </button>
            </div>
            {favoritos.length > 0 ? (
                <GrillaPersonajes page={1} favoritos={favoritos} personaje={listaFavoritos} onFavoriteClick={onFavoriteClick} />
            ) : (
                <h1>No se encontraron personajes favoritos</h1>
            )}
        </div>
    );
}

export default PaginaFavoritos