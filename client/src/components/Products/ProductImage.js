import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class ProductImage extends Component {

    state = {
        lightbox: false,
        imagePos: 0,
        lightboxImages: [],
    }

    componentDidMount() {
        if(this.props.detail.images.length > 0) {
            let lightboxImages = [];

            this.props.detail.images.forEach(item => {
                lightboxImages.push(item.url)
            })

            this.setState({ lightboxImages })
        }
    }

    renderCardImage = (images) => {
        if(images.length > 0) {
            return images[0].url
        } else {
            return `/images/no-image.jpg `
        }
    }

    showThumbs = () => (
        this.state.lightboxImages.map((item,i)=>(
            i > 0 ?
                <div
                    key={i}
                    onClick={()=> this.handleLightBox(i)}
                    className="thumb"
                    style={{background: `url(${item}) no-repeat`}}
                ></div>
            :null
        ))
    )

    handleLightBox = (pos) => {
        if(this.state.lightboxImages.length > 0) {
            this.setState({
                lightbox: true,
                imagePos: pos
            })
        }
        
    }

    handleLightBoxClose = () => {
        this.setState({ lightbox: false })
    }

    render() {
        const {detail} = this.props;
        const { lightboxImages, lightbox, imagePos } = this.state;
        return (
            <div className="product_image_container">
               <div className="main_pic">
                    <div className="cover_image" 
                        style={{background:`url(${this.renderCardImage(detail.images)}) no-repeat`}}
                        onClick={() => this.handleLightBox(0)}
                    >
                        {detail.images.length > 0 ?
                            <h6 className="text-center">Click to see more Images</h6>
                            :null
                        }
                    </div>                
               </div>
               
                {/* LIGHTBOX */}
                {lightbox && (
                    <Lightbox
                        mainSrc={lightboxImages[imagePos]}
                        nextSrc={lightboxImages[(imagePos + 1) % lightboxImages.length]}
                        prevSrc={lightboxImages[(imagePos + lightboxImages.length - 1) % lightboxImages.length]}
                        onCloseRequest={() => this.handleLightBoxClose()}
                        onMovePrevRequest={() =>
                        this.setState({
                            imagePos: (imagePos + lightboxImages.length - 1) % lightboxImages.length,
                        })
                        }
                        onMoveNextRequest={() =>
                        this.setState({
                            imagePos: (imagePos + 1) % lightboxImages.length,
                        })
                        }
                    />
                    )}
            </div>
        )
    }
}

export default ProductImage;
