import axios from "axios"

const url = 'http://10.2.2.2:4850'

export const createRoom = async (data, bearer) => {
    try {
        const response = await axios.post(`${url}/api/create-room`, data, {headers: {'Authorization': `Bearer ${bearer}`, 'Content-Type': 'application/json'}})
        console.log(response.data);

    } catch (error) {
        console.error(error.message);
    } finally {
        console.log('Всё');
    }
}