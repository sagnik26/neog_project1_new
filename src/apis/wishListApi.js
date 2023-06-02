import axios from "axios";

function getWishListApi(cb) {
    try {
        axios.get('/api/user/wishlist', {
            "headers": {
                'authorization': localStorage.getItem('encodedToken')
            }
        })
        .then(res => cb(res.data.wishlist))
        .catch(err => cb([]))
    }
    catch(error) {
        cb([])
    }
}

function addToWishListApi(params,cb) {
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
        axios.post('/api/user/wishlist', JSON.stringify(cart), {
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

function deleteFromWishListApi(param ,cb) {
    let productId = param
    try {
        axios.delete('/api/user/wishlist/productId', {
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


export {getWishListApi, addToWishListApi, deleteFromWishListApi}