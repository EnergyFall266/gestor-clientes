import { Component, Input } from '@angular/core';
import { VP_BPM } from 'src/beans/VP_BPM';

@Component({
  selector: 'app-dados-clientes',
  templateUrl: './dados-clientes.component.html',
  styleUrls: ['./dados-clientes.component.scss']
})
export class DadosClientesComponent {
  @Input() vp!: VP_BPM;
}
