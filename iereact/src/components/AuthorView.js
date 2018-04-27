import React, { Component } from 'react';
import {Table,Image, ListGroup, ListGroupItem} from 'react-bootstrap';
import requestJSON from '../services/requestJSON';

export default class AuthorView extends Component {

    constructor(props){
        super(props);
        this.state={
            author:this.props.author,
            books:[]
        };
        this.setImageUrl=this.setImageUrl.bind(this);
        this.getBooks=this.getBooks.bind(this);
        this.getBooks();
        this.getProperImage=this.getProperImage.bind(this);
        this.renderBooks=this.renderBooks.bind(this);

    }
    setImageUrl(url){
        this.setState({imageURL:url});
    }

    getProperImage(){
        if (this.state.author.imageURL)
            return <Image src={this.state.author.imageURL} style={{height:'240px'}}/>;
        else
            return <Image src={require('../images/noimage.png')} style={{height:'240px'}}/>;

    }
    getBooks(){
        let books=[];
        let processed=0;
        this.state.author.books.forEach((book,index)=>{
            requestJSON('/books/'+book.toString()+'?token='+this.props.credentials.token)
                .then((response)=>{return response.json()})
                .then((data)=>{
                    books.push(data);
                    processed++;
                    if (processed===this.state.author.books.length){
                        this.setState({books:books});
                    }
                })
        });
    }
    renderBooks(){
        return this.state.books.map((book,index)=>{
            return(
                <tr key={index}>
                    <td>
                        {book.title}
                    </td>
                </tr>
            )
        });
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
                                    First Name: {this.state.author.first_name}
                                </ListGroupItem>
                                <ListGroupItem>
                                    Last Name: {this.state.author.last_name}
                                </ListGroupItem>
                                <ListGroupItem >
                                    Books:
                                    <Table condensed bordered>
                                        <tbody>
                                        {this.renderBooks()}
                                        </tbody>
                                    </Table>
                                </ListGroupItem>
                                <ListGroupItem>
                                    Date of birth: {new Date(this.state.author.date_of_birth).toLocaleDateString()}
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