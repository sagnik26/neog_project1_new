import axios from "axios";

const loginApi = (params, cb) => {
    const {email, password} = params

    const details = {
        email: email,
        password: password
    }

    try {
        axios.post('/api/auth/login', JSON.stringify(details))
        .then(res => res.data)
        .then(val => {
            console.log('Token -> ',val);  
            cb(val)
            localStorage.setItem('encodedToken', val.encodedToken)
            localStorage.setItem('name', val.foundUser.firstName + " " + val.foundUser.lastName)
        })
        .catch(err => {
            cb(err.response.data.errors[0])
        })
    }
    catch(error) {
        console.log('err_msg: ', error.message)
    }
}

export {loginApi}
