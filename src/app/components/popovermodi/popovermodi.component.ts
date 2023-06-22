import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { ToastController,LoadingController } from '@ionic/angular';
import {ProductosService} from '../../servicios/productos.service';

@Component({
  selector: 'app-popovermodi',
  templateUrl: './popovermodi.component.html',
  styleUrls: ['./popovermodi.component.scss'],
})
export class PopovermodiComponent implements OnInit {
  elementos = {
    formato: "",
    codigo:"",
    nombre:"",
    tipo:"",
    precio:"",
    cantidad:"",
    fabricante:"",
    descripcion:"",
    nombrefoto:"",
    id:''
     };
     
  public archivoCargado:any;
  public totalArchivoCargado = 0;
  public tamanioArchivoCargado = 0;
  public cont:any;
  public aux:any;

  constructor(private servicioproductos: ProductosService,public toast: ToastController,public loadingController: LoadingController,private navParams: NavParams,private popoverController: PopoverController) { }

  ngOnInit() {
    let product =this.navParams.get('page');
    this.elementos.codigo=product.codigo
    this.elementos.nombre=product.name
    this.elementos.nombrefoto=product.nombrefoto
    this.cont=this.elementos.nombrefoto
    this.aux=product.foto
    this.elementos.tipo=product.tipodeherr
    this.elementos.precio=product.precio
    this.elementos.cantidad=product.cantidad
    this.elementos.fabricante=product.fabricante
    this.elementos.descripcion=product.descripcion
    this.elementos.id=product.id
  }
  
  async Modificar(producForm: NgForm,producForm2: NgForm){
    if(producForm.valid && producForm2.valid){
      let obj_unidos = Object.assign(producForm.value, producForm2.value);
      if(obj_unidos.formato==""){
        obj_unidos.nombrefoto=this.elementos.nombrefoto;
        obj_unidos.foto= this.aux;
        obj_unidos.id=this.elementos.id;
        obj_unidos.codigo=this.elementos.codigo
        this.guadar(obj_unidos);
      }else {
         let archivo = this.archivoCargado;
         let reader = new FileReader();
         reader.readAsDataURL(archivo);
         reader.onload = () => {
         let archivoByte:any = reader.result;
         archivoByte = archivoByte.toString();
         obj_unidos.foto=archivoByte
         obj_unidos.nombrefoto=this.elementos.nombrefoto;
         obj_unidos.id=this.elementos.id;
         obj_unidos.codigo=this.elementos.codigo
         this.guadar(obj_unidos);
         }
      }
  }else{
      this.presentToast("Campos Vacios o datos incorrectos");
    }
    
  }

   async guadar(product:any){
    const loading = await this.loadingController.create({ message: 'Cargando...' });
    await loading.present();
   
      this.servicioproductos.putproductos(product).then ( async (re:any)=>{
          if(re.true){
            await this.popoverController.dismiss({
              actual:"si"
             });
             }else{
              this.presentToast("Error al Modificar");
            }         
             await loading.dismiss();
        }).catch(async(e)=>{
       await loading.dismiss();
      this.presentToast("Error de conexion");
     })
   }

  async presentToast(message:any) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  cargaArchivo(archivo:any): Promise<void> | any { 
    this.archivoCargado = archivo[0];
    this.totalArchivoCargado = archivo.length;
    this.tamanioArchivoCargado = archivo[0].size/1024;
    let externsion =this.getFileExtension({ filename: this.elementos.formato })
    if(externsion =='JPG' || externsion =='jpg'|| externsion =='PNG'|| externsion =='png' ){
           this.elementos.nombrefoto=archivo[0].name;
    }else{
      this.archivoCargado =null;
      this.elementos.nombrefoto=this.cont;
      this.totalArchivoCargado=0;
      this.tamanioArchivoCargado=0;
      this.elementos.formato="";
      return this.presentToast("Solo se aceptan  archivo en formato Png y Jpg");
    }
  }

  getFileExtension({ filename }: { filename: string | string[]; }): string | string[] {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  }

}
