import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { getProductsApi, sendItemsReportApi } from "../../services/productApi";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner";
import { IProduct } from "../../utils/constants";
import Pagination from "../../components/Pagination";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { useAppSelector } from "../../store/TypedHooks";
import Navbar from "../../components/Navbar";


const columns = ["Name", "Description", "Quantity", "Price"];

const ItemsReport: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const user = useAppSelector(state => state.userState)
    const productsPerPage = 6;

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const fetchProducts = async (currentPage: number) => {
        try {
            setLoading(true);
            const response = await getProductsApi(currentPage, productsPerPage, "");
            if (response?.status === 200) {
                setProducts(response.data.data.products);
                setTotalPages(Math.ceil(response.data.data.totalProducts / productsPerPage));
            }
        } catch (err) {
            Swal.fire({ icon: "error", title: "Error!", text: "Failed to fetch products." });
        } finally {
            setLoading(false);
        }
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Items Report", 20, 10);
        autoTable(doc, {
            head: [columns],
            body: products.map(({ name, description, quantity, price }) => [name, description, quantity, price])
        });
        doc.save("items_report.pdf");
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(products);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Items Report");
        XLSX.writeFile(wb, "items_report.xlsx");
    };

    const sendItemsReportEmail = async () => {
        try {
            const response = await sendItemsReportApi(products, user.email)
            if (response?.status === 200) {
                Swal.fire({ icon: "success", title: "Success!", text: "Email sent successfully." });
            } else {
                throw new Error("Failed to send email");
            }
        } catch (err) {
            Swal.fire("Error", (err as Error).message, "error");
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Inventory List</h2>
                    <div>
                        <button className="btn btn-primary me-2" onClick={exportToPDF}>Export PDF</button>
                        <button className="btn btn-success me-2" onClick={exportToExcel}>Export Excel</button>
                        <button className="btn btn-warning me-2" onClick={sendItemsReportEmail}>Send Email</button>
                        <button className="btn btn-secondary" onClick={() => window.print()}>Print</button>
                    </div>
                </div>
                {loading ? (
                    <Spinner />
                ) : (
                    <Table columns={columns} data={products} renderRow={(item, _) => (
                        <>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price}</td>
                        </>
                    )} />
                )}
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
        </>
    );
};

export default ItemsReport;
