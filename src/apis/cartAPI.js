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
    const { _id, title, author, price, categoryName, stars, offer, image } = params

    const cart = {
        product: {
            _id: _id,
            title: title,
            author: author,
            price: price,
            categoryName: categoryName,
            stars: stars,
            offer: offer,
            image: image,
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

const deleteCartItem = async ({ productId, encodedToken }) => {
    return axios.delete(`/api/user/cart/${productId}`, {
      headers: {
        authorization: encodedToken,
      },
    });
  };


export {getCartDataApi, addToCartApi, deleteCartItem}
