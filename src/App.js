import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Home from './Pages/Home/Index'
import RecipeList from './Pages/Recipes/List'
import CategoryList from './Pages/Categories/List'
import { Navbar, Nav } from 'react-bootstrap'
import { Provider } from 'react-redux'
import Store from './Store'

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};
Store.subscribe(() => {
  saveState(Store.getState())
})

function App () {
  return (
    <Provider store={Store}>
      <Router>
        <div>
          <Navbar bg='light' expand='lg'>
            <Navbar.Brand href='/'>Rocipe</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='mr-auto'>
                <Nav.Link href='/category'>Category</Nav.Link>
                <Nav.Link href='/recipe'>Recipe</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            <Route path='/recipe'>
              <RecipeList />
            </Route>
            <Route path='/category'>
              <CategoryList />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default App
