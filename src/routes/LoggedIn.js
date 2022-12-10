import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Contents from '../components/Contents';
import Create from '../pages/Create';
import Detail from '../pages/Detail';
import Home from '../pages/Home';

function LoggedIn() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Navigate replace to="/" />} />
      <Route path="/register" element={<Navigate replace to="/" />} />
      <Route path="/create" element={<Create />} />
      <Route path="/detail/:threadId" element={<Detail />} />
      <Route path="*" element={(<Contents><h2>Halaman Tidak Ditemukan</h2></Contents>)} />
    </Routes>
  );
}

export default LoggedIn;
