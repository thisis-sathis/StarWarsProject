
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const TableLoader: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {[...Array(6)].map((_, index) => (
              <th className="w-1/6 px-1 py-2">
              <Skeleton className="w-3/4 h-8" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {[...Array(6)].map((_, index) => (
            <tr key={index}>
              {[...Array(6)].map((_, index) => (
                <td className="py-4">
                  <Skeleton className="w-2/3 h-6" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
