import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PopoverController } from '@ionic/angular';
import { PopoverlogiComponent } from 'src/app/components/popoverlogi/popoverlogi.component';
import { PopoverregistroComponent } from 'src/app/components/popoverregistro/popoverregistro.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public nombre = 0;
  public blo=0;
  public salir:boolean=true;
  public fot:any='../assets/avatar.svg';
  public logue:any='Iniciar Sesion'
  public appPages = [
    {
      title: 'Ingreso', 
      url: '/ingreso',
      icon: 'document-text'
    },
    {
      title: 'Consulta',
      url: '/consulta',
      icon: 'search-circle'
    }, 
    {
      title: 'Eliminar',
      url: '/eliminar',
      icon: 'trash'
    },
    {
      title: 'Modificar',
      url: 'modificar',
      icon: 'documents'
    },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public popover: PopoverController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    this.log();
  }

  async login(){
    const alert = await this.popover.create({
      component: PopoverlogiComponent,
      mode:'ios',
      cssClass: 'pop-over-style1',
      });
      
      alert.onDidDismiss().then((dataReturned) => {         
          if(dataReturned.data){
            //this.search();
            // this.presentToast("Modificado con correctamente")

            if(dataReturned.data.cont==0){
                this.regstro()
            }else if(dataReturned.data.cont==1){
              console.log(dataReturned.data);
              this.fot=dataReturned.data.data.foto;
              this.logue=dataReturned.data.data.name;
              this.blo=1;
              localStorage.setItem('foto',dataReturned.data.data.foto);
              localStorage.setItem('name',dataReturned.data.data.name);
              localStorage.setItem('login','true');
              this.salir=true;
            }
         }
    });
    return await alert.present()
          
  }

  async regstro(){
    const alert2 = await this.popover.create({
      component: PopoverregistroComponent,
      mode:'ios',
      cssClass: 'pop-over-style2',
    });
     
    alert2.onDidDismiss().then((dataReturned) => {         
        
       if(dataReturned.data){
         //this.search();
         // this.presentToast("Modificado con correctamente")
           if(dataReturned.data.cont==1){
             this.login()
            }
       }
    });
   return await alert2.present()
     
  }

  log(){
     if(localStorage.getItem('login')){
       console.log(localStorage.getItem('login'))
      this.fot=localStorage.getItem('foto');
      this.logue=localStorage.getItem('name');
      this.blo=1;
      this.salir=true;
     }else{
      this.salir=false;
      this.blo=0;
     }
    }

    salire(){
      localStorage.clear();
//      location.reload(true)
    }

}
