import React, { useState } from 'react';
import useWebSocket from '../hooks/useWebSocket';

const Admin = () => {
  const { sendMessage } = useWebSocket('ws://localhost:8080');
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    sendMessage({ type: 'pageChange', page });
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    handlePageChange(nextPage);
  };

  const handlePreviousPage = () => {
    const previousPage = currentPage > 1 ? currentPage - 1 : 1; // Prevent going below page 1
    handlePageChange(previousPage);
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <h2>Current Page: {currentPage}</h2>
      <button onClick={handlePreviousPage}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
};

export default Admin;