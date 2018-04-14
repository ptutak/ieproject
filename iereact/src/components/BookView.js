import React, { Component } from 'react';
import {Table,Image, ListGroup, ListGroupItem} from 'react-bootstrap';
import requestJSON from '../services/requestJSON';

export default class BookView extends Component {

    constructor(props){
        super(props);
        this.state={
            book:this.props.book,
            authors:[]
        };
        this.setImageUrl=this.setImageUrl.bind(this);
        this.getProperImage=this.getProperImage.bind(this);
        this.getAuthors=this.getAuthors.bind(this);
        this.getAuthors();
        this.renderAuthors=this.renderAuthors.bind(this);
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
    getAuthors(){
        let authors=[];
        let processed=0;
        this.state.book.authors.forEach((author,index)=>{
            requestJSON('/authors/'+author.toString())
                .then((response)=>{return response.json()})
                .then((data)=>{
                    authors.push(data);
                    processed++;
                    if (processed===this.state.book.authors.length){
                        this.setState({authors:authors});
                    }
                })
        });


    }
    renderAuthors(){
        return this.state.authors.map((author,index)=>{
            return(
                <tr key={index}>
                    <td>
                        {author.first_name + ' '+author.last_name}
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
                                    Title: {this.state.book.title}
                                </ListGroupItem>
                                <ListGroupItem >
                                    Authors:
                                    <Table condensed bordered>
                                        <tbody>
                                            {this.renderAuthors()}
                                        </tbody>
                                    </Table>
                                </ListGroupItem>
                                <ListGroupItem>
                                    Year: {new Date(this.state.book.year).getFullYear()}
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