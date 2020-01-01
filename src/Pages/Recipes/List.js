import React, { useState } from 'react'
import { Row, Col, Container, Card, Table, Button, Modal, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { addRecipe, editRecipe, removeRecipe } from '../../Action/Recipe'
function List (props) {
  const [show, setShow] = useState(false)
  const [id, setId] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
    setName('')
    setId(null)
    setDescription('')
    setCategory('')
  }
  const handleSave = () => {
    if (typeof (category) === 'undefined' || category === '') return alert('Choose Category')
    if (id == null) {
      props.addRecipe(name, description, category)
    } else {
      props.editRecipe(id, name, description, category)
    }
    setName('')
    setShow(false)
  }
  const handleEdit = (id) => {
    setShow(true)
    setId(id)
    let f = props.recipes.findIndex(v => v._id === id)
    console.log(props.recipes[f])
    setName(props.recipes[f].name)
    setDescription(props.recipes[f].description)
    setCategory(props.recipes[f].category)
  }
  const handleRemove = (id) => {
    props.removeRecipe(id)
  }
  return (<Container style={{ paddingTop: '40px' }} fluid>
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add/Edit Recipe</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='formCategory'>
            <Form.Label>Recipe Name</Form.Label>
            <Form.Control type='text' placeholder='Enter name' value={name} onChange={e => setName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId='exampleForm.ControlTextarea1'>
            <Form.Label>Recipe Description</Form.Label>
            <Form.Control as='textarea' rows='3' value={description} onChange={e => setDescription(e.target.value)} />
          </Form.Group>
          <Form.Group controlId='exampleForm.ControlSelect1'>
            <Form.Label>Recipe Category</Form.Label>
            <Form.Control as='select' value={category} onChange={e => setCategory(e.target.value)}>
              <option value=''>Choose Category</option>
              {props.categories.map(v => {
                return (<option value={v._id}>{v.name}</option>)
              })}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
            Close
        </Button>
        <Button variant='primary' onClick={handleSave}>
            Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    <Row>
      <Col>
        <h4>Recipe</h4>
        <Card>
          <Card.Body>
            <Button onClick={handleShow}>Add Recipe</Button>
            <br />
            <br />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {props.recipes.map(v => {
                  return (<tr>
                    <td>{v.name}</td>
                    <td><Button onClick={() => { handleEdit(v._id) }} variant='success' size='sm'>Edit</Button>
                      <Button onClick={() => { handleRemove(v._id) }} variant='danger' size='sm'>Remove</Button>
                    </td>
                  </tr>)
                })}
              </tbody>
            </Table>
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
    addRecipe: (name, description, category) => {
      dispatch(addRecipe(name, description, category))
    },
    editRecipe: (id, name, description, category) => {
      dispatch(editRecipe(id, name, description, category))
    },
    removeRecipe: (id) => {
      dispatch(removeRecipe(id))
    }
  }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(List)
