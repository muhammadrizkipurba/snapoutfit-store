import React from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaRegEnvelope,
  FaPhone,
  FaRegClock,
} from "react-icons/fa";
import "./Footer.css";
import facebookLogo from "../../utils/Images/icons/facebook.png"
import twitterLogo from "../../utils/Images/icons/twitter.png"
import instagramLogo from "../../utils/Images/icons/instagram.png"
import youtubeLogo from "../../utils/Images/icons/youtube.png"
import Swal from 'sweetalert2';


export default function Footer({data}) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  return (
    data.siteInfo ?
      <div className="footer text-white pt-5 pb-3 font-weight-light">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
              <div className="ft-logo">
                <h2
                  className="font-weight-bold text-uppercase text-center"
                  style={{ letterSpacing: "10px" }}
                >
                  snapoutfit store
                </h2>
              </div>
            </div>
          </div>
          <hr className="footer-line" />
          <div className="row ">
            {/* FOOTER ABOUT */}
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 ">
              <div className="footer-title text-center">Company</div>
              <div className="footer-widget d-flex">
                <ul className="icons mr-2">
                    <li className="mt-1 mb-2"><FaMapMarkerAlt/></li>
                    <li className="mb-2"><FaRegClock/></li>
                    <li className="mb-2"><FaRegEnvelope/></li>
                    <li><FaPhone/></li>
                </ul>
                <ul className="list-unstyled">
                  <li>{data.siteInfo[0].address}</li>
                  <li className="pt-1">{data.siteInfo[0].day} | {data.siteInfo[0].hours}</li>
                  <li className="pt-2">{data.siteInfo[0].email}</li>
                  <li className="pt-2">{data.siteInfo[0].phone}</li>
                </ul>
              </div>
            </div>
            {/* FOOTER SUPPORT */}
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 ">
                <div className="footer-title text-center">Brands</div>
              <div className="footer-widget">
                <ul className="list-unstyled">
                  <li className="justify-content-center">
                    <Link to="/" className="links">Esgotado Bag</Link>
                  </li>
                  <li className="justify-content-center">
                    <Link to="/" className="links">Batrack Shoes</Link>
                  </li>
                  <li className="justify-content-center">
                    <Link to="/" className="links">Foxlox</Link>
                  </li>
                  <li className="justify-content-center">
                    <Link to="/" className="links">Paxta ID</Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* FOOTER NEWSLETTER */}
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-6">
                <div className="footer-title text-center">
                  Subscribe Newsletter
                </div>
              <p className="text-center p-0 my-3">Be the first who know about our new arrival product</p>
              <div className="footer-widget ">
                <form>
                  <div className="newsletter-form text-center">
                    <input
                      className="form-control"
                      placeholder="Enter Your Email address"
                      type="text"
                      autoComplete="subscribe newsletter"
                    />
                    <button 
                      className="footer-button btn btn-sm text-center font-weight-bold"
                      type="submit"
                      onClick={() => {
                        Toast.fire({
                          type: 'success',
                          title: 'Thank you for subscribing'
                        })
                      }}  
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          {/* FOLLOW SOCIAL MEDIA */}
          <div className="social-media mt-5 text-center">
            <h3 className="footer-title">
              FOLLOW US
            </h3>
            <div className="social-media-logo d-block my-4 text-center">
              <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com">
                <img className="p-2" src={facebookLogo} alt="facebook" />
              </a>
              <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com">
                <img className="p-2" src={instagramLogo} alt="instagram" />
              </a>
              <a target="_blank" rel="noopener noreferrer" href="https://www.twitter.com">
                <img className="p-2" src={twitterLogo} alt="twitter" />  
              </a>
              <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com">
                <img className="p-2" src={youtubeLogo} alt="youtube" />
              </a>
              
            </div>
          </div>

          {/* TINY FOOTER */}
          <div className="row p-0">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center">
              <div className="tiny-footer text-center">
                <hr className="p-0"/>
                <p className="allright-reserved mb-0">
                  Copyright © All Rights Reserved {new Date().getFullYear()} | Template Design &
                  Development by Muhammad Rizki Purba
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    : null
  );
}
