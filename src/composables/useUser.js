import { reactive, ref } from "vue";
import axios from 'axios'

let userData = reactive({
    id: '',
    name: '', 
    email: '',
    role: '',
    phone: '',
    gender: '',
    address: '',
    password: '',
    photo: ''
})

let getUserData = async() => {
    
    await axios.get('http://127.0.0.1:8000/api/get/user', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
    })
    
    .then(res => {
       userData.id = res.data.user.id 
       userData.name = res.data.user.name
       userData.email = res.data.user.email 
       userData.role = res.data.user.role
       userData.phone = res.data.user.phone 
       userData.gender = res.data.user.gender
       userData.address = res.data.user.address 
       userData.password = res.data.user.password 
       userData.photo = "http://127.0.0.1:8000/storage/"+ res.data.user.photo
    })

    .catch(err => {
        console.log(err.response.data.message);
    })
    
}


let useUser = () => {
    return {userData, getUserData}
}

export default useUser