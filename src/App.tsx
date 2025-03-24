import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RTLProvider } from './components/common/RTLProvider';
import { Navbar } from './components/common/Navbar';
import { Home } from './pages/Home';
import { Reports } from './pages/Reports';
import { Proposals } from './pages/Proposals';
import { Events } from './pages/Events';
import { Polls } from './pages/Polls';
import { Map } from './pages/Map';
import {Login} from './pages/Login';
import {Register} from './pages/Register';
import './i18n';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <RTLProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/proposals" element={<Proposals />} />
              <Route path="/events" element={<Events />} />
              <Route path="/polls" element={<Polls />} />
              <Route path="/map" element={<Map />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </RTLProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;