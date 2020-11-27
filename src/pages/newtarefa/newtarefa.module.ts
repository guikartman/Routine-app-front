import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewtarefaPage } from './newtarefa';

@NgModule({
  declarations: [
    NewtarefaPage,
  ],
  imports: [
    IonicPageModule.forChild(NewtarefaPage),
  ],
})
export class NewtarefaPageModule {}
