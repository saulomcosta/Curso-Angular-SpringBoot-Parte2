import { Component, OnInit } from '@angular/core';

import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from 'src/app/clientes/cliente';
import { ServicoPrestado } from '../servico-prestado';
import { ServicoPrestadoService } from '../../servico-prestado.service';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes:       Cliente[]         = [];
  servico!:       ServicoPrestado;
  success:        boolean           = false;
  errors:         string[]          = [];

  constructor( 
        private serviceCliente : ClientesService ,
        private servicoPrestadorService: ServicoPrestadoService
    ) { 

    this.servico = new ServicoPrestado();

  }


  ngOnInit(): void {

    /** Busca clientes cadastrados no banco para incluir no combo */
    this.serviceCliente
            .getClientes()
            .subscribe(

                   response => this.clientes = response

            );

  }


  onSubmit() {
    
    /** Salva o serviço a ser prestado juntamente com ID cliente */
    this.servicoPrestadorService
          .salvar(this.servico)
          .subscribe( response => {
                      
                      this.success = true;
                      this.errors = [];
                      this.servico = new ServicoPrestado();

                }, errorResponse => {
                      
                      this.errors = errorResponse.error.errors;
                      this.success = false;
                }
          ); 
  }
}
