import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import AddProduct from "./AddProduct";
import { deleteProductApi, getProductsApi } from "../../services/userApi";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner";
import { IProduct } from "../../utils/constants";
import EditProduct from "./EditProduct";
import Pagination from "../../components/Pagination";


const columns = ["Name", "Description", "Quantity", "Price"];

const ViewInventory: React.FC = () => {

    const [products, setProducts] = useState<IProduct[]>([])
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showEditProduct, setShowEditProduct] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const productsPerPage = 6;



    const fetchProducts = async (currentPage: number, searchQuery: string) => {
        try {
            setLoading(true)
            const response = await getProductsApi(currentPage, productsPerPage, searchQuery)
            if (response?.status === 200) {
                const { data } = response
                setProducts(data.data.products)
                setLoading(false)
                setTotalPages(prev => (prev !== Math.ceil(data.data.totalProducts / productsPerPage) ? Math.ceil(data.data.totalProducts / productsPerPage) : prev));

                console.log("THE prods Data :,", data);
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
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts(currentPage, searchQuery)
    }, [showAddProduct, currentPage, searchQuery])

    const handleEditClick = (product: IProduct) => {
        setSelectedProduct(product);
        setShowEditProduct(true);
    };

    function deleteItem(item: IProduct): void {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: 'Do you want to Delete this Product?',
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
                    console.log("Proceeded to del :", item);

                    const response = await deleteProductApi(item._id)
                    if (response?.status === 200) {
                        const { data } = response;
                        const deletedProductId = data.data._id;
                        setProducts(prevProducts => prevProducts.filter(product => product._id !== deletedProductId));

                        Swal.fire({
                            icon: 'success',
                            title: "Success",
                            text: "Product has been Deleted successfully ✅",
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 2000, // 2 seconds
                            timerProgressBar: true,
                        });
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'info',
                        title: 'Action canceled.',
                        showConfirmButton: false,
                        timer: 1500,
                    });
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
        <div className="container mt-4">
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search Products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0">Inventory List</h2>
                <button className="btn btn-success px-4 py-2 fw-bold shadow"
                    onClick={() => setShowAddProduct(true)}
                >
                    ➕ Add Product
                </button>
            </div>
            {loading ?
                <Spinner />
                :
                <Table
                    columns={columns}
                    data={products}
                    renderRow={(item, index) => (
                        <>
                            <td key={`name-${index}`}>{item.name}</td>
                            <td key={`desc-${index}`}>{item.description}</td>
                            <td key={`qty-${index}`}>{item.quantity}</td>
                            <td key={`price-${index}`}>${item.price}</td>
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
            {/* Show AddProduct Form */}
            {showAddProduct && (
                <div className="position-fixed top-50 start-50 translate-middle bg-white p-4 shadow-lg rounded" style={{ zIndex: 1050 }}>
                    <AddProduct onClose={() => setShowAddProduct(false)} />
                </div>
            )}

            {showEditProduct && selectedProduct && (
                <div className="position-fixed top-50 start-50 translate-middle bg-white p-4 shadow-lg rounded" style={{ zIndex: 1050 }}>
                    <EditProduct
                        product={selectedProduct}
                        onClose={() => setShowEditProduct(false)}
                        onUpdateProduct={(updatedProduct) => {
                            console.log("THE Updated Pred in CalVac :", updatedProduct);
                            setProducts(prevProducts =>
                                prevProducts.map(product =>
                                    product._id === updatedProduct._id ? updatedProduct : product
                                )
                            );
                            setShowEditProduct(false);
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
    );
};

export default ViewInventory;
