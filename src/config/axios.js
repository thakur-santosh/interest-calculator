import Axios from 'axios'

const axios = Axios.create({
    baseURL : 'https://ftl-frontend-test.herokuapp.com'
})

export default axios