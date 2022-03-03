import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Trabalhar com formulário
import { FormsModule } from '@angular/forms';
// Trabalhar com as rotas
import { RouterModule } from '@angular/router';

import { ServicoPrestadoRoutingModule } from './servico-prestado-routing.module';
import { ServicoPrestadoFormComponent } from './servico-prestado-form/servico-prestado-form.component';
import { ServicoPrestadolistaComponent } from './servico-prestado-lista/servico-prestado-lista.component';

@NgModule({
  declarations: [
    ServicoPrestadoFormComponent,
    ServicoPrestadolistaComponent
  ],
  imports: [
    CommonModule,
    ServicoPrestadoRoutingModule,
    FormsModule,
    RouterModule    
  ],
  exports: [
    ServicoPrestadoFormComponent,
    ServicoPrestadolistaComponent    
  ]
})
export class ServicoPrestadoModule { }
