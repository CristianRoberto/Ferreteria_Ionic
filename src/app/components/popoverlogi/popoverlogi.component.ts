import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import {UserService} from '../../servicios/user.service';
import { ToastController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-popoverlogi',
  templateUrl: './popoverlogi.component.html',
  styleUrls: ['./popoverlogi.component.scss'],
})
export class PopoverlogiComponent implements OnInit {
  elementos = {
    cedula: "",
    pass:"", 
  }; 
  constructor(public popover: PopoverController,private servicio: UserService,public toast: ToastController ) { }
  ngOnInit() {}

  async  login(user: NgForm){
    if(user.valid){
        this.servicio.getuser(user.value).then(async(re:any)=>{
               if(re.false){this.presentToast(re.false)}
               else{
                 this.presentToast('Bienvenido '+re.name)
                   await this.popover.dismiss({
                         cont:1,
                         data:re,
                   });
               }
        }).catch( async(e)=>{
            this.presentToast('Error de Concexion')
        })
    }else{
      this.presentToast('Campos Vacios o formato incorrecto')
    }
    
  }

  async registrarse(){
    await this.popover.dismiss({
      cont:0
     });
  }
  async presentToast(message: any) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
