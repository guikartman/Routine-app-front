import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioDTO } from '../../app/models/usuario.dto';
import { UsuarioService } from '../../app/services/domain/usuario.service';
import { StorageService } from '../../app/services/storage.service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  usuario: UsuarioDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public usuarioService: UsuarioService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.usuarioService.findByEmail(localUser.email)
        .subscribe(response => {
          this.usuario = response;
        },
        error => {
          if (error.status == 403){
            this.navCtrl.setRoot('HomePage');
          }
        })
    }else {
      this.navCtrl.setRoot('HomePage');
    }
  }

}
