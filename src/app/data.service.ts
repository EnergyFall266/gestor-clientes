import { Injectable } from '@angular/core';
import { user } from '@seniorsistemas/senior-platform-data';
import { VP_BPM } from 'src/beans/VP_BPM';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private token: any;
  usuario: any;
  public vp: VP_BPM = new VP_BPM();
  private capturaAcao = new Subject<string>();
  acao$ = this.capturaAcao.asObservable();
  constructor() {
    user
    .getToken()
    .then((retorno:any) => {
      console.log(retorno);
      
      this.token = retorno;

      const user = this.token.fullName.split('+');
      this.vp.user_fullName = user[0] + ' ' + user[1];

      
      
    })
    .catch((error:any) => {
      alert(
        'Não foi possível obter token. Verifique se a tela está sendo acessada pela plataforma Senior X.'
      );
    }); }
  

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


