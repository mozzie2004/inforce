import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Spinner, Alert, Button } from 'react-bootstrap';
import { productsLoaded, productsRequested } from '../actions';
import { deleteProduct } from '../services/firebaseService';
import ErrorPage from './errorPage';
import CardItem from './card-item';
import Filter from './filter';

const CardGroupe = ({products, loading, error, productsLoaded, productsRequested}) => {

    const [alertShow, setAlertShow] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [filter, setFilter] = useState('Name');


    let sortedProducts = products.sort((a, b) => {
        if (a.name > b.name) {
            return 1;
        }

        if (a.name < b.name) {
            return -1;
        }

        return 0;
        
    });

    if(filter === "Count") {
        sortedProducts = products.sort((a, b) => +a.count - +b.count);
    }
    

    const onRemoveProduct = (id) => {
        setDeleteId(id);
        setAlertShow(true);
        window.scroll(0, 0);
    }

    const onRemoveProductPermanently = () => {

        deleteProduct(deleteId, productsLoaded, productsRequested);
        setAlertShow(false)
        setDeleteId('')

    }

    const sortBy = (name) => {
        setFilter(name)
    }

    const productsList = (
        sortedProducts.map( item => <CardItem 
        key={item.id}
        name={item.name} 
        imageUrl={item.imageUrl}
        count={item.count}
        weight={item.weight}
        id={item.id}
        onRemoveProduct={onRemoveProduct}
        />) 
        );

    const content = error ? <ErrorPage /> : productsList;

    return (
        <>
        <Filter sortBy={sortBy} filter={filter}/>
        <Alert show={alertShow} variant="danger">
            <Alert.Heading>Remove permanently 
                {
                  products.length && deleteId ? ` ${products.find(item=>item.id === deleteId).name}` : null
                }
            </Alert.Heading>
            <hr />
            <div className="d-flex justify-content-end">
                <Button onClick={()=>setAlertShow(false)} className="mr-2" variant="outline-danger">Cancel</Button>
                <Button onClick={onRemoveProductPermanently} variant="outline-danger">Remove</Button>
            </div>
        </Alert>
        <div className="d-flex flex-wrap justify-content-center">
           {
            loading ? <Spinner className="spin" animation="border" variant="secondary" /> : content 
           }
        </div>
        </>
        
    )
}

const mapStateToProps = ({products, loading, error}) => {
    return {
        products,
        loading,
        error
    }
}

export default connect(mapStateToProps, {productsLoaded, productsRequested})(CardGroupe);