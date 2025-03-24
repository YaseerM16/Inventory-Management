import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

    const navItems = [
        { label: "Home", route: "/" },
        { label: "View Inventory", route: "/inventory/view" },
        { label: "Sales Records", route: "/inventory/sales-records" },
        { label: "Sales Reports", route: "/inventory/sales-reports" },
        { label: "Inventory Reports", route: "/inventory/reports" },
        { label: "Customers", route: "/inventory/customers" },
    ];

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    📦 InventoryApp
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {navItems.map(({ label, route }) => (
                            <li key={route} className="nav-item">
                                <Link
                                    className={`nav-link ${location.pathname === route ? "active" : ""}`}
                                    to={route}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
