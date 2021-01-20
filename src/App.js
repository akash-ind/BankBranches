import './App.css';
import React, { Component } from 'react';
import {Container, Form, Table} from 'react-bootstrap';
import Bank from './bank';
import BankSearch from './banksearch';


class City extends Component{
  constructor(props)
  {
    super(props);
  }

  changeCity = e=>{
    this.props.changeCity(e.target.value)
  }
  render()
  {
    return (
      <Form.Group controlId="exampleForm.SelectCustom">
        <Form.Control as="select" value = {this.props.city} onChange={this.changeCity} custom>
          <option value="">Select City</option>
          <option value="delhi">Delhi</option>
          <option value="bangalore">Bangalore</option>
          <option value="mumbai">Mumbai</option>
          <option value="chennai">Chennai</option>
          <option value="kolkata">Kolkata</option>
        </Form.Control>
      </Form.Group>
    )
  }
}


class Search extends Component{
  constructor(props)
  {
    super(props);
  }
  changeQuery = e=>{
    this.props.changeQuery(e.target.value)
  }
  render()
  {
    return(
      <Form.Control type='text' placeholder="Search" onChange={this.changeQuery} value={this.props.city}>
      </Form.Control>
    )
  }
}



class App extends Component{
  constructor()
  {
    super();
    this.state={
      city:"",
      query:"",
      data:null,
    }
    this.changeCity = this.changeCity.bind(this);
    this.changeQuery = this.changeQuery.bind(this);
  }

  changeCity(value)
  {
    this.setState({
      city:value
    })
  }
  changeQuery(value)
  {
    this.setState({
      query:value
    })
  }
  changeData = data=>{
    this.setState({
      data:data
    })
  }
  render()
  {
      return(
          <div>
            <BankSearch changeData={this.changeData}/>
            <City city={this.state.city} changeCity={this.changeCity} />
            <Search changeQuery={this.changeQuery} query={this.state.query}/>
            <Bank city={this.state.city} data={this.state.data} query={this.state.query}/>
          </div>
      )
    }
  }
}


export default App;
