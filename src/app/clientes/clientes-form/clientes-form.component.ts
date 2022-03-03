import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';

@Component({

  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']

})

export class ClientesFormComponent implements OnInit {

  listaClientes: Cliente[] = [];
  cliente: Cliente;
  success: boolean = false;
  errors!: string[];
  id: number = 0;

  constructor( 

    private service: ClientesService ,
    private router: Router , 
    private activatedRoute: ActivatedRoute

    ) {

    this.cliente = new Cliente();
    
   }

   ngOnInit(): void {

        // Captura as funcionalidades do Browser e pega o indice passado para buscar o cliente
        let params = this.activatedRoute.params;

        params.subscribe(
              parametro => {

                  // Verifica se há parametro e se é indice
                  if (parametro && parametro["id"]) {

                      // Passa o ID do parametro para uma variavel de controle da aplicação
                      this.id = parametro["id"];
                    
                      // Busca os dados do cliente
                      this.service
                          .getClientesPorId(this.id)
                          .subscribe(
                                response      => this.cliente = response ,
                                errorResponse => this.cliente = new Cliente()
                        );
                    }
              }
        )    
  }

   onSubmit() {

      // Se existir ID, faz o atualizar senão faz o salvar
      if (this.id) {

          this.service.atualizar( this.cliente )
              .subscribe( response => {

                  this.success = true;
                  this.errors = [];

              }, errorResponse => {

                  this.errors = ["Erro ao atualizar o cliente."];

              });

      }
      else {

          this.service.getClientesPorCpf( this.cliente.cpf )
              .subscribe(

                /** Verifica se cliente já está cadastrado */
                response => {

                  let clienteRetorno: Cliente = response;

                  if (clienteRetorno != null) {

                    this.errors = ["CPF já cadastrado na base de dados!"];    

                  }
                  else {
                        /** Caso não tenha o cliente na base, salva os dados */
                        this.service
                            .salvar(this.cliente)
                            .subscribe( response => {
                                    this.success = true;
                                    this.errors = [];
                                    this.cliente = response;
                                
                              }, errorResponse => {
                                    this.errors = errorResponse.error.errors;
                                    this.success = false;
                              });                          
                  }              

                }, errorResponse => {
                  this.errors = ["Erro ao inserir cliente."];
              });
      }
   }
   
   /**
    * Nevega entre os formulários direcionando para o clientes-lista
    * 
    */
   voltarParaListagem() {

    this.router.navigate(['/clientes/lista']);
    
   }

}
