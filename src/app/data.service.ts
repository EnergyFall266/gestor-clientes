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
  url: 'http://192.168.1.21:3000/dados-clientes',
  headers: { }
};

try {
  const response = await axios.request(config);
  console.log(response);

  return response.data;
} catch (error: any) {
  console.error(error);

}
}


}
