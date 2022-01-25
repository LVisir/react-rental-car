import {Link} from "react-router-dom";

const A = () => {
    return (
        <div>
            <h1>Prova1</h1>
            <Link to={'/B'}/>
        </div>
    );
};

export default A;