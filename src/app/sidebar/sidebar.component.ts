import { Component, Input } from '@angular/core';
import { VP_BPM } from 'src/beans/VP_BPM';
import { MessageService } from 'primeng/api';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [MessageService],
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
  loading: boolean = false;

  ngOnInit() {}

  constructor(private messageService: MessageService) {}

  onUpload(event: UploadEvent) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }
    , 3000);
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Planilha enviada' , life: 3000});
      
  }

  print() {
    console.log(this.gestorSelecionado);
  }
}
