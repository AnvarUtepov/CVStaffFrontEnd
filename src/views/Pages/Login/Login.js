import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import PropTypes from "prop-types";

import {
  required,
  intervLengthStr,
  isIntervLengthStr
} from "../../../helpers/validations";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { SignInActions } from "../../../store/actions/SignInAction";

import CSpinner from "../../../helpers/CSpinner";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      formValid: false,
      login: {
        userName: "",
        password: "",
      }
    };
  }
  componentDidMount() {
    this.props.signOutAction();
  }

  handleChange = event => {
    this.setState(
      {
        login: {
          ...this.state.login,
          [event.target.name]: event.target.value
        }
      },
      () => this.formValid()
    );
  };
  formValid = () => {
    if (
      required(this.state.login.userName) ||
      required(this.state.login.password) ||
      !intervLengthStr(this.state.login.password, 6, 20) ||
      !intervLengthStr(this.state.login.userName, 6, 20)
    ) {
      this.setState({
        formValid: false
      });
    } else {
      this.setState({
        formValid: true
      });
    }
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props
      .signInAction(this.state.login, this.props.history)
      .then(() => {
        this.props.getUserData(this.props.history);
        this.setState({
          loading: false
        });
      });
  };

  errorMessage = () => {
    const { errorMessage } = this.props;
    if (errorMessage) {
      return <div className="alert alert-danger info-red">{errorMessage}</div>;
    }
  };
  render() {
    const { loading, login, formValid } = this.state;
    return (
      <div className="app flex-row align-items-center">
        {loading && <CSpinner />}
        <Container>
          <Row className="justify-content-center">
            <Col md="4">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form
                      className="was-validated"
                      onSubmit={this.handleSubmit}>
                      <h1>Вход</h1>
                      <p className="text-muted"></p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>

                        <Input
                          className={isIntervLengthStr(login.userName, 6, 20)}
                          type="text"
                          name="userName"
                          placeholder="Username"
                          required
                          value={login.userName}
                          onChange={this.handleChange}
                        />

                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>

                        <Input
                          className={isIntervLengthStr(login.password, 6, 20)}
                          type="password"
                          name="password"
                          placeholder="пароль"
                          required
                          value={login.password}
                          onChange={this.handleChange}
                        />

                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            color="primary"
                            disabled={!formValid}
                            type="submit"
                            className="px-4"
                          >
                            Вход
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                    {this.errorMessage()}
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
Login.propTypes = {
  errorMessage: PropTypes.string,
  signInAction: PropTypes.func.isRequired,
  signOutAction: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return { errorMessage: state.account.error };
}

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(SignInActions, dispatch)
)(Login);
