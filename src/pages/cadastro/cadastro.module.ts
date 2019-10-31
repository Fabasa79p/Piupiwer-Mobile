import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroPage } from './cadastro';
import { CadastroServiceProvider } from '../../providers/cadastro-service/cadastro-service';

@NgModule({
  declarations: [
    CadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroPage),
  ],
  exports: [
    CadastroPage
  ],
  providers: [
    CadastroServiceProvider,
  ]
})
export class CadastroPageModule {}
