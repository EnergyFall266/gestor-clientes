import { Component, Input } from '@angular/core';
import { VP_BPM } from 'src/beans/VP_BPM';
import { MessageService } from 'primeng/api';
import { DadosClientesComponent } from '../dados-clientes/dados-clientes.component';
import { DataService } from '../data.service';
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
interface clientes {
  nome: string;
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
  gestores: string[] = [];
  clientes: clientes[] = [];
  gestorSelecionado: string = '';
  clienteSelecionado: string = '';
  loading: boolean = false;
  modulo: string = '';
  linhaProduto:any[] = [];

  ngOnInit() {
    this.getData();
  }

  constructor(
    private messageService: MessageService,
    private dadosCliente: DadosClientesComponent,
    private dataService: DataService
  ) {}

  async getData() {
    let data = await this.dataService.getData();
    console.log(data);

    data.Clientes.forEach((cliente: any) => {
      if (!this.gestores.includes(cliente.gestor)) {
        this.gestores.push(cliente.gestor);
      }

      if (!this.clientes.includes(cliente.nome)) {
        this.clientes.push({ nome: cliente.nome });
      }


     
    //  cliente.dados.forEach((dado: any) => {

    //   this.vp.dadosClientes.push({
    //     nome: cliente.nome,
    //     gestor: cliente.gestor,
    //     dados: [
    //       {
    //         linhaDeProduto: dado.linhaDeProduto,
    //         modulo: dado.modulo,
    //         familia: dado.familia,
    //         nota: dado.nota,
    //         mes: dado.mes,
    //       },
    //     ],
    //   });
    //  });
      


      
    });
    console.log(this.vp.dadosClientes);

    console.log(this.gestores);
    console.log(this.clientes);
  }
  onUpload(event: UploadEvent) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Planilha enviada',
        life: 3000,
      });
    }, 3000);
  }

  pesquisaGestor() {
    console.log(this.gestorSelecionado);
    this.vp.Buscando_WS = true;
    setTimeout(() => {
      this.vp.Buscando_WS = false;
    }, 3000);
  }

  pesquisaCliente() {
    console.log(this.clienteSelecionado);
    this.vp.Buscando_WS = true;
    setTimeout(() => {
      this.vp.Buscando_WS = false;
    }, 3000);
  }

  pesquisaModulo() {
    console.log(this.modulo);
    this.vp.Buscando_WS = true;
    setTimeout(() => {
      this.vp.Buscando_WS = false;
    }, 3000);
  }
  refresh() {
    console.log('refresh');
    let dados: any = this.vp.dadosClientes;
    dados.forEach((cliente: any) => {
      console.log(cliente);
    });

    this.dadosCliente.reload();
  }
}
