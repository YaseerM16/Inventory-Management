import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import { ICustomer, IProduct, ISale, ISalesInput } from "../../utils/constants";
import { getProductsApi } from "../../services/productApi";
import { getCustomersApi } from "../../services/customerApi";
import Select from "react-select";
import { addSalesRecordApi, getSalesApi } from "../../services/userApi";

// import { deleteSaleApi, getSalesApi } from "../../services/salesApi";
getProductsApi
getCustomersApi
const columns = ["Sale ID", "Product Name", "Customer Name", "Quantity", "Price", "Date"];

const ViewSalesRecord: React.FC = () => {
    const [sales, setSales] = useState<ISale[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [showAddSale, setShowAddSale] = useState<boolean>(false)
    const [products, setProducts] = useState<IProduct[]>([])
    const [customers, setCustomers] = useState<ICustomer[]>([]);

    const [saleData, setSaleData] = useState<ISalesInput>({
        customerId: "",
        productId: "",
        date: "",
        quantity: 1
    });
    const salesPerPage = 6;

    const fetchProducts = async () => {
        try {
            const response = await getProductsApi(1, undefined, "")
            if (response?.status === 200) {
                const { data } = response
                setProducts(data.data.products)
            }
        } catch (err) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error!",
                text: (err as Error)?.message || "Something went wrong while fetching Products. Please try again.",
                showConfirmButton: true,
                confirmButtonText: "OK",
                timer: 3000,
                toast: true,
            });
        }
    }

    const fetchCustomers = async () => {
        try {
            const response = await getCustomersApi(1, undefined, "");
            if (response?.status === 200) {
                const { data } = response;
                setCustomers(data.data.customers);
            }
        } catch (err) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error!",
                text: (err as Error)?.message || "Something went wrong. while fetching Customers Please try again.",
                showConfirmButton: true,
                confirmButtonText: "OK",
                timer: 3000,
                toast: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchSales = async (currentPage: number, searchQuery: string) => {
        try {
            setLoading(true);
            const response = await getSalesApi(currentPage, salesPerPage, searchQuery);
            if (response?.status === 200) {
                const { data } = response;
                setSales(data.data.sales);
                setTotalPages(Math.ceil(data.data.totalSales / salesPerPage));
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
        fetchSales(currentPage, searchQuery);
    }, [currentPage, searchQuery]);

    useEffect(() => {
        fetchCustomers()
        fetchProducts()
    }, [showAddSale])

    function deleteItem(sale: ISale): void {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: 'Do you want to delete this sale record?',
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
                    // const response: any = await deleteSaleApi(sale.saleId);
                    // if (response?.status === 200) {
                    //     setSales(prevSales => prevSales.filter(s => s.saleId !== sale.saleId));
                    //     Swal.fire({
                    //         icon: 'success',
                    //         title: "Success",
                    //         text: "Sale record deleted successfully ✅",
                    //         toast: true,
                    //         position: 'top-end',
                    //         showConfirmButton: false,
                    //         timer: 2000,
                    //         timerProgressBar: true,
                    //     });
                    // }
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

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setSaleData({ ...saleData, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setSaleData({ customerId: "", productId: "", date: "", quantity: 1 });
        setShowAddSale(false);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await addSalesRecordApi(saleData);
            if (response?.status === 200) {
                fetchSales(currentPage, searchQuery)
                const { data } = response;
                resetForm();
                setCustomers(data.data.customers);
                setLoading(false);
                Swal.fire({
                    icon: 'success',
                    title: "Success",
                    text: "Sales Record has been Added successfully ✅",
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
            }
        } catch (err) {
            Swal.fire({
                position: "top-end",
                icon: "warning",
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
    const handleSelectChange = (selectedOption: { value: string, label: string, property: string } | null, actionMeta: { name?: string }) => {
        console.log("The SelectedOption :", selectedOption);
        // console.log("The ActionMeta :", actionMeta);
        // console.log("The SelectedOption value :", selectedOption?.value);
        // console.log("The SelectedOption label :", selectedOption?.label);

        handleChange({
            target: { name: selectedOption?.property, value: selectedOption?.value || "" }
        } as unknown as React.ChangeEvent<HTMLSelectElement>);
    };

    // console.log("Sales Data Recorded :", saleData);
    function openAddSales() {
        if (customers && products) {
            setShowAddSale(true)
        } else {
            return
        }
    }

    return (
        <div className="container mt-4">
            <div className="mb-3">
                {/* <input
                    type="text"
                    className="form-control"
                    placeholder="Search Sales..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                /> */}
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0">Sales Records</h2>
                <button className="btn btn-success px-4 py-2 fw-bold shadow" onClick={() => setShowAddSale(true)}>
                    ➕ Add Sale Record
                </button>
            </div>
            {/* Add Sale Form */}
            {showAddSale && (
                <div
                    className="position-absolute top-50 start-50 translate-middle bg-white p-4 shadow-lg rounded"
                    style={{ zIndex: 1050, minWidth: "400px" }}
                >
                    <h4 className="mb-3">Add Sale Record</h4>

                    {/* Customer Dropdown */}
                    <div className="mb-2">
                        <label className="form-label">Customer Name</label>
                        <Select
                            options={customers.map(customer => ({ value: customer._id, label: customer.name, property: "customerId" }))}
                            onChange={handleSelectChange}
                            placeholder="Search or select customer..."
                            isSearchable={true} // Enables search input visibility

                        />

                    </div>

                    {/* Product Dropdown */}
                    <div className="mb-2">
                        <label className="form-label">Product Name</label>
                        <Select
                            options={products.map(product => ({ value: product._id, label: product.name, property: "productId" }))}
                            onChange={handleSelectChange}
                            placeholder="Search or select product..."
                            isSearchable={true} // Enables search input visibility

                        />
                    </div>

                    {/* Date Input */}
                    <div className="mb-2">
                        <label className="form-label">Date</label>
                        <input type="date" className="form-control" name="date" onChange={handleChange} />
                    </div>

                    {/* Quantity Input */}
                    <div className="mb-2">
                        <label className="form-label">Quantity</label>
                        <input type="number" className="form-control" name="quantity" onChange={handleChange} min="1" />
                    </div>

                    {/* Buttons */}
                    <div className="d-flex justify-content-end gap-2 mt-3">
                        <button className="btn btn-secondary" onClick={resetForm}>Cancel</button>
                        {loading ?
                            <Spinner /> :
                            <button className="btn btn-primary" onClick={handleSubmit}>Save Sale</button>
                        }
                    </div>
                </div>
            )}
            {loading ? <Spinner /> :
                <Table
                    columns={columns}
                    data={sales}
                    renderRow={(item, index) => (
                        <>
                            <td key={`saleId-${index}`}>{item.saleId}</td>
                            <td key={`productName-${index}`}>{item.productName}</td>
                            <td key={`customerName-${index}`}>{item.customerName || "Cash"}</td>
                            <td key={`quantity-${index}`}>{item.quantity}</td>
                            <td key={`price-${index}`}>{item.price}</td>
                            <td key={`date-${index}`}>{new Date(item.date).toLocaleDateString()}</td>
                        </>
                    )}
                />
            }
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default ViewSalesRecord;
