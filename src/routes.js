import React from 'react';
const Dashboard = React.lazy(() => import('./views/Dashboard'));

const Users = React.lazy(() => import('./views/Users/Users'));
const spNation = React.lazy(() => import('./views/Pages/SPNation/SPNationPage'));
const spEducation = React.lazy(() => import('./views/Pages/SPEducation/SPEducationPage'));
const pdf = React.lazy(() => import('./views/Pages/Staff/ExportPdf'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Выход' },
  { path: '/dashboard', name: 'Главное окно', component: Dashboard },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/spNation', exact: true, name: 'Национальность', component: spNation },
  { path: '/spEducation', exact: true, name: 'Образование', component: spEducation },
  { path: '/pdf', exact: true, name: 'Образование', component: pdf },
];

export default routes;
