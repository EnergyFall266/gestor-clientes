import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosClientesComponent } from './dados-clientes.component';

describe('DadosClientesComponent', () => {
  let component: DadosClientesComponent;
  let fixture: ComponentFixture<DadosClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadosClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
