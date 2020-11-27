import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { RotinaDTO } from '../../app/models/rotina.dto';
import { TarefaService } from '../../app/services/domain/tarefa.service';


@IonicPage()
@Component({
  selector: 'page-newtarefa',
  templateUrl: 'newtarefa.html',
})
export class NewtarefaPage {

  formGroup: FormGroup;
  anoAtual: string;
  maxAno: string;
  rotinaAberta: RotinaDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public tarefaService: TarefaService) {
      this.rotinaAberta = navParams.get('rotina');
      this.anoAtual = this.obterAnoAtual();
      this.maxAno = this.obterAnoMaximo();
      this.formGroup = this.formBuilder.group({
        titulo: ['',[Validators.required]],
        data: ['',[Validators.required]]
      });
    }

  ionViewDidLoad() {
  }

  salvarTarefa() {
    this.tarefaService.insert(this.formGroup.value,this.rotinaAberta.id)
      .subscribe(res => {
        this.showInsertOk();
      },error => {});
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: "Tarefa cadastrada com sucesso!",
      message: "Mantenha o foco.",
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

  obterAnoAtual() {
    const date = new Date();

    const ano = date.getFullYear();
    
    return ano.toString();
  }

  obterAnoMaximo(): string {
    const date = new Date();

    date.setDate(date.getFullYear() + 20);

    const ano = date.getFullYear();

    return ano.toString();
  }
}
