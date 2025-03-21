import { JSX } from "react";

interface TableProps<T> {
    columns: string[];
    data: T[];
    renderRow: (item: T, index: number) => JSX.Element;
    actions?: (item: T, index: number) => JSX.Element; // Optional actions renderer

}

const Table = <T,>({ columns, data, renderRow, actions }: TableProps<T>) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col}</th>
                        ))}
                        {actions && <th>Actions</th>} {/* Only show Actions column if provided */}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {renderRow(item, index)}
                            {actions && <td className="text-center">{actions(item, index)}</td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default Table;
