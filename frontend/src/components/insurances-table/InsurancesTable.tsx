import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Loader from "../shared/Loader";
import DeleteCell from "./DeleteCell";
import { CURRENCY_SYMBOL } from "../../utils/constants";

import {
  Insurance,
  useGetInsurancesQuery,
  useDeleteInsuranceMutation,
} from "../../api/insuranceApi";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<Insurance>();

const columns = [
  columnHelper.accessor("customerName", {
    header: () => "Customer Name",
  }),
  columnHelper.accessor("birthdate", {
    header: () => "Birthdate",
    cell: (props) => {
      return <span>{props.getValue()?.split("T")[0]}</span>;
    },
  }),
  columnHelper.accessor("city", {
    header: () => "City",
  }),
  columnHelper.accessor("vehiclePower", {
    header: () => "Vehicle Power",
    cell: (props) => {
      return <span>{`${props.getValue()} kW`}</span>;
    },
  }),
  columnHelper.accessor("voucher", {
    header: () => "Voucher",
    cell: (props) => {
      return <span>{`${props.getValue()} ${CURRENCY_SYMBOL}`}</span>;
    },
  }),
  columnHelper.accessor("totalPrice", {
    header: () => "Total Price",
    cell: (props) => {
      return <span>{`${props.getValue()} ${CURRENCY_SYMBOL}`}</span>;
    },
  }),
  columnHelper.display({
    id: "delete",
    cell: DeleteCell,
    size: 20,
  }),
];

const InsurancesTable: React.FC = () => {
  const navigate = useNavigate();

  const { data: insurances = [], isLoading } = useGetInsurancesQuery();

  const [deleteInsurance, { isLoading: isDeleting }] =
    useDeleteInsuranceMutation();

  const table = useReactTable({
    data: insurances,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      deleteRow: (id: string) => {
        deleteInsurance(id);
      },
    },
    defaultColumn: {
      size: 100,
      minSize: 60,
    },
  });

  const handleClick = () => {
    navigate("/");
  };

  const handleRowClick = (id?: string) => {
    if (id) navigate(`/insurances/${id}`);
  };

  if (isDeleting || isLoading) return <Loader />;

  return (
    <div className="flex font-sans p-2 mt-2 lg:mt-16 lg:max-w-screen-2xl m-auto">
      <button
        onClick={handleClick}
        title="Home"
        className="hidden lg:inline-block sticky top-0 h-12 px-4 py-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
      >
        <span>
          <FaHome className="inline-block" />
        </span>
      </button>
      <div className="border rounded-lg overflow-x-auto">
        <table className="w-full table-fixed border-collapse">
          <thead className="bg-gray-200 sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="text-left">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2"
                    style={{
                      width: header.column.getSize(),
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white">
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                onClick={() => handleRowClick(row.original.id)}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                } cursor-pointer hover:bg-gray-200 whitespace-normal break-words`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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

export default InsurancesTable;
