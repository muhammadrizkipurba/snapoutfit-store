import React, { Component } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import successGIF from "../utils/Images/success.gif";
import FormField from "../utils/Form/FormField";
import { update, generateData, isFormValid } from "../utils/Form/FormActions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { RegisterUser } from '../../actions/user_actions';
import { withRouter } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
 });
 
class Register extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "First Name"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          name: "lastname_input",
          type: "text",
          placeholder: "Last Name"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
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
      },
      confirmPassword: {
        element: "input",
        value: "",
        config: {
          name: "confirm_password_input",
          type: "password",
          placeholder: "Confirm your password"
        },
        validation: {
          required: true,
          confirm: "password"
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  updateForm = element => {
    const newFormdata = update(element, this.state.formData, "register");
    this.setState({
      formError: false,
      formData: newFormdata
    });
  };

  SubmitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "register");
    let formisValid = isFormValid(this.state.formData, "register");

    if (formisValid) {
      this.props
        .dispatch(RegisterUser(dataToSubmit))
        .then(response => {
          if (response.payload.success) {
            this.setState({
              formError: false,
              formSuccess: true
            })
            setTimeout(() => {
              this.props.history.push("/signin");
            }, 2500)
          } else {
            this.setState({ formError: true });
          }
        })
        .catch(err => {
          this.setState({ formError: true });
        });
    } else {
      this.setState({
        formError: true
      });
    }
  };

  render() {
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="left">
              <form onSubmit={event => this.submitForm(event)}>
                {/* PERSONAL INFO */}
                <h2 className="register-title text-dark">
                  Personal Information
                </h2>
                <hr className="register-line mb-0" />
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      name={"name"}
                      formdata={this.state.formData.name}
                      change={element => this.updateForm(element)}
                    />
                    <h6 className="error_label mt-2 ml-2">
                      {this.state.formData.name.validationMessage}
                    </h6>
                  </div>
                  <div className="block">
                    <FormField
                      name={"lastname"}
                      formdata={this.state.formData.lastname}
                      change={element => this.updateForm(element)}
                    />
                    <h6 className="error_label mt-2 ml-2">
                      {this.state.formData.lastname.validationMessage}
                    </h6>
                  </div>
                </div>
                <div className="form_block_three">
                  <FormField
                    name={"email"}
                    formdata={this.state.formData.email}
                    change={element => this.updateForm(element)}
                  />
                  <h6 className="error_label mt-2 ml-2">
                    {this.state.formData.email.validationMessage}
                  </h6>
                </div>

                {/* ACCOUNT INFO */}
                <h2 className="register-title text-dark mt-5">
                  Set & Verify password
                </h2>
                <hr className="register-line mb-0" />
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      name={"password"}
                      formdata={this.state.formData.password}
                      change={element => this.updateForm(element)}
                    />
                    <h6 className="error_label mt-2 ml-2">
                      {this.state.formData.password.validationMessage}
                    </h6>
                  </div>
                  <div className="block">
                    <FormField
                      name={"confirmPassword"}
                      formdata={this.state.formData.confirmPassword}
                      change={element => this.updateForm(element)}
                    />
                    <h6 className="error_label mt-2 ml-2">
                      {
                        this.state.formData.confirmPassword
                          .validationMessage
                      }
                    </h6>
                  </div>
                </div>
                {this.state.formError ? (
                  <div className="error_label my-4 text-center">
                    There is an error while Signing up. Make sure you have
                    fullfil the form above, and try to sign up again
                  </div>
                ) : null}
                <button
                  className="btn d-block mx-auto text-center btn-success btn-md mt-4 "
                  style={{ width: "200px" }}
                  onClick={event => this.SubmitForm(event)}
                >
                  SIGN UP
                </button>
                <p
                  className="mx-auto text-center mb-2"
                  style={{
                    display: "block",
                    marginTop: "30px",
                    fontSize: "16px"
                  }}
                >
                  Already have an account ? Sign in{" "}
                  <span>
                    <Link style={{ color: "blue" }} to="/signin">
                      here
                    </Link>
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Show if register Success */}
        <Dialog
          open={this.state.formSuccess}
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
	 			{"You have successfully created an account"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
	 			<img
	 				className="container justify-content-center d-flex mt-2"
	 				src={successGIF}
	 				alt="Success"
	 				style={{ width: "110px", height: "auto" }}
	 			/>
	 			
	 				You will redirect to Sign in page automatically
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default connect()(withRouter(Register));
