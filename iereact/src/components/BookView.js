import React, { Component } from 'react';
import {Table,Image, ListGroup, ListGroupItem} from 'react-bootstrap';

export default class BookView extends Component {

    constructor(props){
        super(props);
        this.state={
            book:this.props.book,
            author:null
        };
        this.setImageUrl=this.setImageUrl.bind(this);
        this.getProperImage=this.getProperImage.bind(this);
        this.getAuthor=this.getAuthor.bind(this);
        this.getAuthor();
        this.renderAuthor=this.renderAuthor.bind(this);
    }
    setImageUrl(url){
        this.setState({imageURL:url});
    }

    getProperImage(){
        if (this.state.book.imageURL)
            return <Image src={this.state.book.imageURL} style={{height:'240px'}}/>;
        else
            return <Image src={require('../images/noimage.png')} style={{height:'240px'}}/>;

    }
    getAuthor(){
        fetch('http://localhost:3001/authors/'+this.state.book.author[0]).then((response)=>{return response.json()}).then((data)=>{
            this.setState({author:data});
        })
    }
    renderAuthor(){
        if (this.state.author!==null)
            return (
                this.state.author.first_name+' '+this.state.author.last_name
            );
        return null;
    }
    render() {
        return (
            <div>
                <Table striped bordered condensed hover>
                    <tbody>
                    <tr>
                        <td style={{width:'50%'}}>
                            <ListGroup>
                                <ListGroupItem>
                                    Title:{this.state.book.title}
                                </ListGroupItem>
                                <ListGroupItem>
                                    Author:{this.renderAuthor()}
                                </ListGroupItem>
                                <ListGroupItem>
                                    Year:{new Date(this.state.book.year).getFullYear()}
                                </ListGroupItem>
                            </ListGroup>
                        </td>
                        <td>
                            {this.getProperImage()}
                        </td>
                    </tr>

                    </tbody>
                </Table>
            </div>

        )
    }

}