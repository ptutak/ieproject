import React, { Component } from 'react';
import {Table,Image, ListGroup, ListGroupItem} from 'react-bootstrap';

class Book extends Component {

    constructor(props){
        super(props);
        this.state={imageURL:null,};
    }
    getImageUrl(url){
        this.setState({imageURL:url});
    }

    getProperImage(){
        if (this.state.imageURL===null)
            return <Image src={require('../images/noimage.png')} style={{height:'240px'}}/>;
        else
            return <Image src={this.state.imageURL} style={{height:'240px'}}/>;
    }
    render() {
        return (
            <div>
                <Table striped bordered condensed hover>
                    <tbody>
                    <tr>
                        <td>
                            <img src={this.props.image} alt={this.state.altText} />
                        </td>
                        <td>
                            Jakiś tekst
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </div>

        )
    }

}

export default Book;