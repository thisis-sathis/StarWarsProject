import React from 'react';
import { Button } from "@/components/ui/button";

interface PaginationControlsProps {
  table: any;
  totalCount: number;
  pagination: any;
  pageChange: (page: string) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ table , totalCount, pagination, pageChange}) => {
  console.log("paginationpagination-", pagination)
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {`Showing results of 1 to 10 out of ${totalCount} peoples`}
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => pageChange(pagination.previousPage)}
          disabled={pagination?.previousPage ? false : true}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => pageChange(pagination.nextPage)}
          disabled={pagination?.nextPage ? false : true}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaginationControls;
