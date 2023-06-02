import axios from "axios";

function getCartDataApi(cb) {
    try {
        axios.get('/api/user/cart', {
            "headers": {
                'authorization': localStorage.getItem('encodedToken')
            }
        })
        .then(res => cb(res.data.cart))
        .catch(err => cb([]))
    }
    catch(error) {
        cb([])
    }
}

function addToCartApi(params,cb) {
    const { _id, title, author, price, categoryName } = params

    const cart = {
        product: {
            _id: _id,
            title: title,
            author: author,
            price: price,
            categoryName: categoryName
        }
    }

    try {
        axios.post('/api/user/cart', JSON.stringify(cart), {
            "headers": {
                'authorization': localStorage.getItem('encodedToken')
            },
        })
        .then(res => cb(res))
        .catch(err => cb([]))
    }
    catch(error) {
       cb([])
    }
}

function deleteFromCartApi(param,cb) {
    let productId = param
    try {
        axios.delete('/api/user/cart/productId', {
            "headers": {
                'authorization': localStorage.getItem('encodedToken')
            }
        })
        .then(res => cb(res))
        .catch(err => cb(err))
    }
    catch(error) {
        cb(error)
    }
}


export {getCartDataApi, addToCartApi, deleteFromCartApi}