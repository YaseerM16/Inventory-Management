import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import AddCustomer from "./AddCustomer";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import { ICustomer } from "../../utils/constants";
import { deleteCustomerApi, getCustomersApi } from "../../services/customerApi";
import EditCustomer from "./EditCustomer";
import Navbar from "../../components/Navbar";

const columns = ["Name", "Address", "Mobile Number"];

const ViewCustomers: React.FC = () => {
    const [customers, setCustomers] = useState<ICustomer[]>([]);
    const [showAddCustomer, setShowAddCustomer] = useState(false);
    const [showEditCustomer, setShowEditCustomer] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const customersPerPage = 6;

    const fetchCustomers = async (currentPage: number, searchQuery: string) => {
        try {
            setLoading(true);
            const response = await getCustomersApi(currentPage, customersPerPage, searchQuery);
            if (response?.status === 200) {
                const { data } = response;
                setCustomers(data.data.customers);
                setLoading(false);
                setTotalPages(
                    prev => (prev !== Math.ceil(data.data.totalCustomers / customersPerPage)
                        ? Math.ceil(data.data.totalCustomers / customersPerPage)
                        : prev)
                );
            }
        } catch (err) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error!",
                text: (err as Error)?.message || "Something went wrong. Please try again.",
                showConfirmButton: true,
                confirmButtonText: "OK",
                timer: 3000,
                toast: true,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers(currentPage, searchQuery);
    }, [showAddCustomer, currentPage, searchQuery]);

    const handleEditClick = (customer: ICustomer) => {
        setSelectedCustomer(customer);
        setShowEditCustomer(true);
    };

    function deleteItem(customer: ICustomer): void {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: 'Do you want to Delete this Customer?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, proceed!',
                cancelButtonText: 'No, cancel!',
                toast: true,
                position: 'top-end',
                timer: 3000,
                timerProgressBar: true,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response: any = await deleteCustomerApi(customer._id);
                    if (response?.status === 200) {
                        const { data } = response;
                        setCustomers(prevCustomers => prevCustomers.filter(customer => customer._id !== data.data._id));

                        Swal.fire({
                            icon: 'success',
                            title: "Success",
                            text: "Customer has been Deleted successfully ✅",
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                        });
                    }
                }
            });
        } catch (err) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error!",
                text: (err as Error)?.message || "Something went wrong. Please try again.",
                showConfirmButton: true,
                confirmButtonText: "OK",
                timer: 3000,
                toast: true,
            });
        }
    }

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Customers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="mb-0">Customer List</h2>
                    <button className="btn btn-success px-4 py-2 fw-bold shadow"
                        onClick={() => setShowAddCustomer(true)}
                    >
                        ➕ Add Customer
                    </button>
                </div>
                {loading ? <Spinner /> :
                    <Table
                        columns={columns}
                        data={customers}
                        renderRow={(item, index) => (
                            <>
                                <td key={`name-${index}`}>{item.name}</td>
                                <td key={`address-${index}`}>{item.address}</td>
                                <td key={`mobile-${index}`}>{item.phone}</td>
                            </>
                        )}
                        actions={(item, index) => (
                            <>
                                <button key={`edit-${index}`} onClick={() => handleEditClick(item)}>✏️</button>
                                <button key={`delete-${index}`} onClick={() => deleteItem(item)}>🗑️</button>
                            </>
                        )}
                    />
                }
                {showAddCustomer && (
                    <div className="position-fixed top-50 start-50 translate-middle bg-white p-4 shadow-lg rounded" style={{ zIndex: 1050 }}>
                        <AddCustomer onClose={() => setShowAddCustomer(false)} />
                    </div>
                )}
                {showEditCustomer && selectedCustomer && (
                    <div className="position-fixed top-50 start-50 translate-middle bg-white p-4 shadow-lg rounded" style={{ zIndex: 1050 }}>
                        <EditCustomer
                            customer={selectedCustomer}
                            onClose={() => setShowEditCustomer(false)}
                            onUpdateCustomer={(updatedCustomer) => {
                                setCustomers(prevCustomers =>
                                    prevCustomers.map(customer =>
                                        customer._id === updatedCustomer._id ? updatedCustomer : customer
                                    )
                                );
                                setShowEditCustomer(false);
                            }}
                        />
                    </div>
                )}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </>
    );
};

export default ViewCustomers;
