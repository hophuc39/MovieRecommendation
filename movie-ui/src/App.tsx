import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetail from './pages/MovieDetail';
import PrivateRoute from './pages/PrivateRoute';
import SearchMovies from './pages/SearchMovie';
import Dashboard from './pages/Dashboard';

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
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
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
    </QueryClientProvider>
  )
}

export default App
