import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader
} from "reactstrap";
import {
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
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i> Participant List
          </CardHeader>
            <CardBody>
            <Table responsive striped bordered hover size="md">
                <thead>
                <tr>
                    <th>Participant Name</th>
                    <th>Contact</th>
                    <th>Emergency Contact</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                    {
                      participants.length > 0 ? (
                        participants.map(participant => (
                          <tr>
                            <td>{participant.name}</td>
                            <td>{participant.contact}</td>
                            <td>{participant.emergency}</td>
                            <td>{participant.email}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
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
      </div>
    );
  }
}

export default Tables;