const productsLoaded = (products)=>{
    return {
        type: 'PRODUCTS-LOADED',
        payload: products
    }
}

const productsRequested = ()=>{
    return {
        type: 'PRODUCTS-REQUESTED'
    }
}

const productsError = ()=>{
    return {
        type: 'PRODUCTS-ERROR'
    }
}

const commentsLoaded = (comments) => {
    return {
        type: 'COMMENTS-LOADED',
        payload: comments
    }
}


export {productsLoaded, productsRequested, productsError, commentsLoaded}