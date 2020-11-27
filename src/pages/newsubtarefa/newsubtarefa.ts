import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TarefaDTO } from '../../app/models/tarefa.dto';
import { SubTarefaService } from '../../app/services/domain/subtarefa.service';

@IonicPage()
@Component({
  selector: 'page-newsubtarefa',
  templateUrl: 'newsubtarefa.html',
})
export class NewsubtarefaPage {

  formGroup: FormGroup;

  tarefa: TarefaDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public subtarefaService: SubTarefaService,
    public formBuilder: FormBuilder) {
      this.formGroup = this.formBuilder.group({
        tituloSubTarefa: ['',[Validators.required]]
      });

      this.tarefa = navParams.get('tarefa');
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  salvarSubTarefa() {
    this.subtarefaService.insert(this.formGroup.value,this.tarefa.id)
      .subscribe(res => {
        console.log(res);
        this.showInsertOk();
      },error => {});
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: "Subtarefa adicionada com sucesso!",
      enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Ok',
            handler: () =>{
              this.dismissModal();
            }
          }
        ]
    });
    alert.present();
  }
}
