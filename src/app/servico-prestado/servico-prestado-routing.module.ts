import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../auth.guard';

import { ServicoPrestadoFormComponent } from '../servico-prestado/servico-prestado-form/servico-prestado-form.component';
import { ServicoPrestadolistaComponent } from './servico-prestado-lista/servico-prestado-lista.component';

const routes: Routes = [
  { path: 'servicos-prestados', component: LayoutComponent, 
      canActivate: [AuthGuard], children: [
        { path: 'form', component: ServicoPrestadoFormComponent },
        { path: 'lista', component: ServicoPrestadolistaComponent },
        { path: '', redirectTo: '/servicos-prestados/lista', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicoPrestadoRoutingModule { }
