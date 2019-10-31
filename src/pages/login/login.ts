import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert, LoadingController } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { FeedPage } from '../feed/feed';
import { CadastroPage } from '../cadastro/cadastro';

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage{ //Responsável pelo login do usuário

  private user: string;
  private senha: string;


  constructor(public navCtrl: NavController, 
    private _alertCtrl: AlertController, 
    private loginService: LoginServiceProvider,
    public _storage: Storage,
    public _loadingCtrl: LoadingController
    ) {

      this.loginAutomatico();

    }

  efetuaLogin(){ //Realiza o login do usuário, enviando dados para o servidor.
    console.log(this.user);
    console.log(this.senha);

    let usuarioALogar = {
      "username": this.user,
      "password": this.senha
    }

    this.loginService.efetuaLogin(usuarioALogar).subscribe(
    (token) => { //Caso dê certo, queremos salvar as informações no storage e imprimir uma mensagem ao usuário, enviando ele ao feed.
      console.log(token);
      this._storage.set('storeUsuario', usuarioALogar).then();
      this._alertCtrl.create({
        title: 'Você está logado!',
        subTitle: 'Boa Time!',
        buttons:[
          {text: 'Ok'}
        ]
      }).present()
      this.navCtrl.setRoot(FeedPage);
    },
    (err) => {//Caso dê errado, queremos imprimir uma mensagem alternativa ao usuário.
      console.log(err);
      this._alertCtrl.create({
        title: 'Falha no Login',
        subTitle: 'Usuário ou senha incorretos',
        buttons:[
          {text: 'Ok'}
        ]
      }).present();
    }
    )  
  }

  paraCadastro() {//Envia o usuário para o link de cadastro caso ele ainda não tenha conta.
    this.navCtrl.push(CadastroPage);
  }

  loginAutomatico(){//Efetua login  automático.
    let loading = this._loadingCtrl.create({
      content: 'Fazendo Login...'
    });
    this._storage.get('storeUsuario').then(
      (StoreUsuario) => 
        this.loginService.efetuaLogin(StoreUsuario).subscribe(
          () => {
            
            this.navCtrl.setRoot(FeedPage)
            loading.dismiss();

          },
          (err) =>{
            console.log("Deu Errado")
            loading.dismiss();
          }
          )
    )
}

}