import React from "react";
import { Pagination as BSPagination } from "react-bootstrap";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    return (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <BSPagination>
                <BSPagination.Prev
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                />

                <BSPagination.Item active>
                    Page {currentPage} of {totalPages}
                </BSPagination.Item>

                <BSPagination.Next
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
            </BSPagination>
        </div>
    );
};

export default Pagination;
