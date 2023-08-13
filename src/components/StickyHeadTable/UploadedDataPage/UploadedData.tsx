import React from "react";
import { Draggable } from "react-beautiful-dnd";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { columns } from "../../ColumnDefinitions";
import { formatTimestamp } from "../../../utils/formatTimestamp";
import { Data } from "../../ColumnDefinitions";

interface UploadedDataProps {
  visibleData: Data[];
}

export const UploadedData: React.FC<UploadedDataProps> = ({ visibleData }) => (
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
        )}
      </Draggable>
    ))}
  </>
);
