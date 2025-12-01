import axios from 'axios';

const clienteAxios = axios.create({
    // FORZAMOS la IP Pública de AWS directamente aquí
    // Esto garantiza que React no intente conectarse a localhost nunca más.
    baseURL: 'http://34.239.245.32:8080/api' 
});

export default clienteAxios;