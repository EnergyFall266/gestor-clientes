import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { PanelModule } from 'primeng/panel';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MenuModule } from 'primeng/menu';
import { TabMenuModule } from 'primeng/tabmenu';
import { AppRoutingModule } from './app-routing.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AnexoService, PastaService } from './app.service';
import { Validate_Service } from 'src/services/Validate_Service';
import { DadosClientesComponent } from './dados-clientes/dados-clientes.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { AccordionModule } from 'primeng/accordion';
import { ToggleButtonModule } from 'primeng/togglebutton';



export const HttpLoaderFactory = (httpClient: HttpClient) =>
  new TranslateHttpLoader(httpClient, 'assets/i18n/');

@NgModule({
  declarations: [
    AppComponent,
    DadosClientesComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    MessageModule,
    MessagesModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    DialogModule,
    TableModule,
    CheckboxModule,
    PanelModule,
    InputSwitchModule,
    MenuModule,
    TabMenuModule,
    AppRoutingModule,
    ProgressSpinnerModule,
    FileUploadModule,
    RadioButtonModule,
    DividerModule,
    ImageModule,
    SidebarModule,
    ToastModule,
    AccordionModule,
    ToggleButtonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [PastaService, Validate_Service, AnexoService],
  bootstrap: [AppComponent],
})
export class AppModule { }
