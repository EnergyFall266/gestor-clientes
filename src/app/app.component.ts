import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, PrimeNGConfig, MessageService } from 'primeng/api';
import { VP_BPM } from 'src/beans/VP_BPM';
import * as fd from 'src/functions/Form_Design';
// import formValidate from 'src/functions/Form_Validate';
import { Validate_Service } from '../services/Validate_Service';
import * as wc from 'src/functions/Workflow_Cockpit';
import { Data, Info } from 'src/beans/Workflow';
import axios from 'axios';
import { ThemeService } from '../services/theme.service';
import { AnexoService } from './app.service';
import { Messages } from 'primeng/messages';
import { DataService } from './data.service';

declare var workflowCockpit: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService, Validate_Service],
})
export class AppComponent {
  @ViewChild(Messages) msg!: Messages;
  public title = 'Gestor-Clientes';



  public vp: VP_BPM = new VP_BPM();

  constructor(private dataService:DataService) {
    this.vp.Buscando_WS = false;

  }
  ngOnInit() {


  }


}
