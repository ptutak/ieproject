import React, {Component} from 'react';
import UploadImage from "./UploadImage";
import {ListGroup, ListGroupItem, Image, Table, Button} from 'react-bootstrap';
import requestJSON from '../services/requestJSON';

export default class AddAuthor extends Component{
    constructor(props){
        super(props);
        this.state={firstName :'',lastName:'',dateOfBirth:null, imageURL:null,firstNameState:null, lastNameState:null, dateState:null};
        this.setImageUrl=this.setImageUrl.bind(this);
        this.handleDateInput=this.handleDateInput.bind(this);
        this.handleFirstNameInput=this.handleFirstNameInput.bind(this);
        this.handleLastNameInput=this.handleLastNameInput.bind(this);
        this.handleAddAuthor=this.handleAddAuthor.bind(this);
        this.getProperImage=this.getProperImage.bind(this);
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
        this.setState({lastName:event.target.value});
        if (event.target.value!=='')
            this.setState({lastNameState:null});
        else
            this.setState({lastNameState:'danger'});
        event.preventDefault();

    }

    handleFirstNameInput(event){
        this.setState({firstName:event.target.value});
        if (event.target.value!=='')
            this.setState({firstNameState:null});
        else
            this.setState({firstNameState:'danger'});
        event.preventDefault();
    }


    handleDateInput(event){
        let date=new Date(event.target.value);
        this.setState({dateOfBirth:date});
        if (date){
            this.setState({dateState:null});
        }
        else {
            this.setState({dateState:'danger'});
        }
        event.preventDefault();
    }


    handleAddAuthor(event){
        if (this.state.firstName!=='' && this.state.lastName!=='' && this.state.dateOfBirth){
            requestJSON('/authors/','POST',JSON.stringify({
                first_name: this.state.firstName,
                last_name:this.state.lastName,
                date_of_birth: new Date(this.state.dateOfBirth.toString()),
                books:[],
                imageURL:this.state.imageURL
            })).then(this.props.changeMain('Authors'));
        }
        else{
            if (this.state.firstName==='') {
                this.setState({firstNameState: 'danger'});
            }

            if (this.state.lastName==='') {
                this.setState({lastNameState: 'danger'});
            }
            if (!this.state.dateOfBirth){
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
                                    First Name:<input type="text" onChange={this.handleFirstNameInput} value={this.state.firstName}/>
                                </ListGroupItem>
                                <ListGroupItem bsStyle={this.state.lastNameState}>
                                    Last Name:<input type="text" onChange={this.handleLastNameInput} value={this.state.lastName}/>
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



