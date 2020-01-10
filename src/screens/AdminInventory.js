import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from "reactstrap";
import firebase from '../firebase'
import {
  Button,
  Form,
  Table
} from 'react-bootstrap'

class Tables extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
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
    let description = this.refs.description.value;
    let stock = this.refs.stock.value;  
    let price = this.refs.price.value;

    if (uid && name && description && stock && price) {
      const { items } = this.state;
      const devIndex = items.findIndex(data => {
        return data.uid === uid;
      });
      console.log(items[devIndex].uid)
      items[devIndex].name = name;
      items[devIndex].description = description;
      items[devIndex].stock = stock;
      items[devIndex].price = price;
      this.setState({ items });
    } 
    else if (name && description && stock && price) {
      const uid = new Date().getTime().toString();
      const { items } = this.state;
      let ref = firebase.ref('items');
        ref.orderByChild('name').equalTo(name).once('value', snapshot => {
          if(snapshot.exists()){
            const userData = snapshot.val()
            alert( name + ' already exist');
            console.log('exist!',userData)
          }
        else{
          items.push({ uid, name, description, stock, price });
          this.setState({ items });
          console.log('data added')
        }
        }
      )
    }

    this.refs.name.value = "";
    this.refs.description.value = "";
    this.refs.stock.value = "";
    this.refs.uid.value = "";
    this.refs.price.value = '';
  }

  removeData = item => {
    const { items } = this.state;
    const newState = items.filter(data => {
    return data.uid !== item.uid;
    });
    this.setState({ items: newState });
  }

  updateData = item => {
    this.refs.uid.value = item.uid;
    this.refs.name.value = item.name;
    this.refs.description.value = item.description;
    this.refs.stock.value =item.value;
    this.refs.price.value =item.price;
  }
  handleChange = (e) => {
    this.setState({selectValue: e.target.value});
  }
  render() {
    const { items } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Inventory CRUD
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group as={Row}>
                    <Col sm="6">
                      <Form.Control type="hidden" ref="uid" />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlaintext">
                    <Form.Label column sm="4">
                      Item Name
                    </Form.Label>
                    <Col sm="6">
                      <Form.Control
                        type="text"
                        ref="name"
                        className="Form-control"
                        placeholder="Item Name"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group 
                    as={Row} 
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label column sm="4">
                      Description
                    </Form.Label>
                    <Col sm="6">
                      <Form.Control
                        as="textarea" 
                        rows="3" 
                        type="text"
                        ref="description"
                        className="Form-control"
                        placeholder="Description"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlainnumber">
                    <Form.Label column sm="4">
                      Stock
                    </Form.Label>
                    <Col sm="6">
                      <Form.Control
                        type="number"
                        ref="stock"
                        className="Form-control"
                        placeholder="Stock"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlainnumber">
                    <Form.Label column sm="4">
                      Price ( RM )
                    </Form.Label>
                    <Col sm="6">
                      <Form.Control
                        type="number"
                        ref="price"
                        className="Form-control"
                        placeholder="Price"
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
          <Col xs="12" lg="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Inventory List
              </CardHeader>
              <CardBody>
                <Table responsive striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Description</th>
                      <th>In Stock</th>
                      <th>Price (RM)</th>
                      <th colSpan={2}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      items.length > 0 ? (
                        items.map(item => (
                          <tr>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.stock}</td>
                            <td>{item.price}</td>
                            <td>
                              <Button 
                                variant='primary'
                                onClick={() => this.removeData(item)}
                              >
                                Delete
                              </Button>
                            </td>
                            <td>
                              <Button
                                variant='primary'
                                onClick={() => this.updateData(item)}
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
