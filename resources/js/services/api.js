import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000' // Laravel backend
axios.defaults.withCredentials = true           // BẮT BUỘC nếu dùng Sanctum (cookie)
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

export default axios
