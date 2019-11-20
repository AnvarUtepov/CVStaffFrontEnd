import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";

import { UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppSidebarToggler } from '@coreui/react';

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { SignInActions } from "../../store/actions/SignInAction";


const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  componentDidMount() {
    this.props.getUserData(this.props.history);
  }
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              {this.props.authCheck ? this.props.userData.fio : "Вход"}
              {" "}
              <i className="fa fa-caret-down"></i>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Настройки</strong></DropdownItem>
              <DropdownItem divider />
              <DropdownItem><i className="fa fa-lock"></i>
                <Link
                  className="nav-link-display"
                  to="/login"
                  onClick={this.onClickMenu}
                >
                  Выход
              </Link>

              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>

        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    userData: state.account.userData,
    authCheck: state.account.authenticated,
    isAdmin: state.account.isAdmin
  };
}
export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(SignInActions, dispatch)
)(withRouter(DefaultHeader));

