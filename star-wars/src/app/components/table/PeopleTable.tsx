// components/ui/SimpleDataTable.tsx

import React from "react";

type Person = {
  name: string;
  height: string;
  mass: string;
  gender: string;
  hair_color: string;
};

type Props = {
  data: Person[];
};

const PeopleTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Height
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mass
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Gender
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hair Color
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((person, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{person.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{person.height}</td>
              <td className="px-6 py-4 whitespace-nowrap">{person.mass}</td>
              <td className="px-6 py-4 whitespace-nowrap">{person.gender}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {person.hair_color}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PeopleTable;
