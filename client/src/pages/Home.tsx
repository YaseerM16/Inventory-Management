import React from "react";

const Home: React.FC = () => {
    return (
        <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-4 fw-bold">Welcome to Home Page</h1>
                <p className="lead text-muted">You are successfully logged in.</p>

                {/* Logout Button */}
                <button className="btn btn-danger mt-3">Logout</button>
            </div>
        </div>
    );
};

export default Home;
