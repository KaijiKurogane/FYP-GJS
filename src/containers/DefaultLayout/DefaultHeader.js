import React, { Component } from "react";
import {
  // Badge,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav
  // NavItem
} from "reactstrap";
import PropTypes from "prop-types";

import {
  AppNavbarBrand,
  AppSidebarToggler
} from "@coreui/react";
import logo from "../../assets/img/brand/header logo.png";
import sygnet from "../../assets/img/brand/sygnet.svg";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppNavbarBrand
          full={{ src: logo, width: 140, height: 85, alt: "GSJ" }}
          // full={{ src: logo, alt: "GSJ" }}
          minimized={{ src: sygnet, alt: "GSJ" }}
        >
          {/* <span>Gombak Jungle School</span> */}
        </AppNavbarBrand>

        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppSidebarToggler className="d-md-down-none" display="lg" />


        <Nav className="ml-auto " navbar>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <i className="fa fa-user" alt="Profile"></i>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center">
                <strong>Account</strong>
              </DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}>
                <i className="fa icon-logout"></i> Logout
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;