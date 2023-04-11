import { useAppDispatch } from '../../redux/hooks';
import { getPersonaje } from '../../slices/PersonajesSlice';
import './filtros.css';

const Filtros = () => {

    const dispatch = useAppDispatch()

    return <div className="filtros">
        <label htmlFor="nombre">Filtrar por nombre:</label>
        <input onChange={(e) => dispatch(getPersonaje(e.target.value))} type="text" placeholder="Rick, Morty, Beth, Alien, ...etc" name="nombre" />
    </div>
}

export default Filtros;