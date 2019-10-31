import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../../modelos/usuario';
 
@Injectable()
export class LoginServiceProvider{

  private _usuarioLogado: Usuario
  
  constructor(private _http: HttpClient) {
  }

  efetuaLogin(_usuarioLogado) {
    let headers = {
      "Content-Type": "application/json"
    }
    return this._http.post("http://piupiuwer.polijunior.com.br/api/login/", _usuarioLogado)
  }

}
