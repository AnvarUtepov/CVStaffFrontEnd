import React, { Component } from 'react';
import CSpinner from '../../helpers/CSpinner';
import StaffPage from '../Pages/Staff/StaffPage';

class Dashboard extends Component {
  loading = () => CSpinner

  render() {

    return (
      <div className="animated fadeIn">
        <StaffPage></StaffPage>
      </div>
    );
  }
}

export default Dashboard;
