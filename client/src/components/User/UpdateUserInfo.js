import React, { Component } from 'react'
import FormField from "../utils/Form/FormField";
import { update, generateData, isFormValid, populateFields } from "../utils/Form/FormActions";
import { connect } from "react-redux";
import { updateUserInfo, clearUpdateUserInfo } from '../../actions/user_actions';

class UpdateUserInfo extends Component {

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
              }       
        }
    }

    updateForm = element => {
        const newFormdata = update(element, this.state.formData, "update_user");
        this.setState({
            formError: false,
            formData: newFormdata
        });
    };

    SubmitForm = event => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData, "update_user");
        let formisValid = isFormValid(this.state.formData, "update_user");

        if (formisValid) {
            this.props.dispatch(updateUserInfo(dataToSubmit)).then(() => {
                if(this.props.user.updateUserInfo.success){
                    this.setState({
                        formSuccess: true
                    }, () => {
                        setTimeout(() => {
                            this.props.dispatch(clearUpdateUserInfo());
                            this.setState({
                                formSuccess: false
                            })
                        },3000)
                    })
                }
            })
        } else {
            this.setState({
                formError: true
            });
        }
    };
    
    componentDidMount() {
        const newFormData = populateFields(this.state.formData, this.props.user.userData);
        this.setState({
            formData: newFormData
        })
    }


    render() {
        return (
            <div className="edit_personal_info mt-5 px-5">
                <h2 className="text-center font-weight-bold pb-4">NEW PERSONAL INFORMATION</h2>
                <form onSubmit={event => this.submitForm(event)}>
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
                    {this.state.formSuccess ? (
                        <div className="form_success my-4 text-center">
                            Update Success. Your new info has been saved
                        </div>
                    ) : null}
                    {this.state.formError ? (
                        <div className="error_label my-4 text-center">
                            There is an error while Updating Your Info. Make sure you have
                            fullfil the form above, and try to update again
                        </div>
                    ) : null}
                    <button
                        className="btn d-block mx-auto text-center btn-success btn-md mt-4 "
                        style={{ width: "200px" }}
                        onClick={event => this.SubmitForm(event)}
                    >
                        UPDATE
                </button>
                </form>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user : state.user
    }
}

export default connect(mapStateToProps)(UpdateUserInfo)
