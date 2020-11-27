import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { RotinaService } from '../../app/services/domain/rotina.service';

@IonicPage()
@Component({
  selector: 'page-newrotina',
  templateUrl: 'newrotina.html',
})
export class NewrotinaPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public rotinaService: RotinaService) {

      this.formGroup = this.formBuilder.group({
        nome: ['',[Validators.required]]
      });
  }

  salvarRotina() {
    this.rotinaService.insert(this.formGroup.value)
      .subscribe(res => {
        this.showInsertOk();
      }, 
      error =>{});
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: "Rotina foi criada com sucesso!",
      message: "Agora é só cadastrar suas tarefas",
      enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Ok',
            handler: () =>{
              this.navCtrl.pop();
            }
          }
        ]
    });
    alert.present();
  }
}
