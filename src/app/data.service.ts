import { Injectable } from '@angular/core';
import { user } from '@seniorsistemas/senior-platform-data';
import { VP_BPM } from 'src/beans/VP_BPM';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  async getData() {
    const axios = require('axios');

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://demonstra.prismainformatica.com.br:3001/dados-clientes',
      headers: {
        Authorization:
          'Bearer colLMo9Dmbks12goOcUQQlqZJtZ51JABSB6CdTGKktDFwwRgDZejk65wp5SwIYGihMDHMJHay1HUkMyp8SZ7FS3v7oXV9t877Dmtw9LC15jigQ8AdCRhHjF2AoOXABxFkzliXfF5ZGh6eU0Yk2k1zSwScf0gbTc1H50zXKeTsjW15pPLjaphuvHi5ROBK54PDz89Pv7wjBaAjlouyr1DZGIWBqqxiWPI0',
      },
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

    data.append('planilha', file);

    try {
      const response = await axios.post(
        'https://demonstra.prismainformatica.com.br:3001/upload',
        data,
        {
          headers: {
            Authorization:
              'Bearer colLMo9Dmbks12goOcUQQlqZJtZ51JABSB6CdTGKktDFwwRgDZejk65wp5SwIYGihMDHMJHay1HUkMyp8SZ7FS3v7oXV9t877Dmtw9LC15jigQ8AdCRhHjF2AoOXABxFkzliXfF5ZGh6eU0Yk2k1zSwScf0gbTc1H50zXKeTsjW15pPLjaphuvHi5ROBK54PDz89Pv7wjBaAjlouyr1DZGIWBqqxiWPI0',
            ...data.getHeaders(),
          },
        }
      );

      return response;
    } catch (error: any) {
      console.error('Erro ao enviar arquivo:', error);
    }
  }
}
