import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Perfil } from '../../modelos/perfil';
 
@Injectable()
export class CadastroServiceProvider{

  private _usuarioLogado: Perfil;
  
  constructor(private _http: HttpClient) {
  }

  efetuaCadastro(_usuarioLogado) {
    let headers = {
      "Content-Type": "application/json"
    }
    return this._http.post("http://piupiuwer.polijunior.com.br/api/usuarios/registrar/", _usuarioLogado)
  }

}