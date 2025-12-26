
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import BuilderLayout from './components/builder/BuilderLayout';
import LiveApp from './pages/LiveApp';
import { BuilderProvider } from './context/BuilderContext';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="settings" element={<div>Settings Page (Coming Soon)</div>} />
        </Route>
        <Route path="/builder/:id" element={
          <BuilderProvider>
            <BuilderLayout />
          </BuilderProvider>
        } />
        <Route path="/app/:id" element={
          <BuilderProvider>
            <LiveApp />
          </BuilderProvider>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
