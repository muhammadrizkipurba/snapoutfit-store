import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from '../actions/user_actions';
import CircularProgress from "@material-ui/core/CircularProgress";
import Swal from 'sweetalert2';

export default function(ComposedClass, reload, adminRoute = null) {
    
    class Authentication extends Component {
    
        state = {
            loading: true
        }

        componentDidMount() {
            this.props
                .dispatch(auth())
                .then(res => {
                    let user = this.props.user.userData;

                    if(!user.isAuth){
                        if(reload) {
                            setTimeout(() => {
                                this.props.history.push('/signin')
                            }, 0);
                            Swal.fire({
                              imageUrl:"https://www.shareicon.net/data/256x256/2015/11/16/170905_exit_256x256.png",
                              imageAlt:"Access Denied",
                              imageHeight: "70px",
                              padding:"20px",
                              background:"#ded9d9",
                              backdrop:"rgba(0, 0, 0, 0.8)",
                              title: "Oopss..",
                              html:
                                '<h5 class="font-weight-bold pt-4 text-dark">You must sign in to access the page</h5>' +
                                '<p class="pt-2">Click OK to continue Sign In</p>',
                              showConfirmButton: true,
                              confirmButtonColor:"#1d8222",
                              confirmButtonClass:"mt-0 mb-2"
                            });
                        }
                    } else {
                        if(adminRoute && !user.isAdmin){
                            this.props.history.push('/dashboard')
                        } else {
                            if(reload === false){
                                this.props.history.push('/dashboard')
                            }
                        }
                    }
                    
                    this.setState({ loading: false });
                    
                })
        }

        render() {
            if(this.state.loading){
                return (
                    <div className="page-wrapper">
                        <CircularProgress 
                            className="d-block mx-auto"
                            style={{ color: "var(--primaryColor)", width:"40px", height:"auto", marginTop:"200px"}} 
                            thickness={7} 
                        />
                    </div>
                )
            }
            return (
                <ComposedClass {...this.props} user={this.props.user} />
            )
        }
    }
    
    function mapStateToProps(state){
        return {
            user : state.user
        }
    }

    return connect(mapStateToProps)(Authentication);
}