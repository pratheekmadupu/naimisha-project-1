import React from 'react';
import Navbar from './components/layout/Navbar';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Report from './pages/Report';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/report" element={<Report />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Dashboard />} />
          <Route path="/profile" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
