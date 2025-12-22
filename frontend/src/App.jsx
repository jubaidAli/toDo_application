import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import HomePage from './pages/HomePage.jsx';
import NodeDetailPage from './pages/NodeDetailPage.jsx';
import CreatePage from './pages/CreatePage.jsx';

const App = () => {
  return (
    <div data-theme="forest">
      {/* <button onClick={() => toast.success("Test Button Clicked")} className="btn btn-outline m-4">
        Test Button
      </button> */}
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/create" element={<CreatePage />}></Route>
        <Route path="/node/:id" element={<NodeDetailPage />}></Route>
      </Routes>
    </div>
  );
};

export default App;
