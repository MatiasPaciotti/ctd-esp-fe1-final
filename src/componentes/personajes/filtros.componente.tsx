import './filtros.css';

interface Props {
    inputRef: React.RefObject<HTMLInputElement>;
    searchCharacter: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

const Filtros = ({ inputRef, searchCharacter, value } : Props) => {

    return <div className="filtros">
        <label htmlFor="nombre">Filtrar por nombre:</label>
        <input 
            onChange={searchCharacter} 
            type="text" 
            placeholder="Rick, Morty, Beth, Alien, ...etc" 
            name="nombre"
            value={value}
            ref={inputRef}
            autoComplete='off' 
        />
    </div>
}

export default Filtros;