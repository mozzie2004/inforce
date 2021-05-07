let initialState = {
    products: [],
    comments: [],
    loading: false,
    error: false
}

const reducer = (state=initialState, action) => {

    switch(action.type) {
        case 'PRODUCTS-LOADED':
            return {
                ...state,
                products: action.payload,
                loading: false,
                error: false
            }

        case 'PRODUCTS-REQUESTED':
            return {
                ...state,
                loading: true,
                error: false
            }

        case 'PRODUCTS-ERROR':
            return {
                ...state,
                loading: false,
                error: true
            }  
            
        case 'COMMENTS-LOADED':
            return {
                ...state,
                comments: action.payload,
            }
   

        default: 
            return {
                ...state
            }
    }

}

export default reducer;