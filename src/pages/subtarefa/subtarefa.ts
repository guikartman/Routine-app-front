import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SubTarefaDTO } from '../../app/models/subtarefa.dto';
import { TarefaDTO } from '../../app/models/tarefa.dto';
import { SubTarefaService } from '../../app/services/domain/subtarefa.service';


@IonicPage()
@Component({
  selector: 'page-subtarefa',
  templateUrl: 'subtarefa.html',
})
export class SubtarefaPage {

  tarefa: TarefaDTO;
  subtarefas: SubTarefaDTO[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public subtarefaService: SubTarefaService) {
      this.tarefa = navParams.get('tarefa');
  }

  ionViewWillEnter() {      
    this.subtarefaService.findAll(this.tarefa.id)
      .subscribe(data => {
        this.subtarefas = data;
      },error => {
        console.log(error);
    });
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  updateSubtarefa(subtarefa: SubTarefaDTO) {
    this.subtarefaService.update(subtarefa)
      .subscribe(data => {});
  }

  deletarSubtarefa(subtarefa: SubTarefaDTO) {
    let alert = this.alertCtrl.create({
      title: "Deseja realmente deletar essa subtarefa?",
      enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Cancelar',
            handler: () =>{
            }
          },
          {
            text: 'Sim',
            handler: () =>{
              this.subtarefaService.delete(subtarefa.id)
                .subscribe(res => {
                  this.showAlertDeleteOk();
                  this.ionViewWillEnter();
                },error =>{});
            }
          }
        ]
    });
    alert.present();
  }

  showAlertDeleteOk() {
    let alert = this.alertCtrl.create({
      title: "Subtarefa Deletada!",
      enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Ok',
            handler: () =>{
            }
          }
        ]
    });
    alert.present();
  }
}
