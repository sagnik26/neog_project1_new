import axios from "axios";

function getAllProductsAPI(cb) {
    try {
        axios.get('/api/products')
        .then(res => cb(res.data.products))
        .catch(err => cb([]))
    }
    catch(error) {
        cb([])
    }
}

export {getAllProductsAPI}