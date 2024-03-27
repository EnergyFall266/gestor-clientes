import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  

async getData() {
  const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://localhost:3000/dados-clientes',
  headers: { }
};

try {
  const response = await axios.request(config);

  return response.data;
} catch (error: any) {
  console.error(error);

}
}

async sendFile(file: any) {
  const axios = require('axios');
  const FormData = require('form-data');

  let data = new FormData();
  console.log(file);
  
  data.append('planilha', file);

try {
  const response = axios.post('http://localhost:3000/upload', data)
  
    console.log('Resposta da API:', response);
    return response;
  }
  catch(error: any)  {
    console.error('Erro ao enviar arquivo:', error);
  };

}
}


