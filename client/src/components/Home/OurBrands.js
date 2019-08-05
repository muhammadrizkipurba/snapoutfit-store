import React from 'react'
import styled from 'styled-components'
import esgotado from '../utils/Images/logo-product/logo-esgotado.png'
import paxta from '../utils/Images/logo-product/logo-paxta.png'
import foxlox from '../utils/Images/logo-product/logo-foxlox.png'
import batrack from '../utils/Images/logo-product/logo-batrack.png'

export default function OurBrands() {
   return (
     <OurBrandWrapper>
       <div className="container">
         <div className="brand_on_sale">TOP BRAND ON SALE</div>
       </div>
       <div className="parent-wrapper">
         <div id="wrapper">
           <div id="esgotado" className="logo" />
           <div id="paxta" className="logo" />
           <div id="batrack" className="logo" />
           <div id="foxlox" className="logo" />
         </div>
       </div>
     </OurBrandWrapper>
   );
}


const OurBrandWrapper = styled.div`
  background: url("https://images.unsplash.com/photo-1512361180836-1ecddb33f2dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80") no-repeat center;
  background-size: cover;
  min-height: 200px;
  margin: 0 50px;
  outline: 2px solid var(--mainGrey);
  outline-offset: 10px;
  
  /* LOGO PICTURES */
  .logo {
    width: 200px;
    height: 200px;
    /* center content using flex box */
    display: flex;
    justify-content: center;
    align-items: center;
    /* overlay */
    box-shadow: 0 0 0 100px inset, 0 0 5px grey;
    /* hover out transition */
    transition: box-shadow 1s;
    float: left;
    margin: 10px;
  }

  /* LOGO NAMES */

  .logo::after {
    width: 80%;
    height: 80%;
    display: block;
    white-space: pre;
    font: 15pt "Poppins";
    font-weight: 900;
    color: white;
    border: 2px solid;
    text-align: center;
    /* center content using flex box */
    display: flex;
    justify-content: center;
    align-items: center;
    /* hover out transition */
    transition: opacity 1s 0.5s;
  }

  /* REVEAL LOGO PICTURE ON HOVER */
  .logo:hover {
    box-shadow: 0 0 0 5px inset, 0 0 5px grey, 0 0 10px grey inset;
    transition: box-shadow 1s;
  }

  /* HIDE LOGO NAME ON HOVER */
  .logo:hover::after {
    opacity: 0;
    transition: opacity 0.5s;
  }

  #esgotado {
    background-image: url(${esgotado});
    background-size: 100% auto;
    background-repeat:no-repeat;
    color: rgba(0, 0, 0, 0.8);
  }

  #esgotado::after {
    content: "ESGOTADO";
  }

  #paxta {
   background-image: url(${paxta});
    background-size: 100% auto;
    background-repeat:no-repeat;
    color: rgba(0, 0, 0, 0.8);
  }

  #paxta::after {
    content: "PAXTA";
  }

  #batrack {
   background-image: url(${batrack});
    background-size: 100% auto;
    background-repeat:no-repeat;
    color: rgba(0, 0, 0, 0.8);
  }

  #batrack::after {
    content: "BATRACK";
  }

  #foxlox {
   background-image: url(${foxlox});
    background-size: 100% auto;
    background-repeat:no-repeat;
    color: rgba(0, 0, 0, 0.8);
  }

  #foxlox::after {
    content: "FOXLOX";
  }

  #wrapper {
   position:relative;
  }

  @media screen and (max-width: 768px) {    
    min-height: 170vh;

    #wrapper {
    position:relative;
    display: block; 
    justify-content:space-between;
    align-items:center;
    }
  }

  .container .brand_on_sale {
    padding-top: 40px;
    font-family: 'Jockey One', sans-serif;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-align: center;
    font-size: 50px;
    text-shadow: 2px 2px 2px grey; 
  }

  .parent-wrapper {
    height: auto;
    display: flex;
    width: 100%;
    min-height: 300px;
    justify-content:space-between;
    align-items:center;
    padding-left: 220px;
    margin-bottom: 50px;
  }

  .row {
    justify-content: space-between !important;
  }

`;