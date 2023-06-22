import { Component, OnInit } from '@angular/core';
import { ToastController,LoadingController,AlertController } from '@ionic/angular';
import {ProductosService} from '../servicios/productos.service';
@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.page.html',
  styleUrls: ['./eliminar.page.scss'],
})
export class EliminarPage implements OnInit {
  products: any=[];
  constructor(private alertCtrl: AlertController,public toast: ToastController,private servicioproductos: ProductosService ,public loadingController: LoadingController) { }
  auxproducts=[];
  elementos: any= {
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

  onInput(even: any){
    let val = even.target.value
    
      if(val && val !=''){
        this.products =this.auxproducts.filter((item: any): boolean=>{
            return(item.codigo.toLowerCase().indexOf(val.toLowerCase()) >-1)
        })
  
      }else{
      this.products=this.auxproducts;
      }
    
    

  }

  async presentToast(message: any) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async Eliminar(produc: any){
    console.log(produc)
    const alert = await this.alertCtrl.create({
      header: '¿Seguro de eliminar codigo\n: '+produc.codigo+'?',
  
      cssClass: 'btnalert',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'btnalert1',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        },
         {
          text: 'Aceptar', 
          cssClass: 'btnalert1',
          handler: async (data) => {
            const loading = await this.loadingController.create({ message: 'Eliminando...' });
            await loading.present();
            this.servicioproductos.deleteproductos(produc.id).then( async(re:any)=>{
              await loading.dismiss();
              if(re.true){
                this.search();
                this.presentToast("Eliminado Correctamente")
              } else{
                this.presentToast("Error al eliminar")
              }
              
            }).catch(async(e)=>{
              await loading.dismiss();
              this.presentToast("Error de conexion");
            });

          }
        }
      ]
    });
    await alert.present();
  }

}
