import {Link} from "react-router-dom";

const ErrorLogin = () => {
    return (
        <div>
            <h1 style={{ color: "red", fontSize: 100 }}>Login Error</h1>
            <h3>You must log in first</h3>
            <p>
                <Link to='/'>Go to Login page</Link>
            </p>
        </div>
    );
};

export default ErrorLogin;