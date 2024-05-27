import axios from 'axios'

const $host = axios.create({
    baseURL: 'http://213.171.7.15:5000'
})

export {
    $host,
}
