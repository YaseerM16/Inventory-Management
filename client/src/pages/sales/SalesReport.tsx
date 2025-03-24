import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import { getSalesApi, sendSalesReportApi } from "../../services/userApi";
import { ISale } from "../../utils/constants";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Import autoTable plugin
import { useAppSelector } from "../../store/TypedHooks";
import Navbar from "../../components/Navbar";

const columns = ["Sale ID", "Product Name", "Customer Name", "Quantity", "Price", "Date"];

const SalesReport: React.FC = () => {
    const [sales, setSales] = useState<ISale[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const user = useAppSelector(state => state.userState)

    const salesPerPage = 6;

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
        fetchSales(currentPage, "");
    }, [currentPage]);

    // Export as Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(
            sales.map(({ saleId, productName, customerName, quantity, price, date }) => ({
                "Sale ID": saleId,
                "Product Name": productName,
                "Customer Name": customerName || "Cash",
                "Quantity": quantity,
                "Price": price,
                "Date": new Date(date).toLocaleDateString(),
            }))
        );

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sales Report");
        XLSX.writeFile(wb, "Sales_Report.xlsx");
    };

    // Export as PDF
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Sales Report", 14, 10);

        autoTable(doc, {  // Ensure autoTable is used correctly
            head: [columns],
            body: sales.map(({ saleId, productName, customerName, quantity, price, date }) => [
                saleId,
                productName,
                customerName || "Cash",
                quantity,
                price,
                new Date(date).toLocaleDateString(),
            ]),
        });

        doc.save("Sales_Report.pdf");
    };


    // Print Sales Report
    const printReport = () => {
        window.print();
    };

    // Send Email (Assuming API Support)
    const sendEmail = async () => {
        try {
            console.log("EMail for sendthe SAlesReport :", user.email);

            const response = await sendSalesReportApi(sales, user.email)
            if (response?.status === 200) {
                Swal.fire("Success", "Sales report emailed successfully!", "success");
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
                <div className="d-flex justify-end align-items-center mb-3">
                    <button className="btn btn-primary" onClick={printReport}>Print</button>
                    <button className="btn btn-success" onClick={exportToExcel}>Excel</button>
                    <button className="btn btn-danger" onClick={exportToPDF}>PDF</button>
                    <button className="btn btn-warning" onClick={sendEmail}>Email</button>
                </div>

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
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
        </>
    );
};

export default SalesReport;
