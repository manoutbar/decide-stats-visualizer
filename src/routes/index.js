import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ListPage from 'pages/VotingListPage';
import DetailPage from 'pages/VotingDetailPage';

const routes = [
  {
    exact: true,
    path: '/',
    component: ListPage,
  },
  {
    path: '/voting/:votingId',
    component: DetailPage,
  }
]

const AppRoutes = () => (
  <Routes>
    {
      routes.map((route, i) => (
        <Route
          key={ i }
          exact={ route.exact }
          path={ route.path }
          element= { <route.component /> }
        ></Route>
      ))
    }
  </Routes>
)
export default AppRoutes;