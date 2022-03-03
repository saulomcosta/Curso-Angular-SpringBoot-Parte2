import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../environments/environment';

import { ServicoPrestado } from './servico-prestado/servico-prestado';
import { ServicoPrestadoBusca } from './servico-prestado/servico-prestado-lista/servicoPrestadoBusca';

/***
 * Servico.Service -> Controler da aplicação Front-End, não acessa banco de dados
 * más faz chamadas a aplicações externas através de ferramentas dispostas pelo "@angular", 
 * são elas:
 * 
 * ***** '@angular/common/http'
 * *** 'HttpClient/HttpParams contém os comandos GET, POST, DELETE e outros para fazer a ponte de comunicação
 * *****  'rxjs'
 * *** 'Observable' contém os retornos desta comunicação
 * 
 * Este SERVICE faz controle dos formulários de SERVICO-PRESTADO
 * 
*/
@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  apiURL: string = environment.apiURLBase + "/api/servicos-prestados";

  constructor(
    private http: HttpClient 
  ) { }


  /** Método para salvar os dados de serviço */
  salvar( servicoPrestado: ServicoPrestado ): Observable<ServicoPrestado> {

     return this.http.post<ServicoPrestado>( `${ this.apiURL }`, servicoPrestado);

  }


  /*** Método para buscar o serviço prestado pelos filtros nome do cliente e mes do serviço*/
  buscar(nome: string, mes: number): Observable<ServicoPrestadoBusca[]>  {

      const httpParams = new HttpParams()
                  .set("nome", nome)
                  .set("mes", mes ? mes.toString(): '');

      const url = this.apiURL + "?" + httpParams.toString();

      console.log(url);
      return this.http.get<ServicoPrestadoBusca[]>(url);
  }
}
