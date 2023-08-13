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
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

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

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newData = Array.from(allData);
    const [movedRow] = newData.splice(result.source.index, 1);
    newData.splice(result.destination.index, 0, movedRow);

    setAllData(newData);
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
        <DragDropContext onDragEnd={handleDragEnd}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
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
            <Droppable droppableId="rows" direction="vertical">
              {(provided) => (
                <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                  {isLoading ? (
                    Array.from({ length: rowsPerPage }).map((_, index) => (
                      <TableRow key={index}>
                        {columns.map((column) => (
                          <TableCell key={column.id} align={column.align}>
                            <Skeleton variant="text" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <>
                      {visibleData.map((row: Data, index) => (
                        <Draggable
                          key={row.symbol}
                          draggableId={row.symbol}
                          index={index}
                          shouldRespectForcePress
                        >
                          {(provided) => (
                            <TableRow
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              sx={{
                                ...provided.draggableProps.style,
                                width: "100%",
                              }}
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.symbol}
                              ref={provided.innerRef}
                            >
                              {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.id === "lastUpdated"
                                      ? formatTimestamp(value as number)
                                      : column.format &&
                                        typeof value === "number"
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          )}
                        </Draggable>
                      ))}
                    </>
                  )}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </Table>
        </DragDropContext>
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
