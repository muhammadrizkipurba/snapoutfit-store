import React, { Component } from "react";
import FormField from "../utils/Form/FormField";
import { connect } from "react-redux";
import { update, generateData, isFormValid } from "../utils/Form/FormActions";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { LoginUser } from "../../actions/user_actions";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formData: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter email"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter password"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  updateForm = element => {
    const newFormdata = update(element, this.state.formData, "login");
    this.setState({
      formError: false,
      formData: newFormdata
    });
  };

  SubmitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "login");
    let formisValid = isFormValid(this.state.formData, 'login');

    if(formisValid){
        this.props.dispatch(LoginUser(dataToSubmit)).then(response => {
            if(response.payload.loginSuccess){
                this.props.history.push('/')
            } else {
                this.setState({ formError: true }) 
            }
        });

    } else {
        this.setState({
            formError: true
        })
    }

  };

  render() {
    return (
      <div>
        <form className="form-login">
          {/* EMAIL */}
          <div className="input-group form-group">
            <div className="input-group-prepend">
              <span className="input-group-text" style={{backgroundColor:"var(--primaryColor)", color:"white"}}>
                <FaEnvelope />
              </span>
            </div>
            <FormField
              name={"email"}
              formdata={this.state.formData.email}
              change={element => this.updateForm(element)}
            />
            <h6 className="error_label d-block mt-2 ml-2">
              {this.state.formData.email.validationMessage}
            </h6>
          </div>

          {/* PASSWORD */}
          <div className="input-group form-group">
            <div className="input-group-prepend">
              <span className="input-group-text" style={{backgroundColor:"var(--primaryColor)", color:"white"}} >
                <FaKey />
              </span>
            </div>
            <FormField
              name={"password"}
              formdata={this.state.formData.password}
              change={element => this.updateForm(element)}
            />
            <h6 className="error_label mt-2 ml-2">
              {this.state.formData.password.validationMessage}
            </h6>
          </div>
          {this.state.formError ? (
            <div className="error_label mb-4">
              Login failed. Make sure your email & password are correct
            </div>
          ) : null}
        </form>
        <button
          className="btn text-center btn-success btn-sm mx-auto mt-0"
          style={{ width: "100px",fontWeight: "bold"  }}
          onClick={event => this.SubmitForm(event)}
        >
            SIGN IN
        </button>
        <a href="/" style={{ display:"block",marginTop: "10px", fontSize: "12px" }}>
          Forgot password ?
        </a>
      </div>
    );
  }
}


export default connect()(withRouter(Login));
