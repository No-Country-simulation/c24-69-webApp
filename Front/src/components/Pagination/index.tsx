import { PaginationProps } from "../../types/interfacePagination";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  setCurrentPage,
}) => {
  return (
    <div className="flex justify-center items-center m-auto gap-2 mt-4">
      <button onClick={prevPage} disabled={currentPage === 1} className="page-button">
        Prev
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={currentPage === index + 1 ? "page-button-active" : "page-button"}
        >
          {index + 1}
        </button>
      ))}
      <button onClick={nextPage} disabled={currentPage === totalPages} className="page-button">
        Next
      </button>
    </div>
  );
};

export default Pagination;