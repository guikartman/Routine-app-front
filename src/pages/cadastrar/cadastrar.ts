import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { UsuarioService } from '../../app/services/domain/usuario.service';

@IonicPage()
@Component({
  selector: 'page-cadastrar',
  templateUrl: 'cadastrar.html',
})
export class CadastrarPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder, 
    public usuarioService: UsuarioService,
    public alertCtrl: AlertController) {

    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  signupUser() {
      this.usuarioService.insert(this.formGroup.value)
      .subscribe(res => {
        this.showInsertOk();
      },
      error => {})
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: "Sucesso!",
      message: "Cadastro efetuado",
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
