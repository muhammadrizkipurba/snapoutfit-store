import React, { Component } from "react";
import FormField from "../../utils/Form/FormField";
import { update, generateData, isFormValid, populateFields } from "../../utils/Form/FormActions";
import { connect } from "react-redux";
import { getSiteInfo, updateSiteInfo } from "../../../actions/site_actions";

export class UpdateSiteInfo extends Component {
    
    state = {
        formError: false,
        formSuccess: false,
        formData:{
            address: {
                element: "site_input",
                value: "",
                config: {
                  label: "Address",
                  name: "address_input",
                  type: "text",
                  placeholder: "Enter store address"
                },
                validation: {
                  required: true
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showlabel: true
            },
            day: {
                element: "site_input",
                value: "",
                config: {
                  label: "Open days",
                  name: "day_input",
                  type: "text",
                  placeholder: "Enter store working days"
                },
                validation: {
                  required: true
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showlabel: true
            },
            hours: {
                element: "site_input",
                value: "",
                config: {
                  label: "Open Hours",
                  name: "hours_input",
                  type: "text",
                  placeholder: "Enter store working hours"
                },
                validation: {
                  required: true
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showlabel: true
            },
            phone: {
                element: "site_input",
                value: "",
                config: {
                  label: "Phone Number",
                  name: "phone_input",
                  type: "text",
                  placeholder: "Enter store phone number"
                },
                validation: {
                  required: true
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showlabel: true
            },
            email: {
                element: "site_input",
                value: "",
                config: {
                  label: "Store Email",
                  name: "email_input",
                  type: "email",
                  placeholder: "Enter store email"
                },
                validation: {
                  required: true,
                  email: true
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showlabel: true
            }
        }
    }

    updateForm = element => {
        const newFormdata = update(element, this.state.formData, "site_info");
        this.setState({
            formError: false,
            formData: newFormdata
        });
    };

    SubmitForm = event => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData, "site_info");
        let formisValid = isFormValid(this.state.formData, "site_info");

        if (formisValid) {
            this.props.dispatch(updateSiteInfo(dataToSubmit)).then(() => {
                this.setState({
                    formSuccess: true
                }, () => {
                    setTimeout(() => {
                        this.setState({ formSuccess: false })
                    }, 3000)
                })
            })
        } else {
            this.setState({
                formError: true
            });
        }
    };

    componentDidMount() {
        this.props.dispatch(getSiteInfo()).then(() => {
            const newFormData = populateFields(this.state.formData, this.props.site.siteInfo[0])
            this.setState({
                formData: newFormData
            })
        })
    }

    render() {
        return (
            <div className="update_site_form pt-4">
                <form onSubmit={event => this.submitForm(event)}>
                    <div className="block">
                        <FormField
                            name={"address"}
                            formdata={this.state.formData.address}
                            change={element => this.updateForm(element)}
                        />
                        <h6 className="error_label mt-2 ml-2">
                            {/* {this.state.formData.name.validationMessage} */}
                        </h6>
                        </div>
                    <div className="block">
                        <FormField
                            name={"day"}
                            formdata={this.state.formData.day}
                            change={element => this.updateForm(element)}
                        />
                        <h6 className="error_label mt-2 ml-2">
                            {/* {this.state.formData.day.validationMessage} */}
                        </h6>
                    </div>
                    <div className="block">
                        <FormField
                            name={"hours"}
                            formdata={this.state.formData.hours}
                            change={element => this.updateForm(element)}
                        />
                        <h6 className="error_label mt-2 ml-2">
                            {/* {this.state.formData.hours.validationMessage} */}
                        </h6>
                    </div>
                    <div className="block">
                        <FormField
                            name={"phone"}
                            formdata={this.state.formData.phone}
                            change={element => this.updateForm(element)}
                        />
                        <h6 className="error_label mt-2 ml-2">
                            {/* {this.state.formData.phone.validationMessage} */}
                        </h6>
                    </div>
                    <div className="block">
                        <FormField
                            name={"email"}
                            formdata={this.state.formData.email}
                            change={element => this.updateForm(element)}
                        />
                        <h6 className="error_label mt-2 ml-2">
                            {/* {this.state.formData.email.validationMessage} */}
                        </h6>
                    </div>
                    {this.state.formSuccess ? (
                        <div className="form_success my-4 text-center">
                            Update Success. Your new store info has been saved
                        </div>
                    ) : null}
                    {this.state.formError ? (
                        <div className="error_label my-4 text-center">
                            There is an error while Updating the Site Info. Make sure you have
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
        site : state.site
    }
}

export default connect(mapStateToProps)(UpdateSiteInfo)
