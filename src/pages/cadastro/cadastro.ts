import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Perfil } from '../../modelos/perfil';
import { HttpClient } from "@angular/common/http"
import { FeedPage } from '../feed/feed';
import { CadastroServiceProvider } from '../../providers/cadastro-service/cadastro-service';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage{ //Cria o cadastro para o usuário.

  private user: string;
  private nome: string;
  private senha: string;
  private csenha: string;
  private sobrenome: string;
  private email: string;


  constructor(public navCtrl: NavController, 
    private _http: HttpClient,
    private _alertCtrl: AlertController, 
    private cadastroService: CadastroServiceProvider
    ) {}

  efetuaCadastro(){//Função que envia dados do cadastro para o servidor.
    if (this.csenha == this.senha){//Precisamos checar que as senhas digitadas pelo usuário batem. Caso batam, precisamos cadastrar o usuário.
      console.log(this.user);
      console.log(this.senha);
      let usuarioACadastrar = {
        "username": this.user,
        "password": this.senha,
        "first_name": this.nome,
        "last_name": this.sobrenome,
        "email": this.email
      }

      this.cadastroService.efetuaCadastro(usuarioACadastrar).subscribe( 

      (token) => {
        console.log(token);
        this._alertCtrl.create({
          title: 'Você está cadastrado!',
          subTitle: 'Boa Time!',
          buttons:[
            {text: 'Ok'}
          ]
        }).present()
      },
      (err) => {
        console.log(err);
      }
      )
    
      }
      else{//Caso as senhas não batam, precisamos alertar o usuário.
        this._alertCtrl.create({
          title: 'Senhas não Batem!',
          subTitle: 'Verifique a sua senha',
          buttons:[
            {text: 'Ok'}
          ]
        }).present()
      }
}
}
