import PropTypes from 'prop-types'

/**
 * Bottone generico
 * @param text
 * @param color
 * @param onClickDo
 * @returns {JSX.Element}
 * @constructor
 */
const Button = ({text, color, onClickDo}) => {
    return (
        <div className={'btn btn-primary btn-sm'} style={{backgroundColor : color, color: 'white'}} onClick={onClickDo}>
            {text}
        </div>
    );
};

Button.defaultProps = {
    color : 'steelblue'
}

Button.propTypes = {
    text : PropTypes.string,
    color : PropTypes.string,
    onclick : PropTypes.func, //perchè proviene da una funzione
}

export default Button;