import {useState} from "react";

/**
 * Componente che si occupa di fornire il tasto di ricerca in base a determinati filtri
 * @param filter
 * @returns {JSX.Element}
 * @constructor
 */
const Search = ({filter}) => {
    return (
        <div>
            <form className={'add-form'}>
                <select>
                    {filter.map(
                        (campo) =>
                            <option key={campo}>{campo}</option>
                    )}
                </select>
                <input
                    className={'form-control'}
                    type={'text'}
                    placeholder={'Cerca...'}
                />
                <input
                    type={'submit'}
                    value={'Cerca'}
                />
            </form>
        </div>
    );
};

export default Search;