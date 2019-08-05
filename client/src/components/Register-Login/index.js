import React, { Component } from "react";
import MyButton from "../utils/Buttons";
import Login from "./login"

export default class RegisterLogin extends Component {
  render() {
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="left ">
              <h2 className="text-dark text-center font-weight-bold mb-4">
                New Customers
              </h2>
              <h5 className="text-justify px-4 mb-5" style={{ fontSize: "15px" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sollicitudin tristique tempor. Cras convallis vehiculacondimentum. Maecenas fermentum erat sed mauris auctor congue. Sollicitudin tristique tempor. Cras convallis vehicula kalmu nasdu iwaju temoir sam condimentum. 
              </h5>
              <MyButton
                type="default"
                title="Create an account"
                linkTo="/signup"
                addStyles={{
                  margin: "10px 0 0 0"
                }}
              />
            </div>
            <div className="right text-center">
              <h2 className=" text-dark font-weight-bold mb-4">
                Registered Customers
              </h2>
              <p className=" text-dark font-weight-normal pl-4" style={{ fontSize: "16px" }}>
                If you already have an account. Login here
              </p>
              <Login />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
