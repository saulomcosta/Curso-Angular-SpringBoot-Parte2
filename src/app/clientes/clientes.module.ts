import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { ClienteslistaComponent } from './clientes-lista/clientes-lista.component';


@NgModule({
  declarations: [
    ClientesFormComponent,
    ClienteslistaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClientesRoutingModule     
  ],
  exports: [
    ClientesFormComponent,
    ClienteslistaComponent
  ]
})
export class ClientesModule { }
