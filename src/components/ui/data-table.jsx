import React from "react";

export const DataTable = ({ columns, data })=> {
  return (
    <table className="min-w-full border-collapse text-black">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessorKey} className="px-4 py-2 border-b text-left">
              {column.header}
            </th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td key={column.accessorKey} className="px-4 py-2 border-b">
                {row[column.accessorKey]}
              </td>
            ))}
            <td>
              {/* Acciones como editar o eliminar */}
              {columns.find(col => col.id === 'actions')?.cell({ row })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
