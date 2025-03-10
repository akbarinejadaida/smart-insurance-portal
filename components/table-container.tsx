"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export interface TableContainerProps {
  rows: Record<string, any>[];
  columns: string[];
}

const ColumnVisibilityToggle: React.FC<{
  columns: string[];
  visibleColumns: string[];
  onToggle: (col: string) => void;
}> = ({ columns, visibleColumns, onToggle }) => (
  <div className="flex flex-wrap gap-2">
    {columns.map((col) => (
      <label key={col} className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={visibleColumns.includes(col)}
          onChange={() => onToggle(col)}
        />
        {col}
      </label>
    ))}
  </div>
);

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center items-center gap-4">
    <button
      className="px-3 py-2 bg-secondary text-secondary-foreground rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Previous
    </button>

    <span>
      Page {currentPage} of {totalPages}
    </span>

    <button
      className="px-3 py-2 bg-secondary text-secondary-foreground rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
);

export default function TableContainer({ rows, columns }: TableContainerProps) {
  const [sortConfig, setSortConfig] = useState<{
    column: string | null;
    order: "asc" | "desc";
  }>({
    column: null,
    order: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [filterText, setFilterText] = useState("");
  const rowsPerPage = 10;
  const [visibleColumns, setVisibleColumns] = useState(columns);

  const handleSort = useCallback((column: string) => {
    setSortConfig((prev) => ({
      column,
      order: prev.column === column && prev.order === "asc" ? "desc" : "asc",
    }));
  }, []);

  const toggleColumn = useCallback((col: string) => {
    setVisibleColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  const filteredRows = useMemo(() => {
    if (!filterText) return rows;
    return rows.filter((row) =>
      visibleColumns.some((col) =>
        row[col]?.toString().toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }, [rows, filterText, visibleColumns]);

  const sortedRows = useMemo(() => {
    if (!sortConfig.column) return filteredRows;
    return [...filteredRows].sort((a, b) => {
      const valA = a[sortConfig.column!];
      const valB = b[sortConfig.column!];
      return valA < valB
        ? sortConfig.order === "asc"
          ? -1
          : 1
        : valA > valB
        ? sortConfig.order === "asc"
          ? 1
          : -1
        : 0;
    });
  }, [sortConfig, filteredRows]);

  const totalPages = Math.ceil(sortedRows.length / rowsPerPage);

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedRows.slice(start, start + rowsPerPage);
  }, [sortedRows, currentPage]);

  return (
    <div className="w-full flex flex-col gap-8">
      <input
        type="text"
        placeholder="Filter rows..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="px-3 py-2 border rounded-sm w-full"
      />

      <ColumnVisibilityToggle
        columns={columns}
        visibleColumns={visibleColumns}
        onToggle={toggleColumn}
      />

      <Table className="rounded-sm w-full">
        <TableHeader className="bg-primary text-primary-foreground">
          <TableRow>
            {visibleColumns.map((col) => (
              <TableHead
                key={col}
                className="w-[100px] cursor-pointer"
                onClick={() => handleSort(col)}
              >
                <div className="w-full flex items-center gap-2">
                  {col}
                  {sortConfig.column === col &&
                    (sortConfig.order === "asc" ? (
                      <FaChevronUp size={12} />
                    ) : (
                      <FaChevronDown size={12} />
                    ))}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedRows.map((row, index) => (
            <TableRow key={row.id + index}>
              {visibleColumns.map((col) => (
                <TableCell key={col} className="w-[100px]">
                  {row[col]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
