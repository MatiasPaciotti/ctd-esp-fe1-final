import './grilla-personajes.css';
import TarjetaPersonaje from './tarjeta-personaje.componente';
import { useAppSelector } from '../../redux/hooks';
import { Personaje } from '../../types/personaje.types';


interface GrillaPersonajesProps {
    onFavoriteClick: (id:number) => void;
    favoritos: number[];
    personaje: Personaje[];
}

const GrillaPersonajes = ({ onFavoriteClick, favoritos, personaje}: GrillaPersonajesProps) => {   

    return <>
        <div className="grilla-personajes">
            {
            personaje.map( (personaje: Personaje) => 
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
        { !personaje.length && <h1>No se encontro ningun personaje</h1>}
    </>
    
}
 
export default GrillaPersonajes;