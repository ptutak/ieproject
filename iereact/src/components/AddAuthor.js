import React, {Component} from 'react';
import UploadImage from "./UploadImage";
import {ListGroup, ListGroupItem, Image, Table, Button} from 'react-bootstrap';
import requestJSON from '../services/requestJSON';

export default class AddAuthor extends Component{
    constructor(props){
        super(props);
        this.state={first_name :'',last_name:'',date_of_birth:null, imageURL:null,firstNameState:null, lastNameState:null, dateState:null,books:[], allBooks:[]};
        this.setImageUrl=this.setImageUrl.bind(this);
        this.getAllBooks=this.getAllBooks.bind(this);
        this.getAllBooks();
        this.getOptions=this.getOptions.bind(this);
        this.handleDateInput=this.handleDateInput.bind(this);
        this.handleFirstNameInput=this.handleFirstNameInput.bind(this);
        this.handleLastNameInput=this.handleLastNameInput.bind(this);
        this.handleAddAuthor=this.handleAddAuthor.bind(this);
        this.getProperImage=this.getProperImage.bind(this);
        this.handleBookSelect=this.handleBookSelect.bind(this);
        this.handleBookDelete=this.handleBookDelete.bind(this);
        this.handleBookAdd=this.handleBookAdd.bind(this);
        this.renderBookList=this.renderBookList.bind(this);
        this.renderBookAdd=this.renderBookAdd.bind(this);

    }

    setImageUrl(url){
        this.setState({imageURL:url});
    }

    getProperImage(){
        if (this.state.imageURL===null)
            return <Image src={require('../images/noimage.png')} style={{height:'240px'}}/>;
        else
            return <Image src={this.state.imageURL} style={{height:'240px'}}/>;
    }


    handleLastNameInput(event){
        this.setState({last_name:event.target.value});
        if (event.target.value!=='')
            this.setState({lastNameState:null});
        else
            this.setState({lastNameState:'danger'});
        event.preventDefault();

    }

    handleFirstNameInput(event){
        this.setState({first_name:event.target.value});
        if (event.target.value!=='')
            this.setState({firstNameState:null});
        else
            this.setState({firstNameState:'danger'});
        event.preventDefault();
    }


    handleDateInput(event){
        let date=new Date(event.target.value);
        this.setState({date_of_birth:date});
        if (date){
            this.setState({dateState:null});
        }
        else {
            this.setState({dateState:'danger'});
        }
        event.preventDefault();
    }
    getAllBooks(){
        requestJSON('/books/?token='+this.props.credentials.token)
            .then((response)=>{return response.json()})
            .then((data)=>{
                if (data.length>0){
                    this.setState({allBooks:data, authors:[data[0].id]})
                }
                else {
                    this.setState({authors:[]})
                }
            })
    }

    getOptions(){
        return (
            this.state.allBooks.map((book, i)=>{
                return <option value={book.id} key={i}>{book.title}</option>
            })
        )
    }


    handleBookSelect(index){
        return (event)=>{
            let books=this.state.books;
            books[index]=event.target.value;
            this.setState({books:books});
            event.preventDefault();
        };
    }

    handleBookDelete(index){
        return (event)=>{
            let books=this.state.books;
            books.splice(index,1);
            this.setState({books:books});
            event.preventDefault();
        }
    }

    handleBookAdd(event){
        if (this.state.allBooks.length>0) {
            let books = this.state.books;
            books.push(this.state.allBooks[0].id);
            this.setState({books: books});
        }
        else {
            alert('There are no books in database.');
        }
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


    handleAddAuthor(event){
        if (this.state.first_name!=='' && this.state.last_name!=='' && this.state.date_of_birth){
            requestJSON('/authors/','POST',JSON.stringify({
                first_name: this.state.first_name,
                last_name:this.state.last_name,
                date_of_birth: new Date(this.state.date_of_birth.toString()),
                books:this.state.books,
                imageURL:this.state.imageURL,
                token:this.props.credentials.token
            }))
                .then((response)=>{return response.json()})
                .then((author)=>{
                    for (let book of this.state.books){
                        requestJSON('/books/add/author/'+book.toString()+'/'+author.id+'?token='+this.props.credentials.token);
                    }
                    this.props.changeMain('Authors');
                })
        }
        else{
            if (this.state.first_name==='') {
                this.setState({firstNameState: 'danger'});
            }

            if (this.state.last_name==='') {
                this.setState({lastNameState: 'danger'});
            }
            if (!this.state.date_of_birth){
                this.setState({dateState:'danger'});
            }
        }
        event.preventDefault();
    }


    render() {
        return (
            <div >
                <Table striped bordered condensed hover>
                    <tbody>
                    <tr>
                        <td>
                            {this.getProperImage()}
                        </td>
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
                                <ListGroupItem bsStyle={this.state.dateState}>
                                    Date:<input type="date" onChange={this.handleDateInput}/>
                                </ListGroupItem>
                                <ListGroupItem>
                                    Upload author image:
                                    <UploadImage ret={this.setImageUrl}/>
                                </ListGroupItem>
                            </ListGroup>
                        </td>
                    </tr>
                    </tbody>
                </Table>
                <Button onClick={this.handleAddAuthor}>Add Author</Button>
            </div>
        );
    }
}



