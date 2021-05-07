import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { productsLoaded, productsRequested } from '../actions';
import Header from '../components/header';
import CardGroupe from '../components/card-groupe';
import { getAllProducts } from '../services/firebaseService';
import { Container, Jumbotron } from 'react-bootstrap';
import ProductItem from './poduct-item';

function App({productsLoaded, productsRequested}) {

  useEffect(() => {
    
    getAllProducts(productsLoaded, productsRequested);
    
  }, [productsLoaded, productsRequested]);

  return (
    <> 
        <Header />
        <Jumbotron className="jambo">
            <Container>
            <Switch>
              <Route exact path="/">
                <CardGroupe />
              </Route>
              <Route path="/products/:id">
                <ProductItem />
              </Route>
            </Switch>                
            </Container>
        </Jumbotron>
    </>
   
  );
}



export default connect(null, {productsLoaded, productsRequested})(App);