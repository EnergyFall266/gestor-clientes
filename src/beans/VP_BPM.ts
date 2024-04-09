import { Message } from 'primeng/api';
import { Anexo } from 'prisma_prismafunctions';
import * as wsb from './WS_Beans';

// Crie aqui todas as váriaveis de processo
export interface ResponseLoadData {
  initial: number;
  tabs: number[];
  vp: VP_BPM;
}

interface dadosClientes {
  nome: string;
  gestor: string;
  dados: dados[];
}
interface dados {
  linhaDeProduto: string;
  modulo: string;
  familia: string;
}

export class AnexoFile {
  file: File;
  bytes: ArrayBuffer;

  constructor(file: File, bytes: ArrayBuffer) {
    this.file = file;
    this.bytes = bytes;
  }
}

export class VP_BPM {
  public overlay: boolean = true;
  public Buscando_WS: boolean = true;
  public dadosClientes: dadosClientes[] = [];

  public alertas: Message[] = [];

  public token: string = '';
  public user_fullName: string = '';
  public GED_pasta_codigo: string = '';
  public ged_pasta_pai_nome: string = 'Projeto Padrao';
  public GED_pasta_codigo_id: string = '';
  public ged_pasta_pai_id: string = '';

  public anexo_files: File[] = [];
  public anexo_ged: Anexo[] = [];
  public anexo_id: string = '';
  public anexo_nome: string = 'nome';

  public testecheck: boolean = true;

  public show_servicos: wsb.Servicos[] = [];

  public anexo_files_sem_GED: AnexoFile[] = [];
  public anexo_files_sem_GED_txt: string = '';
}
