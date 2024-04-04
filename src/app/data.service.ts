import { Injectable } from '@angular/core';
import { user } from '@seniorsistemas/senior-platform-data';
import { VP_BPM } from 'src/beans/VP_BPM';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  

async getData() {
  const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://demonstra.prismainformatica.com.br:3001/dados-clientes',
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
  const response = axios.post('https://demonstra.prismainformatica.com.br:3001/upload', data)
  
    console.log('Resposta da API:', response);
    return response;
  }
  catch(error: any)  {
    console.error('Erro ao enviar arquivo:', error);
  };

}
}


