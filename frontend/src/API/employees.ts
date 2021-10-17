import axios from 'axios'

const URL = '/api/employees'

export function getAllEmployees() {

    return axios.get(URL).then(res => res.data)

}

