import React, {Component} from 'react';
import UploadImage from "./UploadImage";
import {ListGroup, ListGroupItem, Image, Table, Button} from 'react-bootstrap';

export default class BookEdit extends Component{
    constructor(props){
        super(props);
        this.state={
            title:this.props.book.title,
            authors:this.props.book.authors,
            year:new Date(this.props.book.year).getFullYear().toString(),
            imageURL:this.props.book.imageURL,
            yearState:null,
            titleState:null,
            allAuthors:[]
        };
        this.setImageUrl=this.setImageUrl.bind(this);
        this.getAuthors=this.getAuthors.bind(this);
        this.getAuthors();
        this.getOptions=this.getOptions.bind(this);
        this.handleYearInput=this.handleYearInput.bind(this);
        this.handleAuthorSelect=this.handleAuthorSelect.bind(this);
        this.handleTitleInput=this.handleTitleInput.bind(this);
        this.getProperImage=this.getProperImage.bind(this);
        this.handleAuthorDelete=this.handleAuthorDelete.bind(this);
        this.handleAuthorAdd=this.handleAuthorAdd.bind(this);
        this.renderAuthorsList=this.renderAuthorsList.bind(this);
        this.renderAuthorAdd=this.renderAuthorAdd.bind(this);
    }

    setImageUrl(url){
        this.setState({imageURL:url});
        this.props.setNewBook({
            title:this.state.title,
            authors:this.state.authors,
            year:new Date(this.state.year.toString()),
            imageURL:url
        });
    }

    getProperImage(){
        if (this.state.imageURL===null)
            return <Image src={require('../images/noimage.png')} style={{height:'240px'}}/>;
        else
            return <Image src={this.state.imageURL} style={{height:'240px'}}/>;
    }

    handleAuthorSelect(index){
        return (event)=>{
            let authors=this.state.authors;
            authors[index]=event.target.value;
            this.setState({authors:authors});
            this.props.setNewBook({
                title:this.state.title,
                authors:authors,
                year:new Date(this.state.year.toString()),
                imageURL:this.state.imageURL
            });
            event.preventDefault();
        };
    }

    handleAuthorDelete(index){
        return (event)=>{
            let authors=this.state.authors;
            authors.splice(index,1);
            this.setState({authors:authors});
            this.props.setNewBook({
                title:this.state.title,
                authors:authors,
                year:new Date(this.state.year.toString()),
                imageURL:this.state.imageURL
            });
            event.preventDefault();
        }
    }

    handleAuthorAdd(event){
        let authors=this.state.authors;
        authors.push(this.state.allAuthors[0].id);
        this.setState({authors:authors});
        this.props.setNewBook({
            title:this.state.title,
            authors:authors,
            year:new Date(this.state.year.toString()),
            imageURL:this.state.imageURL
        });
        event.preventDefault();
    }


    getAuthors(){
        fetch('http://localhost:3001/authors/')
            .then((response)=>{return response.json()})
            .then((data)=>{this.setState({allAuthors:data})})
    }

    getOptions(){
        return (
            this.state.allAuthors.map((author, i)=>{return <option value={author.id} key={i}>{author.first_name +' '+ author.last_name}</option>})
        )
    }


    handleTitleInput(event){
        this.setState({title:event.target.value});
        if (event.target.value!=='') {
            this.setState({titleState: null});
            this.props.setNewBook({
                title:event.target.value,
                authors:this.state.authors,
                year:new Date(this.state.year.toString()),
                imageURL:this.state.imageURL
            });
        }
        else
            this.setState({titleState:'danger'});
        event.preventDefault();
    }


    handleYearInput(event){
        let year=parseInt(event.target.value,10);
        if (!isNaN(year)){
            this.setState({year:year});
            if (year>0 && year<2019) {
                this.setState({yearState: null});
                this.props.setNewBook({
                    title: this.state.title,
                    authors: this.state.authors,
                    year: new Date(year.toString()),
                    imageURL: this.state.imageURL
                });
            }
            else
                this.setState({yearState: 'danger'});

        }
        else {
            this.setState({year:''});
            this.setState({yearState: 'danger'});
        }
        event.preventDefault();
    }

    renderAuthorAdd(){
        return(
            <tr>
                <td>
                    <Button onClick={this.handleAuthorAdd}>Add New Author</Button>
                </td>
            </tr>
        )
    }

    renderAuthorsList(){
        return this.state.authors.map((author,index)=>{
            return (
                <tr key={index}>
                    <td>
                        <select onChange={this.handleAuthorSelect(index)} value={this.state.authors[index]}>{this.getOptions()}</select>
                    </td>
                    <td>
                        <Button onClick={this.handleAuthorDelete(index)}>Delete</Button>
                    </td>
                </tr>
            )
        });
    }

    render() {
        return (
            <div >
                <Table striped bordered condensed hover>
                    <tbody>
                    <tr>
                        <td style={{width:'50%'}}>
                            <ListGroup style={{ textAlign:'left'}}>
                                <ListGroupItem bsStyle={this.state.titleState}>
                                    Title:<input type="text" onChange={this.handleTitleInput} value={this.state.title}/>
                                </ListGroupItem>
                                <ListGroupItem>
                                    Authors:
                                    <Table striped bordered condensed>
                                        <tbody>
                                        {this.renderAuthorsList()}
                                        {this.renderAuthorAdd()}
                                        </tbody>
                                    </Table>
                                </ListGroupItem>
                                <ListGroupItem bsStyle={this.state.yearState}>
                                    Year:<input type="text" value={this.state.year} onChange={this.handleYearInput}/>
                                </ListGroupItem>
                                <ListGroupItem>
                                    Upload book image:
                                    <UploadImage ret={this.setImageUrl}/>
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
        );
    }
}



