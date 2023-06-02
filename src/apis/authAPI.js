import axios from "axios";

const loginApi = (params) => {
    const {email, password} = params

    const details = {
        email: email,
        password: password
    }

    try {
        axios.post('/api/auth/login', JSON.stringify(details))
        .then(res => res.data)
        .then(val => {
            console.log('Token -> ',val.encodedToken);  
            localStorage.setItem('encodedToken', val.encodedToken)
        })
    }
    catch(error) {
        console.log(error.message)
    }
}

export {loginApi}
