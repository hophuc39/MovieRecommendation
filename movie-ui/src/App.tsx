import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetail from './pages/MovieDetail';
import PrivateRoute from './pages/PrivateRoute';
import SearchMovies from './pages/SearchMovie';
import Dashboard from './pages/Dashboard';
import { LoadingProvider } from './contexts/LoadingContext';

function App() {
  const [token, setToken] = useState<null | string>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, [])

  const handleStoreToken = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
  }

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  }

  const queryClient = new QueryClient();

  return (
    <LoadingProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/trending" element={<TrendingMovies />} /> */}
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/search" element={<SearchMovies />} />

            <Route
              path='/dashboard'
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </QueryClientProvider>
    </LoadingProvider>
  )
}

export default App
