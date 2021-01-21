import React, { Component } from 'react';
import {Container, Form, Table} from 'react-bootstrap';


class Paginate extends Component{
    constructor(props)
    {
        super(props);
    }
    
    
    handleClick = event=>{
        const pageNo = event.target.getAttribute('data-value') 
        this.props.changePage(pageNo)
    }
    render()
    {
        let tempPageNo = [];
        let pages = Math.ceil(this.props.itemNo/this.props.pageSize)
        let currentPage = this.props.currentPageNo;
        let limit = 11;
        let lastEntered=1;
        if(currentPage-3>1)
        {
            tempPageNo.push(<td key={1} data-value={1} onClick={this.handleClick}>{1}</td>)
            limit--;
            lastEntered = 1;
        }
        if(currentPage-3>2)
        {
            tempPageNo.push(<td key="n1">...</td>)
            limit--;
        }
        for(let i = Math.max(1, currentPage-3);i<=currentPage;i++)
        {
            limit--;
            tempPageNo.push(<td key={i} data-value={i} onClick={this.handleClick}>{i}</td>);
            lastEntered = i;
        }
        for(let i = currentPage+1;i<=Math.min(pages, currentPage+limit-2);i++)
        {
            limit--;
            tempPageNo.push(<td key={i} data-value={i} onClick={this.handleClick}>{i}</td>);
            lastEntered = i;
        }
        if(lastEntered<pages-1)
            tempPageNo.push(<td key="n2">...</td>)
        if(lastEntered<pages)
            tempPageNo.push(<td key={pages} data-value={pages} onClick={this.handleClick}>{pages}</td>)
        return(
            <Table>
                <tbody>
                <tr>
                    {tempPageNo}
                </tr>
                </tbody>
            </Table>
        )
    }
}

export default Paginate;