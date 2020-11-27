import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { RotinaDTO } from '../../app/models/rotina.dto';
import { RotinaService } from '../../app/services/domain/rotina.service';

/**
 * Generated class for the RotinaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rotina',
  templateUrl: 'rotina.html',
})
export class RotinaPage {

  rotinas: RotinaDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public rotinaService: RotinaService,
    public alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.rotinaService.findAll()
      .subscribe(resp => {
        console.log(resp);
        this.rotinas = resp;
      },error => {
        console.log(error);
      });
  }

  deletarRotina(id) {
    this.rotinaService.delete(id)
      .subscribe(resp => {
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
      },error =>{
        console.log('Error!')
      });
  }

  showAlertDelete(id) {
    let alert = this.alertCtrl.create({
      title: "Deletar rotina!",
      message: "Tem certeza que deseja deletar essa rotina?",
      enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Cancelar',
            handler: () =>{
              console.log('Cancelar clicado');
            }
          },
          {
            text: 'Confirmar',
            handler: () =>{
              this.deletarRotina(id);
            }
          }
        ]
    });
    alert.present();
  }

  showTarefas(rotina: RotinaDTO) {
    this.navCtrl.push('TarefasPage', {'rotina': rotina});
  }
}
