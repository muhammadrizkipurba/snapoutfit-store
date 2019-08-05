import React from 'react';
import Slider from "react-slick";
import MyButton from "../utils/Buttons";

function HomeSlider(props) {
    
    const slides = [
        {
            img: "/images/promotions/esgotado-3.jpg",
            title: "",
            desc: "",
            linkText: "Shop now",
            linkTo: "/products?categ=esgotado"
        },
        {
            img: "/images/promotions/esgotado-2.jpg",
            title: "",
            desc: "Random for every purchase when stock available",
            linkText: "View Offer",
            linkTo: "/products"
        },
        {
            img: "/images/promotions/batrack.jpg",
            title: "Our Shoes Collection",
            desc: "",
            linkText: "Shop now",
            linkTo: "/products?categ=batrack"
        },
        {
            img: "/images/promotions/foxlox.jpg",
            title: "Jacket Collection",
            desc: "",
            linkText: "Shop now",
            linkTo: "/products?categ=foxlox"
        }
    ]

    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true
    }
    const showSlides = () => (
        slides ?
            slides.map((item,i) => (
                <div key={i}>
                    <div 
                        className="featured_image" 
                        style={{
                            backgroundImage: `url(${item.img})`,
                            backgroundRepeat: "no-repeat",
                            height: `70vh`,
                            objectFit: "cover",
                        }}
                    >
                        <div className="featured_action">
                            <MyButton 
                                type="default" 
                                title={item.linkText}
                                linkTo={item.linkTo}
                            />
                        </div>
                    </div>
                </div>
            ))
        :
        null
    )

    return (
        <div className="featured_container p-5">
            <Slider {...settings}>
                {showSlides()}
            </Slider>
        </div>
    )
}

export default HomeSlider;
