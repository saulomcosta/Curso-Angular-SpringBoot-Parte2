import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username!:    string;
  password!:    string;
  cadastrando!: boolean;
  msgSucesso!: string;
  errors!: string[];
    
  constructor(
    private router: Router,
    private authServive: AuthService
  ) { }

  onSubmit() {
    this.authServive
            .tentarLogar(this.username, this.password)
            .subscribe(
                response => {                  
                  
                  this.router.navigate(['/home']);
                  const access_token = JSON.stringify( response );
                  localStorage.setItem( 'access_token', access_token );  
                },
                errorResponse => {
                  this.errors = ["Usuário e/ou Senha Incorreto(s)."]
                }
            )
  }

  preparaCadastrar() {
    // Não deixa dar um refresh ba tela
    event?.preventDefault();

    this.cadastrando = true;
    this.msgSucesso = "";
  }

  cancelaCadastro() {
    this.cadastrando = false;
  }

  cadastrar() {
    
    const usuario: Usuario = new Usuario();  
    usuario.username = this.username;
    usuario.password = this.password;

    this.authServive
            .salvar(usuario)
            .subscribe( response => {

                this.msgSucesso = "Cadastro realizado com sucesso! Efetue o login.";
                this.errors = [];  
                this.cadastrando = false;
                this.username = "";
                this.password = "";  
                
            }, errorResponse => {
                this.errors = errorResponse.error.errors;
                this.msgSucesso! = "";   
            });
            
  }
}
