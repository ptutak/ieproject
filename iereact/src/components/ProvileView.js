import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import requestJSON from '../services/requestJSON';


export default class ProfileView extends Component{
    constructor(props){
        super(props);
        this.state={
            profile:this.props.profile
        }
    }

    render(){
        return(
            <div>
                <Table>
                    <tbody>
                    <tr>
                        <td>

                        </td>
                        <td>

                        </td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}