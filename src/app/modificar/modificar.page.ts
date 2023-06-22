import { Component, OnInit } from '@angular/core';
import { ToastController,LoadingController,AlertController } from '@ionic/angular';
import {ProductosService} from '../servicios/productos.service';
import { PopovermodiComponent } from 'src/app/components/popovermodi/popovermodi.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {
  products:any =[];
  constructor(private alertCtrl: AlertController,public popover: PopoverController,public toast: ToastController,private servicioproductos: ProductosService ,public loadingController: LoadingController) { }
  auxproducts=[];
  elementos:any = {
    tipob: "",
    bus:''
     };
  ngOnInit() {
  }

  ionViewDidEnter(){
    this.search();
  }

  async search(){
    const loading = await this.loadingController.create({ message: 'Cargando...' });
      await loading.present();
    this.servicioproductos.getproductos().then ( async (re:any)=>{
      this.products=[]
      this.auxproducts=[]
      this.products=re;
      this.auxproducts=this.products;
      await loading.dismiss();
    }).catch(async(e)=>{
      await loading.dismiss();
      this.presentToast("Error de conexion");
    })
  }

  onInput(even:any ){
    let val = even.target.value
    
      if(val && val !=''){
        this.products =this.auxproducts.filter((item:any )=>{
            return(item.codigo.toLowerCase().indexOf(val.toLowerCase()) >-1)
        })
  
      }else{
      this.products=this.auxproducts;
      }
    
    

  }

  async presentToast(message:any ) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async  Modificar(product:any ){

    const alert = await this.popover.create({
      component: PopovermodiComponent,
      mode:'ios',
      componentProps:{page:product},
      cssClass: 'pop-over-style3',
      });
      
      alert.onDidDismiss().then((dataReturned) => {         
          //   console.log('s')
          if(dataReturned.data){
            this.search();
           this.presentToast("Modificado con correctamente")
         }
    });
    
    return await alert.present()
          
  }
}
