import PropTypes from 'prop-types'

/**
 * Bottone generico
 * @param text
 * @param color
 * @param onClickDo
 * @returns {JSX.Element}
 * @constructor
 */
const Button = ({text, color, onClickDo, disable}) => {
    return (
        <button className={'btn btn-primary btn-sm'} style={{backgroundColor : color, color: 'white',}} onClick={onClickDo} disabled={disable}>
            {text}
        </button>
    );
};

Button.defaultProps = {
    color : 'steelblue',
    disabled : false,
}

Button.propTypes = {
    text : PropTypes.string,
    color : PropTypes.string,
    onclick : PropTypes.func, //perchè proviene da una funzione
    disabled: PropTypes.bool,
}

export default Button;