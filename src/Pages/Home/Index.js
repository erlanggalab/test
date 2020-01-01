import React, { useState } from 'react'
import { Row, Col, Container, Card, Button, Modal, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
function Index (props) {
  const [category, setCategory] = useState({})
  const [show, setShow] = useState(null)
  const handleShow = (detail) => {
    console.log(detail)
    setShow(detail.description)
  }
  const handleClose = () => {
    setShow(null)
  }
  const showRecipes = () => {
    console.log(category)
    return props.recipes.map(v => {
      console.log(category[v.category])
      if (category[v.category] === true) {
        return (<div>
          <h1>{v.name}</h1>
          <Button className='float-right' onClick={() => { handleShow(v) }}>View</Button>
          <br />
          <br />
          <hr />
        </div>)
      }
    })
  }
  if (Object.keys(category).length !== props.categories.length) {
    let w = {}
    props.categories.forEach(v => {
      w[v._id] = false
    })
    setCategory(w)
    console.log(category)
  }
  const showCategory = () => props.categories.map((v) => {
    return <div>
      <Form.Check
        type='checkbox'
        id={parseInt(v._id)}
        checked={category[v.id]}
        onChange={(y) => {
          let cat = { ...category, [v._id]: !category[v._id] }
          setCategory(cat)
        }}
        label={v.name}
      />
    </div>
  })
  return (
    <Container style={{ paddingTop: '40px' }} fluid>
      <Modal show={(show != null)} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add/Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{show}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <Col xs={4}>
          <Card>
            <Card.Body>
              <center><h4>Category</h4></center>
              <hr />
              {showCategory()}
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <center><h4>Recipe</h4></center>
              <hr />
              {showRecipes()}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>)
}
const mapStatetoProps = (state) => {
  return {
    recipes: state.recipe.recipes,
    categories: state.category.categories
  }
}
const mapDispatchtoProps = (dispatch) => {
  return {

  }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(Index)
