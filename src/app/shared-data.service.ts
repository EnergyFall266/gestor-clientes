import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
getorCliente: any[] = [];
  constructor() { }

setFilteredDataGestor(data: any): void{
  this.getorCliente = data;
  
}
getFilteredDataGestor(): any[]{
  console.log(this.getorCliente);
  return this.getorCliente;
}
}
