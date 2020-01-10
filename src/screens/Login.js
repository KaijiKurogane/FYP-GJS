import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from 'recompose';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import { withFirebase } from '../components/Firebase';

const SignInPage = () => (
  <div>
    <SignInForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    // const { email, password } = this.state;

    // this.props.firebase
    //   .doSignInWithEmailAndPassword(email, password)
    //   .then(() => {
    //     this.setState({ ...INITIAL_STATE });
    //     this.props.history.push("Dashboard");
    //   })
    //   .catch(error => {
    //     this.setState({ error });
    //   });

    event.preventDefault();
    this.props.history.push('/Dashboard')
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.onSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="email"
                          value={email}
                          onChange={this.onChange}
                          type="text"
                          placeholder="Email Address"
                          autoComplete="username"
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="password"
                          value={password}
                          onChange={this.onChange}
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          {error && <p>{error.message}</p>}
                          <Button  disabled={isInvalid} type="submit" color="primary" className="px-4">
                            Login
                          </Button>
                        </Col>
                      </Row>
                    </Form>
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

const SignInForm = compose(
  withRouter,
  withFirebase,
)(Login);

export default SignInPage;

export { SignInForm };