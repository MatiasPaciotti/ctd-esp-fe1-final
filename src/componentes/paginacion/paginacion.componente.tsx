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
    onPreviousclick: () => void;
    onNextClick: () => void;
    disableNext: boolean;
    disablePrev: boolean;
}

const Paginacion = ({onPreviousclick,onNextClick,disableNext,disablePrev,}: Props) => { 

    return <div className="paginacion">
        <button 
            disabled={disablePrev}
            className={'primary'}
            onClick={onPreviousclick}
        >
            Anterior
        </button>
        <button 
            disabled={disableNext}
            className={'primary'}
            onClick={onNextClick}
        >
            Siguiente
        </button>
    </div>
}

export default Paginacion;