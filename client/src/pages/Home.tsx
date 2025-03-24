import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/TypedHooks";
import { userLogout } from "../store/slices/UserSlice";
import Header from "../components/Header";

const Home: React.FC = () => {
    const navigate = useNavigate()
    const dispatcher = useAppDispatch()

    const handleLogout = () => {
        dispatcher(userLogout()); // Dispatch logout action
        localStorage.removeItem("auth"); // Clear user data from localStorage
        navigate("/"); // Redirect to home/login page
    };
    return (
        <div className="bg-light min-vh-100">
            {/* Include Header */}
            <Header />

            {/* Home Content */}
            <div className="container py-5">
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-primary">Welcome to Inventory Management</h2>
                    <p className="text-muted">Easily track, manage, and analyze your inventory.</p>
                </div>

                {/* Cards Section */}
                <div className="row g-4 justify-content-center">
                    {[
                        { label: "View Inventory", route: "/inventory/view", icon: "bi-clipboard", color: "primary" },
                        { label: "Sales Records", route: "/inventory/sales-records", icon: "bi-bar-chart", color: "secondary" },
                        { label: "Sales Reports", route: "/inventory/sales-reports", icon: "bi-file-earmark-text", color: "success" },
                        { label: "Inventory Reports", route: "/inventory/reports", icon: "bi-box", color: "warning" },
                        { label: "Customers", route: "/inventory/customers", icon: "bi-people", color: "info" },
                    ].map(({ label, route, icon, color }) => (
                        <div key={route} className="col-md-6 col-lg-4">
                            <div
                                className={`card shadow-sm border-0 text-center bg-${color} text-white`}
                                style={{ cursor: "pointer", transition: "transform 0.3s ease-in-out" }}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                onClick={() => navigate(route)}
                            >
                                <div className="card-body py-4">
                                    <i className={icon}></i> {/* Bootstrap Icon Fixed */}
                                    <h5 className="fw-bold">{label}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Logout Button */}
                <div className="text-center mt-4">
                    <button
                        className="btn btn-danger fw-bold px-4 py-2"
                        style={{ transition: "all 0.3s ease-in-out" }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        onClick={handleLogout}
                    >
                        🚪 Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
