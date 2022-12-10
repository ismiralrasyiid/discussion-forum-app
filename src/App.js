import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';
import Header from './components/Header';
import Loading from './components/Loading';
import LoadingBarBar from './components/LoadingBarBar';
import LoggedIn from './routes/LoggedIn';
import NotLoggedIn from './routes/NotLoggedIn';
import { preloadingApp } from './states/isPreload/action';

function App() {
  const { authUser, isPreload } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    const action = preloadingApp();
    dispatch(action);
  }, [dispatch]);

  if (isPreload) return <Loading />;

  return (
    <>
      <LoadingBarBar />
      <Header />
      {authUser ? <LoggedIn /> : <NotLoggedIn />}
      <ToastContainer />
      <Footer />
    </>
  );
}

export default App;
