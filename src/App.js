import React, { useState } from 'react';
import Header from './Header/Header';
import Pexel from './Main/pexel.js';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <div>
      {/* Header component */}
      <Header searchTerm={searchTerm} handleSearch={handleSearch} />

      {/* Pexel component */}
      <Pexel searchTerm={searchTerm} />
    </div>
  );
};

export default App;
