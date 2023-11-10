import {
  createSolidTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/solid-table";
import { formatNumberWithCommas } from "../../utils/Calc";
const columns = [
  {
    header: "Month",
    accessorKey: "month",
  },
  {
    header: "Monthly Payment",
    accessorKey: "monthlyPayment",
  },
  {
    header: "Principal Payment",
    accessorKey: "principalPayment",
  },
  {
    header: "Interest Payment",
    accessorKey: "interestPayment",
  },
  {
    header: "Remaining Balance",
    accessorKey: "remainingBalance",
  },
];

export default function ArtzTable({ data }) {
  const table = createSolidTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div class="overflow-x-auto md:overflow-visible">
      <table class="min-w-full  md:border  bg-[#2b2b2b] md:border-white mx-1 my-8 md:p-4 ">
        <thead class="md:px-1 py-6 md:p-4 md:border  rounded-3xl border-white">
          {table &&
            typeof table.getHeaderGroups === "function" &&
            table.getHeaderGroups().map((headerGroup) => (
              <tr class="" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th class="p-4 border-1 border-white ">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
        </thead>
        <tbody>
          {table &&
            typeof table.getRowModel === "function" &&
            table.getRowModel().rows.map((row) => (
              <tr
                class="md:px-2  min-w-0 justify-around justify-items-center md:bg-[#2b2b2b] md:border hover:bg-[#202020] "
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <td class="md:p-4 text-center">
                    {formatNumberWithCommas(
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
