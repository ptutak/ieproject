import React, {Component} from 'react';
import UploadImage from "./UploadImage";
import {ListGroup, ListGroupItem, Image, Table, Button} from 'react-bootstrap';
import requestJSON from '../services/requestJSON';

export default class AddBook extends Component{
    constructor(props){
        super(props);
        this.state={
            title :'',
            authors:[],
            year:'',
            imageURL:null,
            allAuthors:[],
            yearState:null,
            titleState:null
        };
        this.setImageUrl=this.setImageUrl.bind(this);
        this.getAllAuthors=this.getAllAuthors.bind(this);
        this.getAllAuthors();
        this.getOptions=this.getOptions.bind(this);
        this.handleYearInput=this.handleYearInput.bind(this);
        this.handleAuthorSelect=this.handleAuthorSelect.bind(this);
        this.handleTitleInput=this.handleTitleInput.bind(this);
        this.handleAddBook=this.handleAddBook.bind(this);
        this.handleAuthorDelete=this.handleAuthorDelete.bind(this);
        this.handleAuthorAdd=this.handleAuthorAdd.bind(this);
        this.getProperImage=this.getProperImage.bind(this);
        this.renderAuthorsList=this.renderAuthorsList.bind(this);
        this.renderAuthorAdd=this.renderAuthorAdd.bind(this);
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

    getAllAuthors(){
        fetch('http://localhost:3001/authors/').then((response)=>{return response.json()})
            .then((data)=>{
                if (data.length>0){
                    this.setState({allAuthors:data, authors:[data[0].id]})
                }
                else {
                    this.setState({authors:[]})
                }
            })
    }

    getOptions(){
        return (
            this.state.allAuthors.map((author, i)=>{
                return <option value={author.id} key={i}>{author.first_name +' '+ author.last_name}</option>}
                )
        )
    }

    handleAuthorSelect(index){
        return (event)=>{
            let authors=this.state.authors;
            authors[index]=event.target.value;
            this.setState({authors:authors});
            event.preventDefault();
        };
    }

    handleAuthorDelete(index){
        return (event)=>{
            let authors=this.state.authors;
            authors.splice(index,1);
            this.setState({authors:authors});
            event.preventDefault();
        }
    }

    handleAuthorAdd(event){
        if (this.state.allAuthors.length>0) {
            let authors = this.state.authors;
            authors.push(this.state.allAuthors[0].id);
            this.setState({authors: authors});
        }
        else {
            alert('There are no authors in database.');
        }
        event.preventDefault();
    }

    handleTitleInput(event){
        this.setState({title:event.target.value});
        if (event.target.value!=='')
            this.setState({titleState:null});
        else
            this.setState({titleState:'danger'});
        event.preventDefault();
    }


    handleYearInput(event){
        let year=parseInt(event.target.value,10);
        let thisYear=new Date().getFullYear();
        if (!isNaN(year)){
            this.setState({year:year});
            if (year>0 && year<=thisYear) {
                this.setState({yearState: null});
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


    handleAddBook(event){
        let set=new Set(this.state.authors);
        let thisYear=new Date().getFullYear();
        this.setState({authors:Array.from(set)},()=>{
            if (this.state.title!=='' && this.state.year>0 && this.state.year<=thisYear){
                requestJSON('/books/','POST',JSON.stringify({
                    title: this.state.title,
                    year: new Date(this.state.year.toString()),
                    authors:this.state.authors,
                    imageURL:this.state.imageURL
                }))
                    .then((response)=>{return response.json()})
                    .then((body)=>{
                        let bookid=body.id;
                        for(let author of this.state.authors){
                            requestJSON('/authors/add/book/' + author.toString()+'/'+bookid.toString());
                        }
                        this.props.changeMain('Books');
                    });
            }
            else{
                if (this.state.title==='') {
                    this.setState({titleState: 'danger'});
                }
                if (this.state.year<=0 || this.state.year>thisYear){
                    this.setState({yearState:'danger'});
                }
            }
        });
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
                    <td>
                        {this.getProperImage()}
                    </td>
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
                </tr>
                </tbody>
                </Table>
                <Button onClick={this.handleAddBook}>Add Book</Button>
            </div>
        );
    }
}



