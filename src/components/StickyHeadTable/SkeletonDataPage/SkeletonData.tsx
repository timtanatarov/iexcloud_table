import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Skeleton from "@mui/material/Skeleton";
import { columns } from "../../ColumnDefinitions";

interface SkeletonDataProps {
  rowsPerPage: number;
}

export const SkeletonData: React.FC<SkeletonDataProps> = ({ rowsPerPage }) => (
  <>
    {Array.from({ length: rowsPerPage }).map((_, index) => (
      <TableRow key={index}>
        {columns.map((column) => (
          <TableCell key={column.id} align={column.align}>
            <Skeleton variant="text" />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
);
