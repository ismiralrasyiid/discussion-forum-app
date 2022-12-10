import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Contents from '../components/Contents';
import Detail from '../pages/Detail';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

function NotLoggedIn() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create" element={<Navigate replace to="/" />} />
      <Route path="/detail/:threadId" element={<Detail />} />
      <Route path="*" element={(<Contents><h2>Halaman Tidak Ditemukan</h2></Contents>)} />
    </Routes>
  );
}

export default NotLoggedIn;
