import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/TypedHooks";
import { userLogout } from "../store/slices/UserSlice";

const Home: React.FC = () => {
    const navigate = useNavigate()
    const dispatcher = useAppDispatch()

    const handleLogout = () => {
        dispatcher(userLogout()); // Dispatch logout action
        localStorage.removeItem("auth"); // Clear user data from localStorage
        navigate("/"); // Redirect to home/login page
    };
    return (
        <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-4 fw-bold text-primary">📦 Inventory Management</h1>
                <p className="lead text-muted">Track and manage your stock with ease.</p>

                {/* Main Options */}
                <div className="mt-4 w-100 d-flex flex-column align-items-center">
                    <button className="btn btn-primary w-50 my-2" onClick={() => navigate("/inventory/view")}>
                        📋 View Inventory
                    </button>
                    <button className="btn btn-success w-50 my-2" onClick={() => navigate("/inventory/add")}>
                        ➕ Add New Item
                    </button>
                    <button className="btn btn-secondary w-50 my-2" onClick={() => navigate("/inventory/sales-records")}>
                        📊 Sales Records
                    </button>
                    <button className="btn btn-secondary w-50 my-2" onClick={() => navigate("/inventory/sales-reports")}>
                        📊 Sales Reports
                    </button>
                    <button className="btn btn-warning w-50 my-2" onClick={() => navigate("/inventory/reports")}>
                        📊 Inventory Reports
                    </button>
                    <button className="btn btn-secondary w-50 my-2" onClick={() => navigate("/inventory/customers")}>
                        🧑‍💼 Customers
                    </button>

                </div>

                {/* Logout Button */}
                <button className="btn btn-danger mt-4" onClick={handleLogout}>
                    🚪 Logout
                </button>
            </div>
        </div>
    );
};

export default Home;
