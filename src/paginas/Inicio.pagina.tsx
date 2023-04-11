import Filtros from "../componentes/personajes/filtros.componente"
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente"
import Paginacion from "../componentes/paginacion/paginacion.componente";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateFavoritos } from "../slices/PersonajesSlice";
 
const PaginaInicio = () => {
    
    const [ page, setPage ] = useState<number>(1)
    const dispatch = useAppDispatch();
    const { personajes, favoritos } = useAppSelector((state) => state.personajes);

    const onFavoriteClick = (id: number) => {
        const idExist = favoritos.some((favorito) => favorito === id);
        if (idExist) {
            const updateId = favoritos.filter((favorito) => favorito !== id);
            dispatch(updateFavoritos(updateId));
        } else {
            dispatch(updateFavoritos([...favoritos, id]));
        }
    };

    return <div className="container">
        <div className="actions">
            <h3>Catálogo de Personajes</h3>
            <button className="danger">Test Button</button>
        </div>
        <Filtros />
        <Paginacion setPage={setPage} />
        <GrillaPersonajes page={page} personaje={personajes} onFavoriteClick={onFavoriteClick} favoritos={favoritos} />
        <Paginacion setPage={setPage} />
    </div>
}

export default PaginaInicio