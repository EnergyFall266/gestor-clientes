import { Component, Input } from '@angular/core';
import { VP_BPM } from 'src/beans/VP_BPM';
import { MessageService } from 'primeng/api';
import { DadosClientesComponent } from '../dados-clientes/dados-clientes.component';
import { DataService } from '../data.service';
import { SharedDataService } from '../shared-data.service';

interface clientes {
  nome: string;
}
interface dados {
  linhaDeProduto: string;
  modulo: string;
  familia: string;
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
  dados: dados[] = [];
  contem:string = "true";
  usuario: string = '';


  ngOnInit() {
    this.vp.Buscando_WS = true;
    console.log(this.vp.user_fullName);
    
    this.getData();
  }

  constructor(
    private messageService: MessageService,
    private dadosCliente: DadosClientesComponent,
    private dataService: DataService,
    private sharedDataService: SharedDataService
  ) {
    this.dataService.acao$.subscribe((retorno:string) => {
      if (retorno) {
        console.log(retorno);
        
        // this.vp.token = retorno;
        // this.Gestor = this.vp.token.username.split('@')[0];
        this.ngOnInit();
      } else {
        this.messageService.clear();
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possivel obter o usuário Token',
        });
      }
    });

  }

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

      this.dados = [];
      cliente.dados.forEach((dado: any) => {
        // console.log(dado);

        this.dados.push({
          linhaDeProduto: dado.linhaDeProduto,
          modulo: dado.modulo,
          familia: dado.familia,
        });
      });

      this.vp.dadosClientes.push({
        nome: cliente.nome,
        gestor: cliente.gestor,
        dados: this.dados,
      });
      // console.log("teste");

      //  console.log(this.teste);

      // console.log(cliente.dados);
    });
    console.log(this.vp.dadosClientes);
    this.sharedDataService.setFilteredData(this.vp.dadosClientes);
    this.vp.Buscando_WS = false;
    // console.log(this.gestores);
    // console.log(this.clientes);
  }
  async onUpload(event: any) {
    this.loading = true;
    this.vp.Buscando_WS = true;
    console.log(event);

    let send = await this.dataService.sendFile(event.files[0]);
    console.log(send);
    if (send.status === 200) {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Planilha enviada',
        life: 3000,
      });
      this.loading = false;
      this.vp.Buscando_WS = false;
      setTimeout(() => {
        this.refresh();
      }, 1800);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Problema ao enviar planilha',
        life: 3000,
      });
      this.loading = false;
      this.vp.Buscando_WS = false;
    }
  }

  pesquisaGestor() {
    this.vp.Buscando_WS = true;
    console.log(this.gestorSelecionado);

    let dados: any = this.vp.dadosClientes;
    let dadosFiltrados = dados.filter(
      (cliente: any) => cliente.gestor === this.gestorSelecionado
    );
    this.sharedDataService.setFilteredData(dadosFiltrados);
    console.log(dadosFiltrados);
    this.clienteSelecionado = '';
    setTimeout(() => {
      this.vp.Buscando_WS = false;
    }, 100);
  }

  pesquisaCliente() {
    this.vp.Buscando_WS = true;
    let dados: any = this.vp.dadosClientes;
    let dadosFiltrados = dados.filter(
      (cliente: any) => cliente.nome === this.clienteSelecionado
    );
    console.log(dadosFiltrados);

    this.sharedDataService.setFilteredData(dadosFiltrados);
    console.log(dadosFiltrados);
    this.gestorSelecionado = '';
    setTimeout(() => {
      this.vp.Buscando_WS = false;
    }, 100);
  }

  pesquisaModulo() {
    console.log(this.modulo);
    console.log(this.contem);
    
    if (this.modulo === '') {
      return;
    }
    this.vp.Buscando_WS = true;
    let dados: any = this.vp.dadosClientes;
    if(this.contem === "true"){
      let dadosFiltrados = dados.filter((cliente: any) =>
      cliente.dados.some(
        (dado: any) => dado.modulo.includes(this.modulo.toUpperCase())
      )
    );
    console.log(dadosFiltrados);
    this.sharedDataService.setFilteredData(dadosFiltrados);
      }else{
    let dadosFiltrados = dados.filter((cliente: any) =>
      cliente.dados.every(
        (dado: any) => !dado.modulo.includes(this.modulo.toUpperCase())
      )
      );
      console.log(dadosFiltrados);
      this.sharedDataService.setFilteredData(dadosFiltrados);
      }


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
