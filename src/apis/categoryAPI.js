import axios from "axios";

function getAllCategoriesAPI(cb) {
    try {
        axios.get('/api/categories')
        .then(res => cb( res.data.categories))
        .catch(err => cb([]))
    }
    catch(error) {
        cb([])
    }
}

export {getAllCategoriesAPI}