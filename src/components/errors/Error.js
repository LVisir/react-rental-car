import {Link} from "react-router-dom";

const Error = ({ homePath }) => {
    return (
        <div>
            <h1 style={{ color: "red", fontSize: 100 }}>404</h1>
            <h3>Page Not Found</h3>
            <p>
                <Link to={homePath}>Go Home</Link>
            </p>
        </div>
    );
};

export default Error;