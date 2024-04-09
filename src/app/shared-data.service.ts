import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
getorCliente: any[] = [];
  constructor() { }

setFilteredData(data: any): void{
  this.getorCliente = data;
  
}
getFilteredData(): any[]{
  return this.getorCliente;
}
}
