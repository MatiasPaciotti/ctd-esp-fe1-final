import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';

/**
 * Tarjeta para cada personaje dentro de la grilla de personajes. 
 * 
 * Deberás agregar las propiedades necesarias para mostrar los datos de los personajes
 * 
 * 
 * @returns un JSX element 
 */

interface Props {
    personaje:  {
        id: number,
        name: string,
        status: string,
        species: string,
        type?: string,
        gender: string,
        origin: {
        name: string,
        url: string,
        },
        location: {
        name: string,
        url: string,
        },
        image: string,
        episode: string[],
        url: string,
        created: string,
    },
    onFavoriteclick: () => void;
    esFavorito: boolean;
}

const TarjetaPersonaje = ({personaje, onFavoriteclick, esFavorito}: Props) => {

    return <div className="tarjeta-personaje">
        <img src={personaje.image} alt={personaje.name} />
        <div className="tarjeta-personaje-body">
            <span>{personaje.name}</span>
            <BotonFavorito esFavorito={esFavorito} onClick={onFavoriteclick} />
        </div>
    </div>
}

export default TarjetaPersonaje;