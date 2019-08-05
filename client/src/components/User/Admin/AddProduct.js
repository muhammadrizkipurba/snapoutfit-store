import React, { Component } from 'react'
import UserLayout from '../../../highorder-components/UserLayout';
import FormField from "../../utils/Form/FormField";
import { update, generateData, isFormValid, populateOptionFields, resetFields } from "../../utils/Form/FormActions";
import { connect } from 'react-redux';
import { getBrands, getColors, addProduct, clearProduct } from '../../../actions/product_action';
import FileUpload from '../../utils/Form/FileUpload';

class AddProduct extends Component {
    
    state = {
        formError: false,
        formSuccess: false,
        formData: {
            name: {
                element: "product_input",
                value: "",
                config: {
                    label: "Product Name",
                    name: "name_input",
                    type: "text",
                    placeholder: "Product Name"
                },
                validation: {
                  required: true
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showlabel: true
            },
            description: {
                element: "textarea",
                value: "",
                config: {
                    label: "Product Description",
                    name: "description_input",
                    type: "text",
                    placeholder: "Enter product description"
                },
                validation: {
                  required: true
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showlabel: true
            },
            price: {
                element: "product_input",
                value: "",
                config: {
                    label: "Product Price",
                    name: "price_input",
                    type: "number",
                    placeholder: "eg. 100000 ( without Rp and '.' )"
                },
                validation: {
                  required: true
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showlabel: true
            },
            brand: {
                element: "select",
                value: "",
                config: {
                    label: "Product Brand",
                    name: "brand_input",
                    options: []
                },
                validation: {
                  required: true
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showlabel: true
            },
            shipping: {
                element: "select",
                value: "",
                config: {
                    label: "Shipping",
                    name: "shipping_input",
                    options: [
                        {
                            key: true, 
                            value:'Yes'
                        },
                        {
                            key: false, 
                            value:'No'
                        }
                    ]
                },
                validation: {
                  required: true
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showlabel: true
            },
            available: {
                element: "select",
                value: "",
                config: {
                    label: "Available in stock",
                    name: "available_input",
                    options: [
                        {
                            key: true, 
                            value:'Yes'
                        },
                        {
                            key: false, 
                            value:'No'
                        }
                    ]
                },
                validation: {
                  required: true
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showlabel: true
            },
            color: {
                element: "select",
                value: "",
                config: {
                    label: "Product Color",
                    name: "color_input",
                    options: []
                },
                validation: {
                  required: true
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showlabel: true
            },
            publish: {
                element: "select",
                value: "",
                config: {
                    label: "Publish",
                    name: "publish_input",
                    options: [
                        {
                            key: true, 
                            value:'Public'
                        },
                        {
                            key: false, 
                            value:'Hidden'
                        }
                    ]
                },
                validation: {
                  required: true
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showlabel: true
            },
            images: {
                value: [],
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage: "",
                showlabel: false
            }
        }
    }

    updateFields = (newFormData) => {
        this.setState({ formData: newFormData })
    };

    updateForm = element => {
        const newFormdata = update(element, this.state.formData, "products");
        this.setState({
            formError: false,
            formData: newFormdata
        });
    };

    resetFieldHandler = () => {
        const resetFormData = resetFields(this.state.formData, "products");
        
        this.setState({ 
            formData: resetFormData,
            formSuccess: true 
        });

        setTimeout(() => {
            this.setState({ formSuccess: false })
        }, ()=>{
            this.props.dispatch(clearProduct())
        }
        ,3000)
    }

    SubmitForm = event => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData, "products");
        let formisValid = isFormValid(this.state.formData, "products");

        if (formisValid) {
            this.props.dispatch(addProduct(dataToSubmit)).then(() => {
                if(this.props.products.addProduct.success) {
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

    componentDidMount () {
        const { formData } = this.state;
        
        this.props.dispatch(getBrands()).then(res => {
            const newFormData = populateOptionFields(formData, this.props.products.brands, 'brand');
            this.updateFields(newFormData);
            
        })

        this.props.dispatch(getColors()).then(res => {
            const newFormData = populateOptionFields(formData, this.props.products.colors, 'color');
            this.updateFields(newFormData);
            
        })
    }   

    imagesHandler = (images) => {
        const newFormData = {
            ...this.state.formData
        }

        newFormData['images'].value = images;
        newFormData['images'].valid = true;

        this.setState({ formData: newFormData })
    }

    render() {
        return (
          <UserLayout>
            <div className="page_add ml-2">
              <h2 className="text-center font-weight-bolder mb-4 py-3">
                ADD PRODUCT
              </h2>
              <form onSubmit={event => this.submitForm(event)}>
              
                {/* UPLOAD IMAGES */}
                <FileUpload 
                    imagesHandler={ (images) => this.imagesHandler(images) }
                    reset={this.state.formSuccess}
                />

                {/* INPUT PRODUCT NAME */}
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

                {/* INPUT PRODUCT DESCRIPTION */}
                <FormField
                  name={"description"}
                  formdata={this.state.formData.description}
                  change={element => this.updateForm(element)}
                />
                <h6
                  className="error_label mt-2 ml-5"
                  style={{ paddingLeft: "150px" }}
                >
                  {this.state.formData.description.validationMessage}
                </h6>

                {/* INPUT PRODUCT PRICE */}
                <FormField
                  name={"price"}
                  formdata={this.state.formData.price}
                  change={element => this.updateForm(element)}
                />
                <h6
                  className="error_label mt-2 ml-5"
                  style={{ paddingLeft: "150px" }}
                >
                  {this.state.formData.price.validationMessage}
                </h6>

                <div className="form_devider" />

                {/* SELECT PRODUCT BRAND */}
                <FormField
                  name={"brand"}
                  formdata={this.state.formData.brand}
                  change={element => this.updateForm(element)}
                />
                <h6
                  className="error_label mt-2 ml-5"
                  style={{ paddingLeft: "150px" }}
                >
                  {this.state.formData.brand.validationMessage}
                </h6>

                {/* SELECT COLOR */}
                <FormField
                  name={"color"}
                  formdata={this.state.formData.color}
                  change={element => this.updateForm(element)}
                />
                <h6
                  className="error_label mt-2 ml-5"
                  style={{ paddingLeft: "150px" }}
                >
                  {this.state.formData.color.validationMessage}
                </h6>

                {/* SELECT SHIPPING */}
                <FormField
                  name={"shipping"}
                  formdata={this.state.formData.shipping}
                  change={element => this.updateForm(element)}
                />
                <h6
                  className="error_label mt-2 ml-5"
                  style={{ paddingLeft: "150px" }}
                >
                  {this.state.formData.shipping.validationMessage}
                </h6>

                <div className="form_devider" />

                {/* SELECT AVAILABLE */}
                <FormField
                  name={"available"}
                  formdata={this.state.formData.available}
                  change={element => this.updateForm(element)}
                />
                <h6
                  className="error_label mt-2 ml-5"
                  style={{ paddingLeft: "150px" }}
                >
                  {this.state.formData.available.validationMessage}
                </h6>

                {/* SELECT PUBLISH */}
                <FormField
                  name={"publish"}
                  formdata={this.state.formData.publish}
                  change={element => this.updateForm(element)}
                />

                {/* SUCCESS MESSAGE FIELD */}
                {this.state.formSuccess ? (
                  <div className="form_success">
                    Product Added Succesfully
                  </div>
                ) : null}

                {/* ERROR MESSAGE FIELD */}
                {this.state.formError ? (
                  <div className="error_label my-4 pt-3 text-center">
                    There is an error while Adding Product. Make sure
                    you have fullfil the form above, and try to add
                    again
                  </div>
                ) : null}

                {/* SUBMIT BUTTON */}
                <button
                  className="button_add_product btn d-block mx-auto "
                  onClick={event => this.SubmitForm(event)}
                >
                  ADD PRODUCT
                </button>
              </form>
            </div>
          </UserLayout>
        );
    }
}

const mapStateToProps = (state) => ({
    products: state.products
})

export default connect(mapStateToProps)(AddProduct)
