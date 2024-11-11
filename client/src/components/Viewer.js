import React, { useEffect, useState } from 'react';
import useWebSocket from '../hooks/useWebSocket';

const Viewer = () => {
  const { messages } = useWebSocket('ws://localhost:8080');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const pageChangeMessages = messages.filter((msg) => msg.type === 'pageChange');
    if (pageChangeMessages.length > 0) {
      const lastPageChange = pageChangeMessages[pageChangeMessages.length - 1];
      setCurrentPage(lastPageChange.page);
    }
  }, [messages]);

  return (
    <div>
      <h1>Viewer Page</h1>
      <h2>Current Page: {currentPage}</h2>
      <h2>Page Content for Page {currentPage}</h2>
    </div>
  );
};

export default Viewer;
