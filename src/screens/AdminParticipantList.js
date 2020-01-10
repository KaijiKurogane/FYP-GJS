import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from "reactstrap";
import {
  Button,
  Form,
  Table
} from 'react-bootstrap'
import firebase from '../firebase'

class Tables extends Component {
  constructor(props) {
    super(props);

    this.state = {
      participants: []
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
    this.writeUserData();
    }
  }

  writeUserData = () => {
    firebase
    .ref("/")
    .set(this.state);
    console.log("DATA SAVED");
  }

  getUserData = () => {
    let ref = firebase.ref("/");
    ref.on("value", snapshot => {
    const state = snapshot.val();
    this.setState(state);
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    let name = this.refs.name.value;
    let uid = this.refs.uid.value;
    let address = this.refs.address.value;
    let contact = this.refs.contact.value;
    let emergency = this.refs.emergency.value;
    let gender = this.refs.gender.value;  
    let email = this.refs.email.value;

    if (uid && name && address && contact && emergency && gender && email) {
      const { participants } = this.state;
      const devIndex = participants.findIndex(data => {
        return data.uid === uid;
      });
      console.log(participants[devIndex].uid)
      participants[devIndex].name = name;
      participants[devIndex].address = address;
      participants[devIndex].contact = contact;
      participants[devIndex].emergency = emergency;
      participants[devIndex].gender = gender;
      participants[devIndex].email = email;
      this.setState({ participants });
    } 
    else if (name && address && contact && emergency && gender && email) {
      const uid = new Date().getTime().toString();
      const { participants } = this.state;
      let ref = firebase.ref('participants');
        ref.orderByChild('name').equalTo(name).once('value', snapshot => {
          if(snapshot.exists()){
            const userData = snapshot.val()
            alert( name + ' already exist');
            console.log('exist!',userData)
          }
        else{
          participants.push({ uid, name, address, contact, emergency, gender, email });
          this.setState({ participants });
          console.log('data added')
        }
        }
      )
    }

    this.refs.name.value = "";
    this.refs.address.value = '';
    this.refs.contact.value = '';
    this.refs.emergency.value = '';
    this.refs.gender.value = '';
    this.refs.email.value = '';
    this.refs.uid.value = "";
  }

  removeData = participant => {
    const { participants } = this.state;
    const newState = participants.filter(data => {
    return data.uid !== participant.uid;
    });
    this.setState({ participants: newState });
  }

  updateData = participant => {
    this.refs.uid.value = participant.uid;
    this.refs.name.value = participant.name;
    this.refs.address.value = participant.address;
    this.refs.contact.value = participant.contact;
    this.refs.emergency.value = participant.emergency;
    this.refs.gender.value = participant.gender;
    this.refs.email.value = participant.email;
  }
  handleChange = (e) => {
    this.setState({selectValue: e.target.value});
  }
  render() {
    const { participants } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"/>
                Participant Details
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group as={Row}>
                    <Col sm="10">
                      <Form.Control type="hidden" ref="uid" />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm="2">
                      Full Name
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        type="text"
                        ref="name"
                        className="Form-control"
                        placeholder="Your Name"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group 
                    as={Row} 
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label column sm="2">
                      Address
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        as="textarea" 
                        rows="4" 
                        type="text"
                        ref="address"
                        className="Form-control"
                        placeholder="Your Address"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlainnumber">
                    <Form.Label column sm="2">
                      Contact
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        type="text"
                        ref="contact"
                        className="Form-control"
                        placeholder="01X - XXX XXXX"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlainnumber">
                    <Form.Label column sm="2">
                      Emergency Contact
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        type="text"
                        ref="emergency"
                        className="Form-control"
                        placeholder="01X - XXX XXXX"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlaintext">
                    <Form.Label column sm="2">
                      Gender
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control as="select" value={this.props.selectValue} ref='gender' onChange={this.props.handleChange}>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                      </Form.Control>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlainEmail">
                    <Form.Label column sm="2">
                      Email
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        type="text"
                        ref="email"
                        className="Form-control"
                        placeholder="email@example.com"
                      />
                    </Col>
                  </Form.Group>
                  <Button variant='primary' type="submit" className="btn btn-primary">
                    Save
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Participant List
              </CardHeader>
              <CardBody>
                <Table responsive striped bordered hover size="md">
                  <thead>
                    <tr>
                      <th>Participant Name</th>
                      <th>Address</th>
                      <th>Contact</th>
                      <th>Emergency Contact</th>
                      <th>Gender</th>
                      <th>Email</th>
                      <th colSpan={2}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      participants.length > 0 ? (
                        participants.map(participant => (
                          <tr>
                            <td>{participant.name}</td>
                            <td>{participant.address}</td>
                            <td>{participant.contact}</td>
                            <td>{participant.emergency}</td>
                            <td>{participant.gender}</td>
                            <td>{participant.email}</td>
                            <td>
                              <Button 
                                variant='primary'
                                onClick={() => this.removeData(participant)}
                              >
                                Delete
                              </Button>
                            </td>
                            <td>
                              <Button
                                variant='primary'
                                onClick={() => this.updateData(participant)}
                              >
                                Edit
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td>No data</td>
                          <td>No data</td>
                          <td>No data</td>
                          <td>No data</td>
                          <td>No data</td>
                          <td>No data</td>
                          <td>No data</td>
                        </tr>
                      )
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Tables;
