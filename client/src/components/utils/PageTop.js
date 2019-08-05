import React from 'react'
import styled from "styled-components";

function PageTop() {
    return (
        <div className="page_top">
            <div className="text-center p-0 m-0">
                <TitleWrapper>
                    <div className="top-page-title" id="first-of-type">GOOD CHOICE</div>
                    <div className="top-page-title" id="last-of-type">
                        <span>FOR GOOD LOOKING</span>
                    </div>
                </TitleWrapper>
            </div>
        </div>
    )
}

const TitleWrapper = styled.div`
.top-page-title {
   font-family: 'Changa One', cursive;
   padding: 3px !important;
   letter-spacing: 0px !important;
   margin-top: 10px;
   font-weight: bolder;
   font-size: 40px;
   font-style: italic;

}
div {
  display:inline-block !important;
  overflow:hidden;
  white-space:nowrap;
}

div:first-of-type { 
  animation: showup 12s infinite;
  margin-left: 10px;
  cursor: default;
}

div:last-of-type {
  animation: reveal 12s infinite;
  cursor: default;
}

div:last-of-type span {
  animation: slidein 12s infinite;
}

@keyframes showup {
    0% {opacity:0;}
    20% {opacity:1;}
    80% {opacity:1;}
    100% {opacity:0;}
}

@keyframes slidein {
    0% { margin-left:-1000px; }
    20% { margin-left:-1000px; }
    35% { margin-left:0px; }
    100% { margin-left:0px; }
}

@keyframes reveal {
    0% {opacity:0;width:0px;}
    20% {opacity:1;width:0px;}
    30% {width:355px;}
    80% {opacity:1;}
    100% {opacity:0;width:355px;}
}

@media screen and (max-width: 992px) {
    div {
        display:none !important;
        overflow:hidden;
        white-space:nowrap;
    }
}

`;

export default PageTop;
