import React from "react";
import PropTypes from "prop-types";

const Login = ({ authenticate }) => (
    <nav className="">
        <h2>Inventory Login!</h2>
        <p>Sign in to manage you store's inventory.</p>
        <button className="github" onClick={() => authenticate("Google")}>Login with Google</button>
        {/* <button className="twitter" onClick={() => authenticate("Twitter")}>Login with Github</button> */}
    </nav>
)

Login.propTypes = {
    authenticate: PropTypes.func.isRequired
}

export default Login;