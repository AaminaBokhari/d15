import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useAppointments } from '../../hooks/useAppointments';
import AppointmentActions from '../Appointments/AppointmentActions';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import LoadingSpinner from '../common/LoadingSpinner';

function AppointmentQueue() {
  const { appointments, isLoading, error } = useAppointments();
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('dateTime', {
      header: 'Time',
      cell: info => (
        <span className="font-medium">
          {new Date(info.getValue()).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      ),
    }),
    columnHelper.accessor('patient.name', {
      header: 'Patient Name',
      cell: info => (
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center mr-3">
            <FaUserCircle className="h-6 w-6" />
          </div>
          <div>
            <span className="font-medium block">{info.getValue()}</span>
            <span className="text-sm text-gray-500">ID: {info.row.original.patient._id}</span>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('type', {
      header: 'Type',
      cell: info => (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          info.getValue() === 'Check-up' ? 'bg-blue-100 text-blue-800' :
          info.getValue() === 'Follow-up' ? 'bg-green-100 text-green-800' :
          'bg-purple-100 text-purple-800'
        }`}>
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          info.getValue() === 'Waiting' ? 'bg-yellow-100 text-yellow-800' :
          info.getValue() === 'In Progress' ? 'bg-green-100 text-green-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: (info) => (
        <AppointmentActions
          appointment={info.row.original}
          onUpdate={() => {
            // Table will automatically refresh via React Query
          }}
        />
      ),
    }),
  ];

  const [globalFilter, setGlobalFilter] = React.useState('');

  const table = useReactTable({
    data: appointments || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-600">Error loading appointments: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Today's Queue</h2>
          <p className="text-gray-600 mt-1">Manage your appointments and patient queue</p>
        </div>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={globalFilter ?? ''}
            onChange={e => setGlobalFilter(e.target.value)}
            placeholder="Search appointments..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}</span>
                      <span className="text-gray-400">
                        {{
                          asc: ' ↑',
                          desc: ' ↓',
                        }[header.column.getIsSorted()] ?? null}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr 
                key={row.id}
                className="hover:bg-gray-50 transition-colors"
              >
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppointmentQueue;