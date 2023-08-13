import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Skeleton from "@mui/material/Skeleton";
import { useGetStocksQuery } from "../../services/api";
import { formatTimestamp } from "../../utils/formatTimestamp";

interface Column {
  id: keyof Data;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

interface Data {
  symbol: string;
  sector: string;
  securityType: string;
  bidPrice: number;
  bidSize: number;
  askPrice: number;
  askSize: number;
  lastUpdated: number;
  lastSalePrice: number;
  lastSaleSize: number;
  lastSaleTime: number;
  volume: number;
}

const columns: readonly Column[] = [
  { id: "symbol", label: "Symbol", minWidth: 100 },
  { id: "lastSalePrice", label: "Last Sale Price", minWidth: 170 },
  { id: "lastUpdated", label: "Last Updated", minWidth: 170 },
  { id: "sector", label: "Sector", minWidth: 170 },
  { id: "securityType", label: "Security Type", minWidth: 170 },
];

export const StickyHeadTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { data, error, isLoading } = useGetStocksQuery();
  const [allData, setAllData] = React.useState<Data[]>([]);

  React.useEffect(() => {
    if (data) {
      setAllData(data);
    }
  }, [data]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (error) {
    return <div>Непредвиденная ошибка</div>;
  }

  const visibleData = allData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? Array.from({ length: rowsPerPage }).map((_, index) => (
                  <TableRow key={index}>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        <Skeleton variant="text" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : visibleData.map((row: Data) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.symbol}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "lastUpdated"
                            ? formatTimestamp(value as number)
                            : column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        rowsPerPage={rowsPerPage}
        page={page}
        count={allData.length}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
