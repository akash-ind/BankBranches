import './css/App.css';
import React, { Component } from 'react';
import {Container, Row, Col, Form} from 'react-bootstrap';
import Bank from './component/bank';
import Cache from 'react-api-cache';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import BankDetail from './component/bankdetail';


class City extends Component{


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
  render()
  {
      return(
        <Cache>
          {({store, actions})=>(
            <Router basename={process.env.PUBLIC_URL}>
              <Switch>
                <Route exact path="/">
                <Container>
                  <h3>Bank List</h3>
                  <Row className="justify-content-between">
                    <Col xs={12} lg={4} className="mb-2">
                      <City city={this.state.city} changeCity={this.changeCity} />
                    </Col>
                    <Col xs={12} lg={4} className = "mb-2">
                      <Search changeQuery={this.changeQuery} query={this.state.query}/>
                    </Col>
                  </Row>
                  <Row className>
                    <Bank city={this.state.city} query={this.state.query} cacheActions={actions}/>
                  </Row>
                </Container>
                </Route>
                <Route exact path="/bank/:id">
                  <Container>
                    <BankDetail />
                  </Container>
                </Route>
              </Switch>
            </Router>
            
          )}
        </Cache>
      )
  }
}


export default App;
