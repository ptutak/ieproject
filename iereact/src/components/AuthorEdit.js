import React, {Component} from 'react';
import UploadImage from "./UploadImage";
import {ListGroup, ListGroupItem, Image, Table, Button} from 'react-bootstrap';
import requestJSON from "../services/requestJSON";

export default class BookEdit extends Component{
    constructor(props){
        super(props);
        let date=new Date(this.props.author.date_of_birth);
        this.state={
            first_name:this.props.author.first_name,
            last_name:this.props.author.last_name,
            books:Array.from(this.props.author.books),
            date_of_birth:date.toISOString().slice(0,10),
            imageURL:this.props.author.imageURL,
            dateOfBirthState:null,
            firstNameState:null,
            lastNameState:null,
            allBooks:[]
        };
        this.setImageUrl=this.setImageUrl.bind(this);
        this.getAllBooks=this.getAllBooks.bind(this);
        this.getAllBooks();
        this.getOptions=this.getOptions.bind(this);
        this.handleDateOfBirthInput=this.handleDateOfBirthInput.bind(this);
        this.handleFirstNameInput=this.handleFirstNameInput.bind(this);
        this.handleLastNameInput=this.handleLastNameInput.bind(this);
        this.getProperImage=this.getProperImage.bind(this);
        this.handleBookSelect=this.handleBookSelect.bind(this);
        this.handleBookDelete=this.handleBookDelete.bind(this);
        this.handleBookAdd=this.handleBookAdd.bind(this);
        this.renderBookList=this.renderBookList.bind(this);
        this.renderBookAdd=this.renderBookAdd.bind(this);
    }

    setImageUrl(url){
        this.setState({imageURL:url});
        this.props.setNewAuthor({
            first_name:this.state.first_name,
            last_name:this.state.last_name,
            books:this.state.books,
            date_of_birth:this.state.date_of_birth,
            imageURL:url
        });
    }

    getProperImage(){
        if (this.state.imageURL===null)
            return <Image src={require('../images/noimage.png')} style={{height:'240px'}}/>;
        else
            return <Image src={this.state.imageURL} style={{height:'240px'}}/>;
    }

    handleBookSelect(index){
        return (event)=>{
            let books=this.state.books;
            books[index]=event.target.value;
            this.setState({books:books});
            this.props.setNewAuthor({
                first_name:this.state.first_name,
                last_name:this.state.last_name,
                books:books,
                date_of_birth:this.state.date_of_birth,
                imageURL:this.state.imageURL
            });
            event.preventDefault();
        };
    }

    handleBookDelete(index){
        return (event)=>{
            let books=this.state.books;
            books.splice(index,1);
            this.setState({books:books});
            this.props.setNewAuthor({
                first_name:this.state.first_name,
                last_name:this.state.last_name,
                books:books,
                date_of_birth:this.state.date_of_birth,
                imageURL:this.state.imageURL
            });
            event.preventDefault();
        }
    }

    handleBookAdd(event){
        let books=this.state.books;
        if (this.state.allBooks.length>0) {
            books.push(this.state.allBooks[0].id);
            this.setState({books: books});
            this.props.setNewAuthor({
                first_name: this.state.first_name,
                last_name:this.state.last_name,
                books: books,
                date_of_birth: this.state.date_of_birth,
                imageURL: this.state.imageURL
            });
        }
        else {
            alert('There are no books in database.');
        }
        event.preventDefault();
    }


    getAllBooks(){
        requestJSON('/books/?token='+this.props.credentials.token)
            .then((response)=>{return response.json()})
            .then((data)=>{this.setState({allBooks:data})})
    }

    getOptions(){
        return (
            this.state.allBooks.map((book, i)=>{
                return <option value={book.id} key={i}>{book.title}</option>
            })
        )
    }


    handleFirstNameInput(event){
        this.setState({first_name:event.target.value});
        if (event.target.value!=='') {
            this.setState({firstNameState: null});
            this.props.setNewAuthor({
                first_name:event.target.value,
                last_name:this.state.last_name,
                books:this.state.books,
                date_of_birth:new Date(this.state.date_of_birth.toString()),
                imageURL:this.state.imageURL
            });
        }
        else
            this.setState({firstNameState:'danger'});
        event.preventDefault();
    }

    handleLastNameInput(event){
        this.setState({last_name:event.target.value});
        if (event.target.value!=='') {
            this.setState({firstNameState: null});
            this.props.setNewAuthor({
                first_name:this.state.first_name,
                last_name:event.target.value,
                books:this.state.books,
                date_of_birth:this.state.date_of_birth,
                imageURL:this.state.imageURL
            });
        }
        else
            this.setState({firstNameState:'danger'});
        event.preventDefault();
    }


    handleDateOfBirthInput(event){
        this.setState({date_of_birth:event.target.value});
        this.props.setNewAuthor({
                first_name: this.state.first_name,
                last_name:this.state.last_name,
                books: this.state.books,
                date_of_birth: event.target.value,
                imageURL: this.state.imageURL
            });
        event.preventDefault();
    }

    renderBookAdd(){
        return(
            <tr>
                <td>
                    <Button onClick={this.handleBookAdd}>Add New Book</Button>
                </td>
            </tr>
        )
    }

    renderBookList(){
        return this.state.books.map((author,index)=>{
            return (
                <tr key={index}>
                    <td>
                        <select onChange={this.handleBookSelect(index)} value={this.state.books[index]}>{this.getOptions()}</select>
                    </td>
                    <td>
                        <Button onClick={this.handleBookDelete(index)}>Delete</Button>
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
                                <ListGroupItem bsStyle={this.state.firstNameState}>
                                    First Name:<input type="text" onChange={this.handleFirstNameInput} value={this.state.first_name}/>
                                </ListGroupItem>
                                <ListGroupItem bsStyle={this.state.lastNameState}>
                                    Last Name:<input type="text" onChange={this.handleLastNameInput} value={this.state.last_name}/>
                                </ListGroupItem>
                                <ListGroupItem>
                                    Books:
                                    <Table striped bordered condensed>
                                        <tbody>
                                        {this.renderBookList()}
                                        {this.renderBookAdd()}
                                        </tbody>
                                    </Table>
                                </ListGroupItem>
                                <ListGroupItem bsStyle={this.state.dateOfBirthState}>
                                    Date of birth:<input type="date" value={this.state.date_of_birth} onChange={this.handleDateOfBirthInput}/>
                                </ListGroupItem>
                                <ListGroupItem>
                                    Upload author foto:
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



