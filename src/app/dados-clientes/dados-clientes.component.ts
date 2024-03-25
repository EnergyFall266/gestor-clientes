import { Component, Input } from '@angular/core';
import { VP_BPM } from 'src/beans/VP_BPM';


interface clientes {
  nome: string;
  gestor: string;
 dados:dados[];
}
interface dados {
  linhaDeProduto: string;
  modulo: string;
  familia: string;
  nota: string;
  mes: string;
  }

@Component({
  selector: 'app-dados-clientes',
  templateUrl: './dados-clientes.component.html',
  styleUrls: ['./dados-clientes.component.scss'],

})
export class DadosClientesComponent {
  @Input() vp!: VP_BPM;
 clientes: clientes[] = []
 dados: any[] = []


  
ngOnInit() {
  this.clientes = this.vp.dadosClientes;
  console.log(this.clientes);
  
  
}

reload(){
  window.location.reload();
}

}
