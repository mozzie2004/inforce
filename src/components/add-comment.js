import React, { useState } from 'react';
import { addComment } from '../services/firebaseService';
import { connect } from 'react-redux';
import { commentsLoaded } from '../actions';
import { Modal, Button, Form, ButtonGroup, Spinner } from 'react-bootstrap';

const AddComment = ({show, handleClose, commentsLoaded, id}) => {

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const [data, setData] = useState({
        date: Date.now(),
        description: '',
        productId: id
    });

    const {description} = data;

    const onChange = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })

    }

    const onSubmit = (e) => {
        e.preventDefault();
        setButtonDisabled(true);

        addComment(commentsLoaded, data, setButtonDisabled, handleClose);
        setData((data)=>{
            return {
                ...data,
                description: ''
            }
        })

    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add new comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Control className="mb-2" placeholder="Some text" onChange={onChange} name="description" type="text" as="textarea" value={description} />
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

export default connect(mapStateToProps, {commentsLoaded})(AddComment);