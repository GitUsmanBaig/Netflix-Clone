import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import GlobalFilter from "./GlobalFilter";
import './sortingtable.scss'
import { ZoomIn } from "@mui/icons-material";

const SortingTable = ({ columns, data }) => {

    const tableInstance = useTable({
        columns,
        data,
    },
        //filering
        useGlobalFilter,
        //sorting
        useSortBy,
        //pagination
        usePagination
    )

    //purpose of header groupn is to group the header under one header e.g first name and last name under name

    //use all  of these properties in the table
    const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow, state, setGlobalFilter, page, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, gotoPage, pageCount, setPageSize } = tableInstance;

    const { globalFilter } = state;

    const { pageIndex } = state;

    const { pageSize } = state;

    // console.log(MOCK_DATA);

    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            {/* Code to set Page Sizes */}
            <div className="PageSizes">
                <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                    {
                        [10, 25, 50].map(pageSize => <option key={pageSize} value={pageSize}><ZoomIn />Size: {pageSize}</option>)
                    }
                </select>
            </div>
            {/* Page Size code end here */}
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                //this is header section
                                //sorting of the table
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : ''}
                                    </span>

                                </th>
                                //sorting code ends here
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        //destructure the row
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    //body section of the table
                                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
                {/* Adding footer to the table */}
                {/* <tfoot>
                    {footerGroups.map((footerGroup) => (
                        //footer section of the table
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {footerGroup.headers.map((column) => (
                                <td {...column.getFooterProps()}>
                                    {column.render('Footer')}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tfoot> */}
            </table>
            <div className="PageButtons">
                <button className="prev" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                <span>
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                </span>
                {/* Code for Page Number e.g Page 1 of 10 */}
                <span>
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                {/* Code for Page Number ends Here */}
                <span>
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
                </span>
                <button className="next" onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
            </div>
        </>
    );
};

export default SortingTable;
