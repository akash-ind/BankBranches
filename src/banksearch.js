import React, { Component } from 'react';
import {Form} from 'react-bootstrap';

class BankSearch extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            query:"", 
        }
        
    }

    changeData = ()=>{
        fetch(
            `http://127.0.0.1:8000/api/branches/autocomplete?limit=10000&offset=0&q=${this.state.query}`
          )
          .then(res=>res.json())
          .then(data=>{
            console.log(data)
            this.props.changeData(data.results)
          })
    }
    handleKey = event=>{
        if(event.key === 'Enter')
        {
            this.changeData()
        }
        else{
            this.setState({
                query:event.target.value
            })
        }
    }
    render()
    {
        return(
            <Form.Control type="text" placeholder="Search" onKeyPress={this.handleKey} />
        )
    }
}

export default BankSearch;