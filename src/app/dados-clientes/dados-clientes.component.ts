import { Component, Input } from '@angular/core';
import { VP_BPM } from 'src/beans/VP_BPM';
import { SharedDataService } from '../shared-data.service';

interface clientes {
  nome: string;
  gestor: string;
  dados: dados[];
}
interface dados {
  linhaDeProduto: string;
  modulo: string;
  familia: string;
}

@Component({
  selector: 'app-dados-clientes',
  templateUrl: './dados-clientes.component.html',
  styleUrls: ['./dados-clientes.component.scss'],
})
export class DadosClientesComponent {
  @Input() vp!: VP_BPM;
  clientes: clientes[] = [];

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit() {
    this.clientes = this.sharedDataService.getFilteredData();
  }


  reload() {
    window.location.reload();
  }
}
