
import React, { Component } from 'react'

import Stars from './Stars'

import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import CardColumns from "react-bootstrap/CardColumns"
import Card from "react-bootstrap/Card"

export default class ReviewCards extends Component {

    state = {
        posts: []
    }

    componentDidMount = () => {
        this.getReviewPost(this.props.productId)
    }

    getReviewPost = (x) => {
        axios.get('/getReview/' + x).then((res) => {
            console.log(res.data)
            const data = res.data
            this.setState({ posts: data })
        }).catch((err) => {
            console.log(err)
        })
    }

    displayReviewPost = (posts) => {
        if (!posts.length) return <h2>No Reviews ... Be the First!</h2>

        return posts.map((r, index) => (
            <Col key={index} xs={6} md={4} style={{marginTop: "20px"}}>
                <Card>
                    <Card.Header>
                        <div className="row">
                            <Stars
                                rating={r.stars}
                                newReview={false}
                            />
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                            {r.reviewHeader}
                        </Card.Title>
                        <Card.Text>
                            {r.reviewBody}
                        </Card.Text>
                        <footer className="blockquote-footer">
                            <cite title="Source Title">{r.reviewUser}</cite>
                        </footer>
                    </Card.Body>
                </Card>
            </Col>
        ))
    }

    render() {
        return (
            <>
                <Container>
                    <Row>
                        {this.displayReviewPost(this.state.posts)}
                    </Row>
                </Container>
            </>
        )
    }
}
