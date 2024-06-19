import React from "react";

interface Attribute {
  key: string;
  value: string | string[] | Record<string, any>;
}

interface Props {
  inputAttributes: Attribute[];
}

const AttributesViewer: React.FC<Props> = ({ inputAttributes }) => {
  const renderValue = (value: string | string[] | Record<string, any>) => {
    if (Array.isArray(value)) {
      return (
        <ul className="list-disc pl-5">
          {value.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    } else if (typeof value === "object" && value !== null) {
      return (
        <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
          {Object.entries(value).map(([key, val], index) => (
            <div className="flex mb-2" key={index}>
              <div className="font-semibold">{key}:</div>
              <div className="ml-2">{val}</div>
            </div>
          ))}
        </div>
      );
    } else {
      return <div>{value}</div>;
    }
  };

  return (
    <div className="h-[85vh] attributes-viewer overflow-y-auto bg-secondary p-8 rounded-md">
      {inputAttributes.length > 0 ? (
        inputAttributes.map((attr, index) => (
          <div className="attr mb-4" key={index}>
            <div className="attr-key text-gray-600">{attr.key}</div>
            <div className="attr-value mt-1">{renderValue(attr.value) || "NA"}</div>
          </div>
        ))
      ) : (
        <div className="empty-state text-gray-500">No Attributes</div>
      )}
    </div>
  );
};

export default AttributesViewer;
