import React, { Component } from "react";
import Dropzone from 'react-dropzone';
import axios from "axios";
import { FaPlusCircle } from "react-icons/fa";
import CircularProgress from "@material-ui/core/CircularProgress";

class FileUpload extends Component {
    constructor() {
        super();
        this.state = {
            uploadedFiles: [],
            uploading: false,
        };
    }

    onDrop = (files) => {
        this.setState({ uploading: true })
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        formData.append("image", files[0])

        axios.post('/user/uploadimage', formData, config).then(res => {
            this.setState({ 
                uploading: false,
                uploadedFiles: [
                    ...this.state.uploadedFiles,
                    res.data
                ]
            }, () => {
                this.props.imagesHandler(this.state.uploadedFiles)
            })
        })
    };

    removeImage = (id) => {
        axios.get(`/user/removeimage?public_id=${id}`).then(res => {
            let images = this.state.uploadedFiles.filter(item => {
                return item.public_id !== id;
            })

            this.setState({ 
                uploadedFiles: images 
            }, () => {
                this.props.imagesHandler(images)
            })
        })
    }

    showUploadedImages = () => (
        this.state.uploadedFiles.map(item => (
            <div 
                className="dropzone_box"
                key={item.public_id}
                onClick={() => this.removeImage(item.public_id)}
            >
                <div 
                    className="wrap"
                    style={{background: `url(${item.url}) no-repeat`}}
                >
                </div>
            </div>
        ))
    )

    static getDerivedStateFromProps(props, state) {
        if(props.reset) {
            return state = {
                uploadedFiles: []
            }
        }
        return null;
    }

    render() {

        return (
            <div>
                <section>
                    <h5 className="mt-0 pb-2 font-weight-bold">Upload Product Images :</h5>
                    <div className="dropzone clear mb-4">
                        <Dropzone multiple={false} onDrop={(e) => this.onDrop(e)}>
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps({ className: 'dropzone_box' })}>
                                    <input {...getInputProps()} />
                                    <div className="wrap">
                                        <FaPlusCircle />
                                    </div>
                                </div>
                            )}
                        </Dropzone>
                        {this.showUploadedImages()}
                        {
                            this.state.uploading ?
                                <div className="dropzone_box text-center pt-5 ">
                                    <CircularProgress style={{ color: "var(--primaryColor)", marginTop:"15px" }} thickness={3} />
                                </div>
                                : null
                        }
                    </div>
                </section>
            </div>
        );
    }
}

export default FileUpload;
