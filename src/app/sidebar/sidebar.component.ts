import { Component, Input } from '@angular/core';
import { VP_BPM } from 'src/beans/VP_BPM';
import { MessageService } from 'primeng/api';
import { DadosClientesComponent} from '../dados-clientes/dados-clientes.component';
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [MessageService, DadosClientesComponent],
})
export class SidebarComponent {
  @Input() vp!: VP_BPM;
  sidebarVisible: boolean = true;
  screenWidth: number = window.innerWidth;
  gestores: string[] = [
    'William Germano Meurer',
    'Rodrigo José Alves Maioli',
    'Alberto de Lima',
    'Everson Godoy Freire ',
  ];
  gestorSelecionado: string = '';
  clienteSelecionado: string = '';
  loading: boolean = false;
  modulo: string = '';

  ngOnInit() {}

  constructor(private messageService: MessageService, private dadosCliente: DadosClientesComponent) {}

  onUpload(event: UploadEvent) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Planilha enviada' , life: 3000});
    }
    , 3000);
      
      
  }

  print() {
    console.log(this.gestorSelecionado);
    this.vp.Buscando_WS = true;
    setTimeout(() => {
      this.vp.Buscando_WS = false;
    }, 3000);
  }
  refresh(){
    console.log('refresh');
    
    this.dadosCliente.reload();
  }

}
