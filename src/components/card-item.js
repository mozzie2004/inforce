import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


const CardItem = ({name, count, imageUrl, weight, id, onRemoveProduct}) => {

    const history = useHistory();



    return (
        <div className="d-flex">
            <Card className="mr-3 ml-3 mt-3" style={{ width: '18rem' }}>
                <Card.Img onClick={()=>history.push(`/products/${id}`)} style={{minHeight: '250px', cursor: 'pointer'}} variant="top" src={imageUrl} />
                <Card.Body className="body-card">
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{`В наявності ${count} шт`}</Card.Subtitle>
                    <Card.Text className="mb-5">{`Вага ${weight}`}</Card.Text>
                    <Button onClick={()=>onRemoveProduct(id)} className="w-100 button-card" variant="secondary">Delete</Button>
                </Card.Body>
            </Card>
        </div>
    )
}



export default CardItem;