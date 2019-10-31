import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FeedServiceProvider } from '../../providers/feed-service/feed-service'
import { Post } from '../../modelos/Post';
import {PerfilPage} from '../perfil/perfil';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {
  public Posts: Post[];
  private piado: string;
  private cont: number;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _alertCtrl: AlertController, 
    private feedService: FeedServiceProvider,
    private _loadingCtrl: LoadingController,
    public _storage: Storage) {
    }

  PostCriado() { //Função que cria um Piu com as caracterisiticas ideais, ou seja, menos de 140 caracteres e mais de 0.
    let PostCriado = {
      "conteudo":this.piado,
      "favoritado": false,
      "data": ""
    }
    if (this.piado == null){ //Percorre o caso em que o usuário não digitou nada e nem clicou na barra de digitação.
      this._alertCtrl.create({
        title: 'Nem um piuzinho?',
        subTitle: 'piados devem ter ao menos um caractere!',
        buttons: [
          { text: 'Ok' }
        ]
      }).present();
    }
    else if(this.piado.length == 0){ // Percorre o caso em que o usuário não digitou nada, mas clicou na barra de digitação
      this._alertCtrl.create({
        title: 'Nem um piuzinho?',
        subTitle: 'piados devem ter ao menos um caractere!',
        buttons: [
          { text: 'Ok' }
        ]
      }).present();
    }
    else if (this.piado.length <= 140){ // Caso em que o usuário digitou mais de 140 caracteres.
      this.feedService.criaPost(PostCriado).subscribe(
      )
      }  
    else{
      this._alertCtrl.create({
        title: 'Piado muito longo',
        subTitle: 'piados devem ter menos de 140 caracteres',
        buttons: [
          { text: 'Ok' }
        ]
      }).present();
    }
    }
  ionViewDidLoad() { //Carrega os Posts que estão no servidor.
      let loading = this._loadingCtrl.create({
        content: 'Carregando posts...'
      });
  
      loading.present();
      this.feedService.PuxaPosts().subscribe(//Puxa a lista invertida os posts (ordem cronológica)
        (Posts) => {
          this.Posts = Posts.reverse();
          console.log(Posts);
          loading.dismiss();
        },
          (err) => { //Exibe mensagem de erro caso os posts não possam ser carregados por algum motivo.
            console.log(err); 
            loading.dismiss();
            this._alertCtrl.create({
            title: 'Falha na conexão',
            subTitle: 'Não foi possível carregar os Pius. Tente novamente mais tarde!',
            buttons: [
             { text: 'Ok' }
           ]}).present();
          }
      )
    }

    selecionaPerfil(Perfil: Post) { // Função que direciona o usuário para o perfil selecionado por ele.
      console.log(Perfil);
      this.navCtrl.push(PerfilPage.name, {
        PerfilSelecionado: Perfil
      });
    }
    
    contaCaracteres(){//Função que conta o número de caracteres digitados pelo usuário e pinta o campo de digitação caso o número exceda 140.
      this.cont = this.piado.length;
      var  contador = document.getElementById("contador");
      var campo = document.getElementById("campo");
      if (this.cont > 140){
        contador.style.backgroundColor = "red";
        campo.style.background = "red"
      }
      else{
        contador.style.backgroundColor = "white";
        campo.style.background = "white";
      }
    }
    Favorito(Post:Post){ //Função que muda o status de favorito de um post.
      if (Post.favoritado == true){
        Post.favoritado = false;
      }
      else{
        Post.favoritado = true;
      }
    }

    Logout(){ //Função encarregada do Logout do usuário (limpa o Storage)
      this._storage.clear();
      this.navCtrl.setRoot(LoginPage);
    }

  


    
  

  }


