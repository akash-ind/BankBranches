import React, { Component } from 'react';
import {Container, Form, Table} from 'react-bootstrap';


class Paginate extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            pageNo:[]
        }
    }
    componentDidMount()
    {
        let tempPageNo = [];
        for(let i = 1;i<Math.ceil(this.props.itemNo/this.props.pageSize);i++)
        {
            tempPageNo.push(i);
        }
        this.setState({
            pageNo:tempPageNo
        })
    }
    
    handleClick = event=>{
        const pageNo = event.target.getAttribute('id') 
        this.props.changePage(pageNo)
    }
    render()
    {
        return(
            <Table>
                <tbody>
                <tr>
                    {this.state.pageNo.map(page=>{
                        return <td id={page} onClick={this.handleClick}>{page}</td>
                    })}
                </tr>
                </tbody>
            </Table>
        )
    }
}

export default Paginate;