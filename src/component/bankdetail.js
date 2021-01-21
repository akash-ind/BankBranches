import React, { Component } from 'react';
import {Container, Row, Col, Table} from 'react-bootstrap';
import {ServerDomain} from '../globalInfo'
import {MdFavorite} from 'react-icons/md';
import "../css/bank.css";
import {withRouter} from 'react-router-dom';

class BankDetail extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            loading:false,
            data:null
        }
    }
    componentDidMount()
    {
        this.setState({
            loading:true
        })
        const url = `${ServerDomain}/api/bank/${this.props.match.params.id}`
        fetch(url)
        .then(res=>res.json())
        .then(data=>this.setState({
            data:data,
            loading:false
        }))
    }
    render()
    {
        const data = this.state.data;
        if(this.state.loading || !data)
        {
            return(
                <Container>
                    Loading...
                </Container>
            )
        }
        return(

            <div>
                <Row className="justify-content-end">
                    <Col sm="auto">
                        {data.favorite?
                        <MdFavorite className="favourite scale" ></MdFavorite>:
                        <MdFavorite className="scale"></MdFavorite>}
                    </Col>
                </Row>
                <h3>{data.bank_id.name}</h3>
                <Table responsive>
                    <thead>
                        <tr>
                        <th>Branch</th>
                        <th>City</th>
                        <th>State</th>
                        <th>IFSC</th>
                        <th>Favourite</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{data.branch}</td>
                            <td>City: {data.city}</td>
                            <td>State: {data.state}</td>
                            <td>IFSC: {data.ifsc}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default withRouter(BankDetail);