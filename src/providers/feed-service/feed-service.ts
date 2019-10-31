import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../../modelos/Post';

@Injectable()
export class FeedServiceProvider {

    private _postCriado: Post
    
    constructor(private _http: HttpClient) {
    }
  
    criaPost(_postCriado) {
      let headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer <token>"
      }
      return this._http.post("http://piupiuwer.polijunior.com.br//api/pius/", _postCriado);
    }

    PuxaPosts(){
      return this._http.get<Post[]>('http://piupiuwer.polijunior.com.br//api/pius/');
    }  
  }