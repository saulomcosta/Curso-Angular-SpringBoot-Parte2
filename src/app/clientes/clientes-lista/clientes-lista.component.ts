import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})

export class ClienteslistaComponent implements OnInit {

  clientes:               Cliente[] = [];
  clienteSelecionado!:    Cliente;
  mensagemSucessso!:      string;
  mensagemError!:         string;
  isRetornoSucesso:       boolean    = false;
  isRetornoError:         boolean    = false;

  constructor( 

    private service:  ClientesService ,
    private router:   Router
    ){ }


  ngOnInit(): void {

    /** Inicializa a tela com os clientes da base */
    this.service.getClientes()
          .subscribe(
                response => {
                  this.clientes = response;
            }

    );
  }

  /** Recebe o cliente selecionado na tela para deleção */
  preparaDelecao(cliente: Cliente) {

    this.clienteSelecionado = cliente;

  }

  
  /**
   * Deleta o cliente selecionado
   */
  deletarCliente() {
      
      this.service
            .deletar(this.clienteSelecionado)
            .subscribe(
                      response => {
                          this.mensagemSucessso = "Cliente deletado com sucesso!";
                          this.ngOnInit();
                  },
                      erro => 
                        this.mensagemError = "Ocorreu um erro ao deletar o cliente."
            );
  }


  /**
  * Navega para a tela clientes-form 
  * (cadastro de clientes)
  */
  cadastrarCliente() {

    this.router.navigate(['/clientes/form']);
  
  }
}
