import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { actionBuscar, getPersonaje, getPersonajes, limpiarBusqueda, updateFavoritos } from "../slices/PersonajesSlice";
import Filtros from "../componentes/personajes/filtros.componente"
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente"
import Paginacion from "../componentes/paginacion/paginacion.componente";
import Loader from "../componentes/loader/loader";
 
const PaginaInicio = () => {
    
    const { personajes, favoritos, buscador, loading, error } = useAppSelector((state) => state.personajes);
    const totalPages = useAppSelector((state) => state.personajes.paginacion.pages);
    const [ page, setPage ] = useState<number>(1)
    const [ search, setSearch ] = useState<string>(buscador)
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect( () => {
        const handlerSearch = setTimeout(() => {
            dispatch(actionBuscar(search));
            dispatch(getPersonaje(search))
        }, 600);
        return () => {
            clearTimeout(handlerSearch)
        }
    }, [search])

    useEffect(() => {
        dispatch(getPersonajes(page));
        inputRef?.current?.focus();
    }, [page]);

    const onFavoriteClick = (id: number) => {
        const idExist = favoritos.some((favorito) => favorito === id);
        if (idExist) {
            const updateId = favoritos.filter((favorito) => favorito !== id);
            dispatch(updateFavoritos(updateId));
        } else {
            dispatch(updateFavoritos([...favoritos, id]));
        }
    };

    const resetSearch = () => {
        setSearch('');
        dispatch(limpiarBusqueda());
        inputRef?.current?.focus();
        dispatch(getPersonajes(1));
    };

    const nextPage = () => {
        setPage(prevPage => prevPage + 1);
    }

    const prevPage = () => {
        setPage(prevPage => prevPage - 1);
    }

    return <div className="container">
        <div className="actions">
            <h3>Catálogo de Personajes</h3>
            <button className={!!search ? 'danger' : 'primary'} onClick={resetSearch} disabled={!search}>
                Limpiar filtros
            </button>
        </div>
        <Filtros 
            inputRef={inputRef}
            searchCharacter={(e) => setSearch(e.target.value)}
            value={search}
        />
        { error && <h1>No se encontro ningun personaje</h1> }
        { loading && <Loader /> }
        { !error && !loading && (
            <>
                <Paginacion 
                    onPreviousclick={prevPage}
                    onNextClick={nextPage}
                    disableNext={page === totalPages}
                    disablePrev={page === 1}
                />
                <GrillaPersonajes personaje={personajes} onFavoriteClick={onFavoriteClick} favoritos={favoritos} />
                <Paginacion 
                    onPreviousclick={prevPage}
                    onNextClick={nextPage}
                    disableNext={page === totalPages}
                    disablePrev={page === 1}
                />
            </>
       )}
    </div>
}

export default PaginaInicio