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
import Dashboard from './pages/Dashboard';
import { LoadingProvider } from './contexts/LoadingContext';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import FullCastCrew from './pages/FullCastCrew';
import Favorites from './pages/Favorites';
import Watchlist from './pages/Watchlist';
import PeopleDetail from './pages/PeopleDetail';
import MovieList from './pages/MovieList';
import PeopleList from './pages/PeopleList';
import Search from './pages/Search';
import EmailVerified from './pages/EmailVerified';

function App() {
  const [token, setToken] = useState<null | string>(null);
  console.log(token);
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, [])


  const queryClient = new QueryClient();

  return (
    <LoadingProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/search" element={<Search />} />

            <Route
              path='/dashboard'
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/email-verified" element={<EmailVerified />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/movie/:id/cast" element={<FullCastCrew />} />
            <Route
              path="/favorites"
              element={
                <PrivateRoute>
                  <Favorites />
                </PrivateRoute>
              }
            />
            <Route
              path="/watchlist"
              element={
                <PrivateRoute>
                  <Watchlist />
                </PrivateRoute>
              }
            />
            <Route path="/person/:id" element={<PeopleDetail />} />
            <Route path="/people" element={<PeopleList />} />
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
