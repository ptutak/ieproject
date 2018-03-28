import React, {Component} from 'react';

export default class UploadImage extends Component{
    constructor(props) {
        super(props);

        this.state = {
            imageURL: '',
        };

        this.handleUploadImage = this.handleUploadImage.bind(this);
    }

    handleUploadImage(ev) {
        ev.preventDefault();

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);

        fetch('http://localhost:3001/imageupload', {
            method: 'POST',
            body: data,
        }).then((response) => {
            response.json().then((body) => {
                this.setState({ imageURL: `http://localhost:3001/images/${body.fileName}` });
                this.props.ret(this.state.imageURL);
            });
        });
    }

    render() {
        return (
            <div style={this.props.style}>
                <form onSubmit={this.handleUploadImage}>
                    <input ref={(inp) => { this.uploadInput = inp; }} type="file"/>
                    <input type='submit' value='Upload'/>
                </form>
            </div>
        );
    }
}



