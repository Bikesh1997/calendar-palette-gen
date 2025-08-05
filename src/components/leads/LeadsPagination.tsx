
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface LeadsPaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  leadsPerPage: number;
  totalLeads: number;
  onPageChange: (page: number) => void;
}

const LeadsPagination = ({
  currentPage,
  totalPages,
  startIndex,
  leadsPerPage,
  totalLeads,
  onPageChange,
}: LeadsPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
  <div className="text-sm text-gray-700 text-center sm:text-left">
    Showing {startIndex + 1} to {Math.min(startIndex + leadsPerPage, totalLeads)} of {totalLeads} results
  </div>

  <Pagination>
    <PaginationContent className="flex flex-wrap justify-center sm:justify-end gap-1">
      <PaginationItem>
        <PaginationPrevious
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
        />
      </PaginationItem>

      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        if (
          pageNumber === 1 ||
          pageNumber === totalPages ||
          (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
        ) {
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                onClick={() => onPageChange(pageNumber)}
                isActive={currentPage === pageNumber}
                className="cursor-pointer"
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        } else if (
          pageNumber === currentPage - 2 ||
          pageNumber === currentPage + 2
        ) {
          return (
            <PaginationItem key={pageNumber}>
              <PaginationEllipsis />
            </PaginationItem>
          );
        }
        return null;
      })}

      <PaginationItem>
        <PaginationNext
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
        />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
</div>

  );
};

export default LeadsPagination;
