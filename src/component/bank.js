import React, { Component } from 'react';
import { Container,Row, Col,  Form, Table, Button } from 'react-bootstrap';
import Paginate from './paginate';
import {MdFavorite} from 'react-icons/md';
import {ServerDomain} from '../globalInfo';
import "../css/bank.css";
import {
  withRouter,
  Link
} from 'react-router-dom';


class Bank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 10,
      offset:0,
      data: [],
      count:0,
      loading:false,
      favourite:false,
      favouriteChanged:false
    }
  }
  searchCity = (pageSize)=>{
    // Returns the result fo the city
    if(this.state.favourite)
    {
      return this.favouriteBanks()
    }
    this.setState({
      loading:true
    })
    const { hasCache, getCache } = this.props.cacheActions
    let url = `${ServerDomain}/api/branches/city?limit=${pageSize}&offset=${this.state.offset}&q=${this.props.city}`
    const params = {
      pageSize:this.state.pageSize,
      offset:this.state.offset,
      city:this.props.city,
    }
    if(hasCache(url, params) && !(this.state.favouriteChanged))
    {
      console.log("Cached data");
      this.setData(getCache(url, params).data)
    }
    else{
      fetch(
        url
      )
      .then(res=>{
        console.log(res);
        return res.json()})
      .then(data=>{
        console.log(data)
        this.setData(data);
        this.props.cacheActions.setCache(url, params, data);
      })
    }
  }

  setData = data=>{
    this.setState({
      data:data.results,
      loading:false,
      count:data.count
    })
  }

  changePageSize = e => {
    if(e.target.value != 0)
    {
      this.setState({
        pageSize: e.target.value
      })
      this.searchCity(e.target.value)
    }
  }

  changePageNo = pageNo => {
    this.setState({
      offset: pageNo-1
    }, ()=>this.searchCity(this.state.pageSize))
  }

  invertFavourite = e=>{
    let el = e.target.closest("[data-key]")
    let id = el.getAttribute('data-key');
    fetch(`${ServerDomain}/api/invert-favourite/?id=${id}`)
    .then(res=>res.json())
    .then(data=>console.log(data))
    if(el.getAttribute('class')==='favourite')
    {
      el.setAttribute('class', "");
    }
    else{
      el.setAttribute("class", "favourite");
    }
    this.setState({favouriteChanged:true})
  }

  favouriteBanks = e=>{
    this.setState({
       loading:true})
    fetch(`${ServerDomain}/api/get-favourite/?limit=${this.state.pageSize}&offset=${this.state.offset}`)
    .then(res=>res.json())
    .then(data=>{
      this.setState({
        data:data.results,
        count: data.count,
        favourite: true, 
        loading:false,
      })
    })
  }

  handleFavouriteClick= e=>{
    this.setState({
      offset:0
    }, ()=>this.favouriteBanks())
  }
  allBanks = e=>{
    this.setState({
      favourite:false,
      offset:0
    }, ()=>this.searchCity(this.state.pageSize))
  }

  componentDidUpdate(prev)
  {
    if (prev.city!==this.props.city && !this.state.favourite)
      this.searchCity(this.state.pageSize)  
  }
  componentDidMount() {
    this.searchCity(this.state.pageSize);
  }
  
  
  render() {
    let index = this.state.offset*this.state.pageSize+1;
    const renderList = branch=>{
      let branchName = branch.branch.toLowerCase();
      let city = branch.city.toLowerCase();
      let branchState = branch.state.toLowerCase();
      let ifsc = branch.ifsc.toLowerCase();
      let address = branch.address.toLowerCase();
      let query = this.props.query.toLowerCase();
      let queryCity = this.props.city.toLowerCase();
      if (city.indexOf(queryCity)===-1 ||(branchName.indexOf(query) === -1 &&
        city.indexOf(query) === -1 && branchState.indexOf(query) === -1
        && ifsc.indexOf(query) === -1 && address.indexOf(query) === -1)) {
        return null;
      }
      else{
        return (
        <tr key={branch.id}>
          <td>{index++}</td>
          <td><Link to={"bank/"+branch.id}>{branch.branch}</Link></td>
          <td>{branch.city}</td>
          <td>{branch.state}</td>
          <td>{branch.ifsc}</td>
          <td>{branch.favourite?<MdFavorite className="favourite scale" data-key={branch.id} onClick={this.invertFavourite}/>:
          <MdFavorite data-key={branch.id} className="scale" onClick={this.invertFavourite}/>}</td>
        </tr>)
      }
    }
    const {favourite} = this.state
    return (
      <Container>
        <Row className="mb-4">
          <Button variant= {favourite?"primary-outline":"primary"} onClick={this.allBanks}>All Banks</Button>
          <Button variant = {favourite?"primary":"primary-outline"} onClick={this.handleFavouriteClick}>Favourite Banks</Button>
        </Row>
        
        <Table responsive>
          <thead>
            <tr>
              <th>Sno.</th>
              <th>Branch</th>
              <th>City</th>
              <th>State</th>
              <th>IFSC</th>
              <th>Favourite</th>
            </tr>
          </thead>
          <tbody>
          {this.state.loading?
            <div className="set-height">Loading...</div>
            :this.state.data.map(branch=>renderList(branch))}
          </tbody>
      
        </Table>
        <Row className="mb-3">
          <Col xs={3} md={2} lg={1}>
          <Form.Control 
            type='number' 
            onChange={this.changePageSize} 
            value={this.state.pageSize}>
          </Form.Control>
          </Col>
        </Row>
        
        <Paginate 
        changePage={this.changePageNo} 
        itemNo={this.state.count} 
        pageSize={this.state.pageSize} 
        currentPageNo={this.state.offset+1} />
      </Container>
    )
  }
}


export default withRouter(Bank);