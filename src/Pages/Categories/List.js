import React, { useState } from 'react'
import { Row, Col, Container, Card, Table, Button, Modal, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { addCategory, editCategory, removeCategory } from '../../Action/Category'
function List (props) {
  const [show, setShow] = useState(false)
  const [id, setId] = useState(null)
  const [name, setName] = useState('')
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleSave = () => {
    if (id == null) {
      props.addCategory(name)
    } else {
      props.editCategory(id, name)
    }
    setName('')
    setShow(false)
  }
  const handleEdit = (id) => {
    setShow(true)
    setId(id)
    let f = props.categories.findIndex(v => v._id === id)
    setName(props.categories[f].name)
  }
  const handleRemove = (id) => {
    props.removeCategory(id)
  }
  return (<Container style={{ paddingTop: '40px' }} fluid>
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add/Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='formCategory'>
            <Form.Label>Category Name</Form.Label>
            <Form.Control type='text' placeholder='Enter name' value={name} onChange={e => setName(e.target.value)} />
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
        <h4>Category</h4>
        <Card>
          <Card.Body>
            <Button onClick={handleShow}>Add Category</Button>
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
                {props.categories.map(v => {
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
    categories: state.category.categories
  }
}
const mapDispatchtoProps = (dispatch) => {
  return {
    addCategory: (name) => {
      dispatch(addCategory(name))
    },
    editCategory: (id, name) => {
      dispatch(editCategory(id, name))
    },
    removeCategory: (id) => {
      dispatch(removeCategory(id))
    }
  }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(List)
