import { PageButton, PaginationContainer } from './Pagination.styles';

const Pagination = ({ 
    currentPage, 
    setCurrentPage, 
    pageInfo = { startPage:"", endPage:"", totalPage:"" }
}) => {

    const getPageNumbers = () => {
        if (!pageInfo) return [];
        const numbers = [];
        for (let i = Number(pageInfo.startPage); i <= Number(pageInfo.endPage); i++) {
            numbers.push(i);
        }
        return numbers;
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNextPage = () => {
        if (currentPage < pageInfo.totalPage) {
            setCurrentPage(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleLastPage = () => {
        setCurrentPage(pageInfo.totalPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const pageNumbers = getPageNumbers();

    return (
        <PaginationContainer>
            <PageButton onClick={handleFirstPage} disabled={currentPage === 1}>
                <i className="bi bi-chevron-double-left"></i>
            </PageButton>

            <PageButton onClick={handlePrevPage} disabled={currentPage === 1}>
                <i className="bi bi-chevron-left"></i>
            </PageButton>

            {pageNumbers.map(page => (
                <PageButton
                    key={page}
                    onClick={() => handlePageClick(page)}
                    $active={currentPage === page}
                >
                    {page}
                </PageButton>
            ))}

            <PageButton
                onClick={handleNextPage}
                disabled={currentPage === pageInfo.totalPage}
            >
                <i className="bi bi-chevron-right"></i>
            </PageButton>

            <PageButton
                onClick={handleLastPage}
                disabled={currentPage === pageInfo.totalPage}
            >
                <i className="bi bi-chevron-double-right"></i>
            </PageButton>
        </PaginationContainer>
    );
};

export default Pagination;