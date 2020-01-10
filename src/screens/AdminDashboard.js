import React, { Component } from "react";
import {
  Col,
  Row
} from "reactstrap";
import List from './List'
import Inventory from "./Inventory";

export default class Dashboard extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="10">
            <List />
          </Col>
          <Col xs="12" lg="5">
            <Inventory/>
          </Col>
        </Row>
      </div>
    );
  }
}