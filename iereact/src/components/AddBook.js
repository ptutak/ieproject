import React, {Component} from 'react';
import UploadImage from "./UploadImage";
import {ListGroup, ListGroupItem, Image, Table, Button} from 'react-bootstrap';

export default class AddBook extends Component{
    constructor(props){
        super(props);
        this.state={title :'',author:'',year:null, imageURL:require('../images/noimage.png'),authors:[''],yearState:null, titleState:null};
        this.getImageUrl=this.getImageUrl.bind(this);
        this.getAuthors=this.getAuthors.bind(this);
        this.getAuthors();
        this.getOptions=this.getOptions.bind(this);
        this.handleYearInput=this.handleYearInput.bind(this);
        this.handleAuthorSelect=this.handleAuthorSelect.bind(this);
        this.handleTitleInput=this.handleTitleInput.bind(this);
        this.handleAddBook=this.handleAddBook.bind(this);
        this.getProperImage=this.getProperImage.bind(this);
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
        if (event.target.value!=='')
            this.setState({titleState:null});
        else
            this.setState({titleState:'danger'});
        event.preventDefault();
    }


    handleYearInput(event){
        let year=parseInt(event.target.value,10);
        this.setState({year:year});
        if (year>0 && year<2019)
            this.setState({yearState:null});
        else
            this.setState({yearState:'danger'});
        event.preventDefault();
    }


    handleAddBook(event){
        if (this.state.title!=='' && this.state.year>0 && this.state.year<2019){
            alert("All OK!!! ;)");
        }
        else{
            if (this.state.title==='') {
                this.setState({titleState: 'danger'});
            }
            if (this.state.year<=0 || this.state.year>=2019){
                this.setState({yearState:'danger'});
            }

        }
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
                                Author:<select onChange={this.handleAuthorSelect} value={this.state.author}>{this.getOptions()}</select>
                            </ListGroupItem>
                            <ListGroupItem bsStyle={this.state.yearState}>
                                Year:<input type="text" onChange={this.handleYearInput} />
                            </ListGroupItem>
                            <ListGroupItem>
                                Upload book image:
                                <UploadImage ret={this.getImageUrl}/>
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



