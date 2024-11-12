import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navigationbar/Navbar.js';
import Main from './components/Main_Operations/Main.js';

function App() {
  // State for grouping and sorting preferences
  const [groupOption, setGroupOption] = useState('status');
  const [sortOption, setSortOption] = useState('priority');

  return (
    <div className="app-container">
      {/* Navbar component with handlers for grouping and sorting changes */}
      <Navbar
        onGroupingChange={setGroupOption}
        onOrderingChange={setSortOption}
        grouping={groupOption}
        ordering={sortOption}
      />
      {/* Main content area, configured with current grouping and sorting preferences */}
      <Main grouping={groupOption} ordering={sortOption} />
    </div>
  );
}

export default App;
