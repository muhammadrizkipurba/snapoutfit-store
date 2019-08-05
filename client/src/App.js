import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./highorder-components/Layout";
import Auth from "./highorder-components/Auth";

import Home from "../src/components/Home";
import RegisterLogin from "./components/Register-Login";
import Register from "./components/Register-Login/register";
import UserDashboard from "./components/User";
import ProductPage from "./components/Products/Layout";
import AddProduct from "./components/User/Admin/AddProduct";
import ManageCategories from "./components/User/Admin/ManageCategories";
import ProductDetail from "./components/Products/Layout/ProductDetail";
import Cart from "./components/User/Cart";
import UserInformation from "./components/User/UserInformation";
import ManageSite from "./components/User/Admin/ManageSite";
import PageNotFound from "./components/utils/PageNotFound";


// Public route : Auth = null
// Private route : Auth = true
// Public - private route : Auth = null

class App extends  Component {
  render(){
    const { location } = this.props;
    return (
      <Layout>
        <Switch location={location}>
          <Route path="/" exact component={Auth(Home, null)} />
          <Route path="/products" exact component={Auth(ProductPage, null)} />
          <Route path="/product_detail/:id" exact component={Auth(ProductDetail, null)} />
          <Route path="/signup" exact component={Auth(Register, false)} />
          <Route path="/signin" exact component={Auth(RegisterLogin, false)} />
          <Route path="/dashboard" exact component={Auth(UserDashboard, true)} />
          <Route path="/admin/add_product" exact component={Auth(AddProduct, true)} />
          <Route path="/admin/manage_categories" exact component={Auth(ManageCategories, true)} />
          <Route path="/admin/site_info" exact component={Auth(ManageSite, true)} />
          <Route path="/user/cart" exact component={Auth(Cart,true)} /> 
          <Route path="/user/edit_profile" exact component={Auth(UserInformation,true)} /> 
          <Route exact component={Auth(PageNotFound)} /> 
        </Switch>
      </Layout>
    );
  }
}

export default App;