import React from 'react';
import { Button } from "@/components/ui/button";

interface PaginationControlsProps {
  table: any; // Replace with the correct type from @tanstack/react-table if possible
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ table }) => {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        Showing results of 1 to 10 out of 82 peoples.
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaginationControls;
