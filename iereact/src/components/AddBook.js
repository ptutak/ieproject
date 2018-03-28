import React, {Component} from 'react';
import UploadImage from "./UploadImage";
import {ListGroup, ListGroupItem, Image, Table, Button, Thumbnail} from 'react-bootstrap';

export default class AddBook extends Component{
    constructor(props){
        super(props);
        this.state={title :'',author:'',year:null,imageURL:null,authors:['']};
        this.getImageUrl=this.getImageUrl.bind(this);
        this.getAuthors=this.getAuthors.bind(this);
        this.getAuthors();
        this.getOptions=this.getOptions.bind(this);
        this.checkYear=this.checkYear.bind(this);
        this.handleYearInput=this.handleYearInput.bind(this);
        this.handleAuthorSelect=this.handleAuthorSelect.bind(this);
        this.handleTitleInput=this.handleTitleInput.bind(this);
        this.handleAddBook=this.handleAddBook.bind(this);

    }

    getImageUrl(url){
        this.setState({imageURL:url});
    }

    getAuthors(){
        fetch('http://localhost:3001/authors/').then((response)=>{return response.json()})
            .then((data)=>{console.log(data); this.setState({authors:data, author:data[0]}) })
    }

    getOptions(){
        return (
            this.state.authors.map((author,i)=>{return <option value={author} key={i}>{author.first_name +' '+ author.last_name}</option>})
        )
    }

    handleAuthorSelect(event){
        this.setState({author:event.target.value});
        event.preventDefault();
    }

    handleTitleInput(event){
        this.setState({title:event.target.value});
        event.preventDefault();
    }


    checkYear(){
        return /^[012]?[0-9]{1,3}$/.test(this.state.year);
    }
    handleYearInput(event){
        this.setState({year:event.target.value});
        event.preventDefault();
    }


    handleAddBook(event){
        if (this.checkYear() && this.state.title!==''){
            alert('Good JOB, all data valid!');
        }
        else{
            alert('Wrong data!!!');
        }
    }



    render() {

        return (
            <div >
                <Table striped bordered condensed hover>
                <tbody>
                <tr>
                    <td style={{width:'50%'}}>
                        <ListGroup style={{ textAlign:'left'}}>
                            <ListGroupItem>
                                Title:<input type="text" onChange={this.handleTitleInput} value={this.state.title}/>
                            </ListGroupItem>
                            <ListGroupItem>
                                Author:<select onChange={this.handleAuthorSelect} value={this.state.author}>{this.getOptions()}</select>
                            </ListGroupItem>
                            <ListGroupItem>
                                Year:<input type="text" onChange={this.handleYearInput} />
                            </ListGroupItem>
                            <ListGroupItem>
                                Upload book image:
                                <UploadImage ret={this.getImageUrl}/>
                            </ListGroupItem>
                        </ListGroup>
                    </td>
                    <td>
                        <Image src={this.state.imageURL} style={{height:'240px'}}/>
                    </td>
                </tr>
                </tbody>
                </Table>
                <Button onClick={this.handleAddBook}>Add Book</Button>
            </div>
        );
    }
}



