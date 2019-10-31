import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Post } from '../../modelos/Post';
import { FeedServiceProvider } from '../../providers/feed-service/feed-service';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  public Perfil: Post;
  public Posts: Post[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private feedService: FeedServiceProvider,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController) {

    this.Perfil = this.navParams.get("PerfilSelecionado");

  }

  ionViewDidLoad() {//Carrega todos os posts feitos pelo usuário selecionado.
    let loading = this._loadingCtrl.create({
      content: 'Carregando posts...'
    });

    loading.present();
    this.feedService.PuxaPosts().subscribe(//Aqui, serão selecionados somente os Posts feitos pelo perfil desejado.
      (Posts) => {
        this.Posts = Posts.reverse();
        
        this.Posts = this.Exclui(this.Posts) 
        
        loading.dismiss();
      },
      (err) => {//Exibe mensagem na tela em caso de erro.
        console.log(err);
        loading.dismiss();
        this._alertCtrl.create({
          title: 'Falha na conexão',
          subTitle: 'Não foi possível carregar os Pius. Tente novamente mais tarde!',
          buttons: [
            { text: 'Ok' }
          ]
        }).present();
      }
    )
   }
  Exclui(Posts: Post[]){//Função encarregada por excluir do Array de Posts todos os Posts que não foram feitos pelo perfil desejado
    var i;
    var Posts2 = [];
    console.log(Posts);
    console.log(this.Perfil.usuario.username);
        for (i = 0; i < Posts.length; i++){
          if (Posts[i].usuario.username == this.Perfil.usuario.username){
            Posts2.push(Posts[i]);
          } 
        }
      return Posts2;
  }
}
