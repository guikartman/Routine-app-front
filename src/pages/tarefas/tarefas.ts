import { Component } from '@angular/core';
import { ActionSheetController, AlertController, IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { RotinaDTO } from '../../app/models/rotina.dto';
import { TarefaDTO } from '../../app/models/tarefa.dto';
import { TarefaService } from '../../app/services/domain/tarefa.service';


@IonicPage()
@Component({
  selector: 'page-tarefas',
  templateUrl: 'tarefas.html',
})
export class TarefasPage {

  rotinaAberta: RotinaDTO;
  tarefas: TarefaDTO[];

  testCheckboxOpen: boolean;
  testCheckboxResult;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public tarefaService: TarefaService,
    public actionsheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController) {
      this.rotinaAberta = this.navParams.get('rotina');
      
  }

  ionViewWillEnter() {
    this.tarefaService.findAll(this.rotinaAberta.id)
        .subscribe(res => {
          console.log(res);
          this.tarefas = res;
        },error => { console.log(error); });
  }

  updateTarefa(tarefa: TarefaDTO) {
    this.tarefaService.update(tarefa)
      .subscribe(res => {
        console.log(res);
      },
        error => {
          console.log(error);
        })
  }

  openTarefa(tarefa: TarefaDTO) {
    let task = this.actionsheetCtrl.create({
      title: tarefa.titulo,
      buttons: [
        {
          text: tarefa.data,
          icon: "calendar",
          handler: () => {
            this.openData(tarefa)
          }
        },
        {
          text: "Mostrar subtarefas",
          icon: "open",
          handler: () => {
            this.openSubTarefas(tarefa);
          }
        },
        {
          text: "Adicionar subtarefa",
          icon: "add",
          handler: () => {
            this.adicionarSubtarefa(tarefa);
          }
        },
        {
          text: "Excluir tarefa",
          icon: "trash",
          handler: () => {
            this.excluirTarefa(tarefa.id);
          }
        }
      ],
      cssClass: 'action-sheets-basic-page'
    });

    task.present();
  }

  adicionarSubtarefa(tarefa: TarefaDTO){
    let subtarefaModal = this.modalCtrl.create("NewsubtarefaPage",{"tarefa":tarefa});
    subtarefaModal.present();
  }

  openSubTarefas(tarefa: TarefaDTO) {
    let subtarefaModal = this.modalCtrl.create("SubtarefaPage",{"tarefa":tarefa});
    subtarefaModal.present();
  }

  openData(tarefa:TarefaDTO) {
    let dataAtual = this.obterDataAtual();

    let dataCtrl = this.alertCtrl.create({
      title: 'Choose your date',
      inputs: [
        {
          name: 'taskdate',
          min: dataAtual,
          value: tarefa.data,
          type: 'date'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            tarefa.data = data.taskdate;
            this.tarefaService.update(tarefa)
              .subscribe(data => {
                console.log('Data atualizada');
              },error => {
                console.log(error);
            })
          }
        }
      ]
    });
    dataCtrl.present();
  }

  excluirTarefa(id) {
    let alert = this.alertCtrl.create(
      {
        title: "Deseja realmente excluir essa tarefa?",
        enableBackdropDismiss: false,
        buttons: [
          {
            text: "Cancelar",
            handler: data =>{

            }
          },
          {
            text: "Sim",
            handler: data =>{
              this.tarefaService.delete(id)
                .subscribe(res => {
                  this.ionViewWillEnter();
                },error => {
                  console.log(error);
                });
            }
          }
        ]
      }
    );
    alert.present();
  }

  obterDataAtual() {
    const date = new Date();

    const ano = date.getFullYear();
    const mes = date.getMonth();
    const dia = date.getDate();

    let mesValor = '';
    let diaValor = '';

    mesValor = ((mes < 10) ? '0' : '').concat(mes.toString())
    diaValor = ((dia < 10) ? '0' : '').concat(dia.toString())

    return ano.toString().concat('-').concat(mesValor).concat('-').concat(diaValor);
  }

  adicionarTarefa() {
    this.navCtrl.push('NewtarefaPage', {'rotina': this.rotinaAberta});
  }
}
