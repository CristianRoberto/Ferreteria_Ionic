import { Component, OnInit } from '@angular/core';
import { ToastController,LoadingController } from '@ionic/angular';
import {ProductosService} from '../servicios/productos.service';
@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {
  products:any=[];
  constructor(public toast: ToastController,private servicioproductos: ProductosService ,public loadingController: LoadingController) { }
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
  
  onInput(even:any){
    let val = even.target.value
    if(this.elementos.tipob){
      if(val && val !=''){
        this.products =this.auxproducts.filter((item:any): boolean | any=>{
          if(this.elementos.tipob=='precio'){
            return(item.precio.toLowerCase().indexOf(val.toLowerCase()) >-1)
          }else if(this.elementos.tipob=='codigo'){
            return(item.codigo.toLowerCase().indexOf(val.toLowerCase()) >-1)
          }else if(this.elementos.tipob=='name'){
            return(item.name.toLowerCase().indexOf(val.toLowerCase()) >-1)
          }else if(this.elementos.tipob=='tipoh'){
            return(item.tipodeherr.toLowerCase().indexOf(val.toLowerCase()) >-1)
          }
          //return(item.precio.toLowerCase().indexOf(val.toLowerCase()) >-1)
        })
  
      }else{
      this.products=this.auxproducts;
      }
    }else{
     this.presentToast('Seleccione un criterio de busqueda');
    }
    

  }
  onInput2(){
    this.elementos.bus='';
    this.products=this.auxproducts;
  }
  async presentToast(message:any) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
