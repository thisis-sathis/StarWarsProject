import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const CardListLoader: React.FC = () => {
  return (
    <div className="space-y-4">
        {[...Array(4)].map((_, index) => (
            <div key={index} className="p-4 mt-10 bg-white rounded-lg shadow-sm">
            <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="mt-4 space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
            </div>
            </div>
        ))}
    </div>
  );
};

export default CardListLoader;
