import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs';

import { environment } from '../environments/environment';

import { Cliente } from './clientes/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiUrl: String = environment.apiURLBase + "/api/clientes";

  constructor( 
    private http: HttpClient 
    ) { }

  salvar( cliente: Cliente ): Observable<Cliente> {

    return this.http.post<Cliente>( `${ this.apiUrl }` , cliente);

  }

  getClientes(): Observable<Cliente[]> {

    return this.http.get<Cliente[]>( `${ this.apiUrl }/find-todos`);

  }
  
  getClientesPorId(id: number): Observable<Cliente> {


    return this.http.get<any>( `${ this.apiUrl }/find-id/${ id }`);

  }

  getClientesPorCpf( cpf: string ): Observable<Cliente> {

    const httpParams = new HttpParams()
                .set("cpf", cpf);
    
    const url = this.apiUrl + "/find-cpf?" + httpParams.toString();

    return this.http.get<Cliente>(url);

  }

  atualizar( cliente: Cliente ): Observable<Cliente> {

    return this.http.put<Cliente>( `${ this.apiUrl }/${ cliente.id }` , cliente);

  }

  deletar( cliente: Cliente ): Observable<Cliente> {

    return this.http.delete<any>( `${ this.apiUrl }/${ cliente.id }`);

  }
  
}
