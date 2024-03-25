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


}
