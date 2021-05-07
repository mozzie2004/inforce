import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap';
import { commentsLoaded } from '../actions';
import { connect } from 'react-redux';
import { getAllComments } from '../services/firebaseService';
import EditProduct from './edit-product';
import AddComment from './add-comment';

const ProductItem = ({products, comments, commentsLoaded}) => {

    const [modalEditShow, setModalEditShow] = useState(false);
    const [modalAddShow, setModalAddShow] = useState(false);

    useEffect(()=>{
        getAllComments(commentsLoaded);
    }, [commentsLoaded])

    let {id} = useParams();

    const product = products.find(item => item.id === id);
    const curentComents = comments.filter(item=>item.productId === id);

    let content = products.length ? (
        <>
        <AddComment />
        <EditProduct show={modalEditShow} initialProduct={product} id={id} handleClose={()=>setModalEditShow(false) } />
        <AddComment show={modalAddShow} id={id} handleClose={()=>setModalAddShow(false) } />
        <h2 className='text-center'>{product.name}</h2>
        <div className='d-flex'>
        <Image className='w-50' src={product.imageUrl} fluid />
        <div className='w-50'>
            <p style={{fontSize: '26px'}} className='ml-5'>
             On the balance {product.count} 
            </p>
            <p style={{fontSize: '26px'}} className='ml-5'>
                Weight {product.weight}
            </p>
            <p style={{fontSize: '26px'}} className='ml-5'>
                Width {product.size.width}
            </p>
            <p style={{fontSize: '26px'}} className='ml-5'>
                Height {product.size.height}
            </p>
            <Button onClick={()=>setModalEditShow(true)} className='ml-2'>Edit Product</Button>
        </div>
        </div>
        <p className='text-center'>Comments:</p>
            { curentComents.length ? curentComents.map((item, i)=><p key={i}>{item.description}</p> ) : ''}
            <Button onClick={()=>setModalAddShow(true)} className='ml-2'>Add Comment</Button>
        
        </>
    ) : '';
    
    return content;
}

const mapStateToProps = ({products, comments}) => {
    return {
        products,
        comments
    }
}

export default connect(mapStateToProps, {commentsLoaded})(ProductItem);