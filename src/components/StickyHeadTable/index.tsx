import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useGetStocksQuery } from "../../services/api";
import { Data, columns } from "../ColumnDefinitions";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { SkeletonData } from "./SkeletonDataPage/SkeletonData";
import { UploadedData } from "./UploadedDataPage/UploadedData";
import { ErrorPage } from "./ErrorPage/ErrorPage";

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
    return <ErrorPage />;
  }

  const visibleData = allData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper elevation={3} sx={{ width: "100%", overflow: "hidden" }}>
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
                    <SkeletonData rowsPerPage={rowsPerPage} />
                  ) : (
                    <UploadedData visibleData={visibleData} />
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
