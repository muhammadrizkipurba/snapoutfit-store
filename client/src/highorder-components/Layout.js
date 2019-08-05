import React, { Component } from "react";
import Header from "../components/Header-Footer/Header/Header";
import Footer from "../components/Header-Footer/Footer/Footer";
import { connect } from "react-redux";
import { getSiteInfo } from "../actions/site_actions";

class Layout extends Component {

  componentDidMount() {
    if(Object.keys(this.props.site).length === 0) {
      this.props.dispatch(getSiteInfo())
    }
  }
  
  render() {
    return (
      <div className="page_wrapper m-0 p-0">
        <Header />
        <div className="page_container">{this.props.children}</div>
        <Footer data={this.props.site} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      site : state.site
  }
}

export default connect(mapStateToProps)(Layout);
