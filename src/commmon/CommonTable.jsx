import React, { useState, useMemo, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { HiOutlineSearch, HiPlus, HiDownload, HiOutlineSwitchVertical } from "react-icons/hi";

// Debounce hook
function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value]);
  return debounced;
}

const CommonTable = ({ columns, data, onRowClick }) => {
  const [sorting, setSorting] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  const debouncedSearch = useDebounce(search, 400);

  // FILTER
  const filteredData = useMemo(() => {
    if (!debouncedSearch.trim()) return data;
    return data.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, data]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Helper for truncating description
  const truncateText = (text, length = 200) => {
    if (!text) return "";
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border bg-white shadow">
      {/* Header controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 py-4 border-b bg-white gap-4">
        {/* Left side: title, search, add */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
          <h2 className="text-base font-semibold">Products List</h2>

          {/* Search bar */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full w-full md:w-64">
            <HiOutlineSearch className="text-gray-400" size={18} />
            <input
              type="text"
              className="bg-transparent outline-none text-sm w-full"
              placeholder="Search here"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* + Add button */}
          <button className="p-2 rounded-full bg-[#E6F5E2] text-green-600 hover:bg-green-100">
            <HiPlus size={18} />
          </button>
        </div>

        {/* Right side: download and sort */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <HiDownload size={18} />
          </button>

          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <HiOutlineSwitchVertical size={18} />
          </button>
        </div>
      </div>

      {/* Actual table */}
      <div className="overflow-x-auto max-h-[450px]">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead className="bg-white sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b">
                <th className="w-12"></th>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-sm font-semibold text-gray-600 cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === "asc" && <span className="text-green-600 text-xs">▲</span>}
                      {header.column.getIsSorted() === "desc" && <span className="text-green-600 text-xs">▼</span>}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => {
                  setSelectedRow(row.id);
                  onRowClick(row.original);
                }}
                className={`cursor-pointer transition ${
                  selectedRow === row.id ? "bg-[#E6F5E2]" : "hover:bg-gray-50"
                }`}
              >
                {/* Select circle */}
                <td className="px-4 py-4 w-12">
                  <div
                    className={`w-4 h-4 rounded-full border ${
                      selectedRow === row.id ? "bg-green-600 border-green-600" : "border-gray-400"
                    }`}
                  />
                </td>

                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`px-4 py-4 text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis`}
                  >
                    {cell.column.id === "description"
                      ? truncateText(cell.getValue(), 120)
                      : flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommonTable;
