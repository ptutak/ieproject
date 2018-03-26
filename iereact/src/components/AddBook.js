import React, {Component} from 'react';
import UploadImage from "./UploadImage";

export default class AddBook extends Component{
    constructor(props){
        super(props);
        this.state={imageURL:'null'};
        this.getImageUrl=this.getImageUrl.bind(this);
    }

    getImageUrl(url){
        this.setState({imageURL:url});
    }

    render() {
        return (
            <div>
                <div>
                    <UploadImage style={{width : '100px', margin : 'auto'}} ret={this.getImageUrl}/>
                </div>
                <h1>
                    {this.state.imageURL}
                </h1>

                <img src={this.state.imageURL} alt="img" />
            </div>
        );
    }
}



