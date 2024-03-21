import { Component, Input } from '@angular/core';
import { VP_BPM } from 'src/beans/VP_BPM';

interface clientes {
  nome: string;
 dados:dados[];
}
interface dados {
  modulo: string;
  valor: string;
  data: string;
  status: string;
  acoes: string;
  }

@Component({
  selector: 'app-dados-clientes',
  templateUrl: './dados-clientes.component.html',
  styleUrls: ['./dados-clientes.component.scss']
})
export class DadosClientesComponent {
  @Input() vp!: VP_BPM;
 clientes: clientes[] = [
    {
      nome: 'João',
      dados: [
        {modulo: 'Módulo 1', valor: 'Valor 1', data: 'Data 1', status: 'Status 1', acoes: 'Ações 1'},
        {modulo: 'Módjwdfkijvglswegfklns fkljdsdnfkbgkulo 2', valor: 'Valor gykjugykjgkygyigyuglo', data: 'Data 2', status: 'hkugklughkluhçliihuiçlhkçlihohçuh 2', acoes: 'Açõe54164562.614.564.614.651456156s 2'},
        {modulo: 'Módulo 3', valor: 'Valor 3', data: 'Data 3', status: 'Status 3', acoes: 'Ações 3'},
      ]
    },
    {
      nome: 'Maria',
      dados: [
        {modulo: 'Módulo 1', valor: 'Valor 1', data: 'Data 1', status: 'Status 1', acoes: 'Ações 1'},
        {modulo: 'Módulo 2', valor: 'Valor 2', data: 'Data 2', status: 'Status 2', acoes: 'Ações 2'},
        {modulo: 'Módulo 3', valor: 'Valor x', data: 'Data 3', status: 'Status 3', acoes: 'Ações 3'},
      ]
    },
    {
      nome: 'José',
      dados: [
        {modulo: 'Módulo 1', valor: 'Valor 1', data: 'Data 1', status: 'Status 1', acoes: 'Ações 1'},
        {modulo: 'Módulo 2', valor: 'Valor 2', data: 'Data 2', status: 'Status 2', acoes: 'Ações 2'},
        {modulo: 'Módulo 3', valor: 'Valor 3', data: 'Data 3', status: 'Status 3', acoes: 'Ações 3'},
      ]
    },
    {
      nome: 'Ana',
      dados: [
        {modulo: 'Módulo 1', valor: 'Valor 1', data: 'Data 1', status: 'Status 1', acoes: 'Ações 1'},
        {modulo: 'Módulo 2', valor: 'Valor 2', data: 'Data 2', status: 'Status 2', acoes: 'Ações 2'},
        {modulo: 'Módulo 3', valor: 'Valor 3', data: 'Data 3', status: 'Status 3', acoes: 'Ações 3'},
      ]
    }
  ];
  
  
ngOnInit() {
  
}

reload(){
  window.location.reload();
}

}
