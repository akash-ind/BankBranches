import React, { Component } from 'react';
import { Container, Form, Table } from 'react-bootstrap';
import Paginate from './component/paginate';

class Bank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 10,
      offset:0,
      data: [],
      loading:false
    }
  }
  searchAndFill = query=>{
    //returns for the timing the all results on the page. 
    this.setState({loading:true})
    fetch(
    `http://127.0.0.1:8000/api/branches?limit=${this.state.pageSize}&offset=${this.state.offset}&q=${query}`
    )
    .then(res=>res.json())
    .then(data=>{
      this.setState({
        data:data.results,
        loading:false
      })
    })
  }
  searchCity = (pageSize)=>{
    // Returns the result fo the city
    fetch(
      `http://127.0.0.1:8000/api/branches/autocomplete?limit=${pageSize}&offset=${this.state.offset}&q=${this.props.city}`
    )
    .then(res=>res.json())
    .then(data=>{
      this.setState({data:data.results})
    })
  }
  changePageSize = e => {
    this.setState({
      pageSize: e.target.value
    })
    this.searchCity(this.state.pageSize)
  }

  changePageNo = pageNo => {
    this.setState({
      offset: pageNo-1
    })
    this.searchCity(this.state.pageSize);
  }

  componentDidMount() {
    
    this.searchCity(this.state.pageSize);
  }
  
  render() {
    let index = 1;
    const renderList = branch=>{
      let branchName = branch.branch.toLowerCase();
      let city = branch.city.toLowerCase();
      let branchState = branch.state.toLowerCase();
      let ifsc = branch.ifsc.toLowerCase();
      let address = branch.address.toLowerCase();
      let query = this.props.query.toLowerCase();
      let query_city = this.props.city.toLowerCase();
      if (city.indexOf(query_city) === -1 || (branchName.indexOf(query) === -1 &&
        city.indexOf(query) === -1 && branchState.indexOf(query) === -1
        && ifsc.indexOf(query) === -1 && address.indexOf(query) === -1)) {
        return null;
      }
      else{
        return (
        <tr key={branch.id}>
          <td>{index++}</td>
          <td>{branch.branch}</td>
          <td>{branch.city}</td>
          <td>{branch.state}</td>
          <td>{branch.ifsc}</td>
        </tr>)
      }
    }
    return (
      <Container>
        <Table responsive>
          <thead>
            <tr>
              <th>Sno.</th>
              <th>Branch</th>
              <th>City</th>
              <th>State</th>
              <th>IFSC</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(branch=>renderList(branch))}
          </tbody>
        </Table>
        <Form.Control 
          type='number' 
          onChange={this.changePageSize} 
          value={this.state.pageSize}>
        </Form.Control>
        <Paginate 
        changePage={this.changePageNo} 
        itemNo={this.state.filteredData.length} 
        pageSize={this.state.pageSize} 
        currentPageNo={this.state.offset+1} />
      </Container>
    )
  }
}


export default Bank;