import React, { Component } from "react";
import FormField from "../../utils/Form/FormField";
import { update, generateData, isFormValid, resetFields } from "../../utils/Form/FormActions";
import { connect } from "react-redux";
import { getBrands, addBrand } from "../../../actions/product_action";


class ManageBrand extends Component {
    
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
                    placeholder: "Enter the brand name here"
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
    
    showCategoriesItem = () => (
        this.props.products.brands ? 
            this.props.products.brands.map((item, i) => (
                <div className="category_item" key={item._id}>
                    {item.name}
                </div>
            ))
        :null
    );

    updateForm = element => {
        const newFormdata = update(element, this.state.formData, "brands");
        this.setState({
            formError: false,
            formData: newFormdata
        });
    };

    SubmitForm = event => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData, "brands");
        let formisValid = isFormValid(this.state.formData, "brands");
        let existingBrands = this.props.products.brands;

        if (formisValid) {
            this.props.dispatch(addBrand(dataToSubmit, existingBrands)).then(result => {
                if(result.payload.success){
                    this.resetFieldHandler();
                } else {
                    this.setState({ formError: true })
                }
            })
        } else {
            this.setState({
                formError: true
            });
        }
    };

    resetFieldHandler = () => {
        const resetFormData = resetFields(this.state.formData, "brands");
        
        this.setState({ 
            formData: resetFormData,
            formSuccess: true 
        });
    }

    componentDidMount() {
        this.props.dispatch(getBrands());
    };

    render() {
        return (
            <div className="admin_category_wrapper">
                <h4 className="manage_category_title text-center font-weight-bolder">BRANDS</h4>
                <div className="admin_two_column">
                    <div className="left">
                        <h4 className="font-weight-bold text-center pt-3 pb-2 m-0" style={{ fontSize: "20px" }}>List of Brands</h4>
                        <div className="brands_container">
                            {this.showCategoriesItem()}
                        </div>
                    </div>
                    <div className="right">
                        <form onSubmit={event => this.submitForm(event)}>
                            <h4 className="font-weight-bold text-center pt-3 pb-2 m-0" style={{fontSize: "20px"}}>Have a new Brand ? Add here !</h4>
                            {/* INPUT BRAND NAME */}
                            <FormField
                                name={"name"}
                                formdata={this.state.formData.name}
                                change={element => this.updateForm(element)}
                            />
                            <h6
                                className="error_label mt-2 ml-5"
                                style={{ paddingLeft: "150px" }}
                            >
                                {this.state.formData.name.validationMessage}
                            </h6>

                            {/* ERROR MESSAGE FIELD */}
                            {this.state.formError ? (
                            <div className="error_label my-4 pt-3 text-center">
                                There is an error while Adding Brand. Please try again
                            </div>
                            ) : null}

                            {/* SUBMIT BUTTON */}
                            <button
                                className="button_add_product btn d-block mx-auto"
                                onClick={event => this.SubmitForm(event)}
                            >
                                ADD BRAND
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    products: state.products
});

export default connect(mapStateToProps)(ManageBrand);
