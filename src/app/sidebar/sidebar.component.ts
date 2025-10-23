import { Component, Input } from '@angular/core';
import { VP_BPM } from 'src/beans/VP_BPM';
import { MessageService } from 'primeng/api';
import { DadosClientesComponent } from '../dados-clientes/dados-clientes.component';
import { DataService } from '../data.service';
import { SharedDataService } from '../shared-data.service';
import { AppService } from '../app.service';
import * as XLSX from 'xlsx';

interface clientes {
  nome: string;
}
interface dados {
  linhaDeProduto: string;
  modulo: string;
  familia: string;
}

interface exporta {
  Cliente: string;
  Codigo: string;
  Gestor: string;
  LinhaDeProduto: string;
  Modulo: string;
  Familia: string;
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
  contem: string = 'true';
  adm: boolean = false;
  exporta: exporta[] = [];
  preArmazenado: any[] = [];
  selecaoAnterior: string = '';

  ngOnInit() {
    this.vp.Buscando_WS = true;
  }

  constructor(
    private messageService: MessageService,
    private dadosCliente: DadosClientesComponent,
    private dataService: DataService,
    private sharedDataService: SharedDataService,
    private appService: AppService
  ) {
    this.appService.acao$.subscribe((retorno) => {
      if (retorno) {
        if (retorno === 'EversonGodoyFreire' || retorno === 'LeonardoVanzin') {
          this.adm = true;
        }
        this.getData();
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

    data.clientes.forEach((cliente: any) => {
      // const index = cliente.nome.indexOf('-');

      let codigoCliente = cliente.codigo;
      let nomeCliente = cliente.nome;

      //conteudo dos dropdowns

      if (!this.gestores.includes(cliente.gestor)) {
        this.gestores.push(cliente.gestor);
      }

      if (!this.clientes.includes(cliente.nome)) {
        this.clientes.push({ nome: cliente.nome });
      }
      //

      this.dados = [];
      cliente.modulos.forEach((modulos: any) => {
        this.dados.push({
          linhaDeProduto: modulos.linhaDeProduto,
          modulo: modulos.modulo,
          familia: modulos.familia,
        });
      });

      this.vp.dadosClientes.push({
        codigo: codigoCliente,
        nome: nomeCliente,
        gestor: cliente.gestor,
        dados: this.dados,
      });
    });
    this.sharedDataService.setFilteredData(this.vp.dadosClientes);
    this.vp.Buscando_WS = false;
  }
  async onUpload(event: any) {
    this.loading = true;
    this.vp.Buscando_WS = true;

    let send = await this.dataService.sendFile(event.files[0]);
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

    if (this.selecaoAnterior === 'gestor') {
      this.sharedDataService.setFilteredData(this.vp.dadosClientes);
      this.modulo = '';
      this.clienteSelecionado = '';
    }

    let dados: any = this.sharedDataService.getFilteredData();

    let dadosFiltrados = dados.filter(
      (cliente: any) => cliente.gestor === this.gestorSelecionado
    );
    this.sharedDataService.setFilteredData(dadosFiltrados);

    this.preArmazenado = dadosFiltrados;
    this.selecaoAnterior = 'gestor';
    this.vazio();
  }

  pesquisaCliente() {
    this.vp.Buscando_WS = true;

    if (this.selecaoAnterior === 'cliente') {
      this.sharedDataService.setFilteredData(this.vp.dadosClientes);
      this.modulo = '';
      this.gestorSelecionado = '';
    }
    let dados: any = this.sharedDataService.getFilteredData();
    let dadosFiltrados = dados.filter(
      (cliente: any) => cliente.nome === this.clienteSelecionado
    );

    this.sharedDataService.setFilteredData(dadosFiltrados);

    this.preArmazenado = dadosFiltrados;
    this.selecaoAnterior = 'cliente';
    this.vazio();
  }

  pesquisaModulo() {
    if (this.preArmazenado.length === 0) {
      this.preArmazenado = this.sharedDataService.getFilteredData();
      console.log(this.preArmazenado);
    }

    if (this.modulo === '') {
      return;
    }
    this.vp.Buscando_WS = true;

    if (this.modulo.includes(';')) {
      let multiModulos: any[] = this.modulo
        .split(';')
        .map((part) => part.trim());
      let dados: any = this.preArmazenado;
      if (this.contem === 'true') {
        console.log('contem');
        console.log('multi', multiModulos);

        multiModulos.forEach((mod: any) => {
          let dadosFiltrados = dados.filter((cliente: any) =>
            cliente.dados.some((dado: any) => {
              return dado.modulo
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toUpperCase()
                .includes(
                  mod
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .toUpperCase()
                );
            })
          );
          dados = dadosFiltrados;
        });
        this.sharedDataService.setFilteredData(dados);
      } else {
        multiModulos.forEach((mod: any) => {
          let dadosFiltrados = dados.filter((cliente: any) => {
            return cliente.dados.every(
              (dado: any) =>
                !dado.modulo
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .toUpperCase()
                  .includes(
                    mod
                      .normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, '')
                      .toUpperCase()
                  )
            );
          });
          dados = dadosFiltrados;
        });
        this.sharedDataService.setFilteredData(dados);
      }
    } else {
      let dados: any = this.preArmazenado;
      console.log('dados', dados);

      if (this.contem === 'true') {
        console.log('contem');
        console.log('modulo', this.modulo);

        let dadosFiltrados = dados.filter((cliente: any) => {
          return cliente.dados.some((dado: any) =>
            dado.modulo
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toUpperCase()
              .includes(
                this.modulo
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .toUpperCase()
              )
          );
        });
        console.log('filtrado', dadosFiltrados);

        this.sharedDataService.setFilteredData(dadosFiltrados);
      } else {
        let dadosFiltrados = dados.filter((cliente: any) =>
          cliente.dados.every(
            (dado: any) =>{
              return !dado.modulo
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '').toUpperCase()
                .includes(
                  this.modulo
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .toUpperCase()
                )}
          )
        );
        this.sharedDataService.setFilteredData(dadosFiltrados);
      }
    }
    this.selecaoAnterior = 'modulo';

    this.vazio();
  }
  refresh() {
    this.dadosCliente.reload();
  }

  exportar() {
    // console.log(this.vp.selectedCliente);

    if (this.vp.selectedCliente.length === 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Aviso',
        detail: 'Nenhum dado selecionado',
        life: 3000,
      });
      return;
    }
    let data = this.vp.selectedCliente;
    this.exporta = [];
    data.forEach((cliente: any) => {
      cliente.dados.forEach((dado: any) => {
        this.exporta.push({
          Gestor: cliente.gestor,
          Codigo: cliente.codigo,
          Cliente: cliente.nome,
          Familia: dado.familia,
          LinhaDeProduto: dado.linhaDeProduto,
          Modulo: dado.modulo,
        });
      });
    });
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.exporta);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Dados');
    XLSX.writeFile(wb, 'modulos.xlsx');
  }

  vazio() {
    if (this.sharedDataService.getFilteredData().length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Aviso',
        detail: 'Nenhum dado encontrado',
        life: 3000,
      });
      setTimeout(() => {
        this.sharedDataService.setFilteredData(this.vp.dadosClientes);
        this.gestorSelecionado = '';
        this.clienteSelecionado = '';
        this.modulo = '';
        this.vp.Buscando_WS = false;
        this.vp.selectedCliente = [];
      }, 1000);
    } else {
      setTimeout(() => {
        this.vp.Buscando_WS = false;
        this.vp.selectedCliente = [];
      }, 1000);
    }
  }
}
