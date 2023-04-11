import { useAppSelector } from '../../redux/hooks';
import './paginacion.css';

/**
 * Componente que contiene los botones para paginar
 * 
 * Deberás agregar las propiedades necesarias para que funcione correctamente
 * 
 * 
 * @returns un JSX element 
 */
interface Props {
    setPage: React.Dispatch<React.SetStateAction<number>>,
}

const Paginacion = ({setPage}: Props) => {

    const { prev, next } = useAppSelector(state => state.personajes.paginacion)
    

    return <div className="paginacion">
        <button 
            onClick={() => setPage(prevState => prevState - 1)} 
            disabled={prev === null } 
            className={"primary"}
        >
            Anterior
        </button>
        <button 
            onClick={() => setPage(prevState => prevState + 1)} 
            disabled={next === null } 
            className={"primary"}
        >
            Siguiente
        </button>
    </div>
}

export default Paginacion;