import React, { useState } from 'react';
import { updateProduct } from '../services/firebaseService';
import { connect } from 'react-redux';
import { productsError, productsRequested, productsLoaded } from '../actions';
import { Modal, Button, Form, ButtonGroup, Spinner } from 'react-bootstrap';

const EditProduct = ({show, handleClose, productsError, products, productsLoaded, productsRequested, initialProduct, id}) => {

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const [data, setData] = useState(initialProduct);

    const {name, imageUrl, count, weight, size} = data;

    const onChange = (e) => {
        if (e.target.name === 'width' || e.target.name === 'height') {
            setData({
                ...data,
                size: {...data.size, [e.target.name] : e.target.value}
            }) 
        } else {
            setData({
                ...data,
                [e.target.name] : e.target.value
            })
        }
        
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setButtonDisabled(true);
        updateProduct(productsLoaded, productsRequested, data, setButtonDisabled, handleClose, id);

    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Control className="mb-2" placeholder="Img URL" onChange={onChange} name="imageUrl" type="text" value={imageUrl} />
                    <Form.Control required className="mb-2" placeholder="Name" onChange={onChange} name="name" type="text" value={name} />
                    <Form.Control required className="mb-2" placeholder="Count" onChange={onChange} name="count" type="number" value={count} />
                    <Form.Control required className="mb-2" placeholder="Weight" onChange={onChange} name="weight" type="text" value={weight} />
                    <Form.Control required className="mb-2" placeholder="Height" onChange={onChange} name="height" type="number" value={size.height} />
                    <Form.Control required className="mb-2" placeholder="Width" onChange={onChange} name="width" type="number" value={size.width} />
                    <ButtonGroup aria-label="Basic example">
                        <Button onClick={handleClose} type="button" className="mt-1" variant="secondary">No thanks!</Button>
                        <Button disabled={buttonDisabled} type="submit" className="mt-1" variant="dark">
                            Add  {buttonDisabled ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/> : ''} 
                        </Button>
                    </ButtonGroup>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

const mapStateToProps = ({products}) => {
    return {
        products
    }
}

export default connect(mapStateToProps, {productsError,  productsRequested, productsLoaded})(EditProduct);