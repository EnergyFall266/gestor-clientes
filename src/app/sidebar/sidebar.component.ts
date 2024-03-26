import { Component, Input } from '@angular/core';
import { VP_BPM } from 'src/beans/VP_BPM';
import { MessageService } from 'primeng/api';
import { DadosClientesComponent } from '../dados-clientes/dados-clientes.component';
import { DataService } from '../data.service';
import { SharedDataService } from '../shared-data.service';
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
interface clientes {
  nome: string;
}
interface dados {
  linhaDeProduto: string;
  modulo: string;
  familia: string;
  nota: string;
  mes: string;
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
  linhaProduto: any[] = [];
  teste: dados[] = [];

  ngOnInit() {
    this.getData();
  }

  constructor(
    private messageService: MessageService,
    private dadosCliente: DadosClientesComponent,
    private dataService: DataService,
    private sharedDataService: SharedDataService
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

      this.teste = [];
      cliente.dados.forEach((dado: any) => {
        // console.log(dado);

        this.teste.push({
          linhaDeProduto: dado.linhaDeProduto,
          modulo: dado.modulo,
          familia: dado.familia,
          nota: dado.nota,
          mes: dado.mes,
        });
      });

      this.vp.dadosClientes.push({
        nome: cliente.nome,
        gestor: cliente.gestor,
        dados: this.teste,
      });
      // console.log("teste");

      //  console.log(this.teste);

      // console.log(cliente.dados);
    });
    console.log(this.vp.dadosClientes);
    this.sharedDataService.setFilteredDataGestor(this.vp.dadosClientes);

    // console.log(this.gestores);
    // console.log(this.clientes);
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
    // this.vp.Buscando_WS = true;
    // setTimeout(() => {
    //   this.vp.Buscando_WS = false;
    // }, 3000);
    let dados: any = this.vp.dadosClientes;
    let dadosFiltrados = dados.filter(
      (cliente: any) => cliente.gestor === this.gestorSelecionado
    );
    this.sharedDataService.setFilteredDataGestor(dadosFiltrados);
    console.log(dadosFiltrados);
    this.dadosCliente.atualizar(dadosFiltrados);
  }

  pesquisaCliente() {
    let dados: any = this.vp.dadosClientes;
    let dadosFiltrados = dados.filter(
      (cliente: any) => cliente.nome === this.clienteSelecionado
    );
    console.log(dadosFiltrados);

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
    this.vp.dadosClientes = [];
    // this.dadosCliente.atualizar();
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
