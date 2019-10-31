import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedPage } from './feed';
import { FeedServiceProvider } from '../../providers/feed-service/feed-service';

@NgModule({
  declarations: [
    FeedPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedPage),
  ],
  providers: [
    FeedServiceProvider,
  ]
})
export class FeedPageModule {}
