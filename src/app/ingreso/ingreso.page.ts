import { Component, OnInit } from '@angular/core';
import { ToastController,LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

import {ProductosService} from '../servicios/productos.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {

  constructor(public toast: ToastController,private servicioproductos: ProductosService ,public loadingController: LoadingController) { }
  elementos : any= {
    formato: "",
    name3:"", 
     };

  public archivoCargado: any;
  public totalArchivoCargado = 0;
  public tamanioArchivoCargado = 0;
  ngOnInit() {
  }

  async onSubmit(producForm: NgForm,producForm2: NgForm){
    
    if(producForm.valid && producForm2.valid){
      const loading = await this.loadingController.create({ message: 'Cargando...' });
      await loading.present();
      let obj_unidos = Object.assign(producForm.value, producForm2.value);
      let archivo = this.archivoCargado;
      let reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onload = () => {
      let archivoByte: any = reader.result;
      archivoByte = archivoByte.toString();
      obj_unidos.foto=archivoByte
      obj_unidos.nombrefoto=this.elementos.name3
      this.servicioproductos.postproductos(obj_unidos).then ( async (re)=>{
              this.limpiador(re);
              await loading.dismiss();
          }).catch(async(e)=>{
            await loading.dismiss();

          this.presentToast("Error de conexion");
         })
      };
    
  }else{
      this.presentToast("Campos Vacios o datos incorrectos");
    }
    
  } 

  async presentToast(message: any) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  cargaArchivo(archivo: any): Promise<void> | any { 
    this.archivoCargado = archivo[0];
    this.totalArchivoCargado = archivo.length;
    this.tamanioArchivoCargado = archivo[0].size/1024;
    let externsion =this.getFileExtension(this.elementos.formato)
    if(externsion =='JPG' || externsion =='jpg'|| externsion =='PNG'|| externsion =='png' ){
           this.elementos.name3=archivo[0].name;
    }else{
      this.archivoCargado =null;
      this.elementos.name3=null;
      this.totalArchivoCargado=0;
      this.tamanioArchivoCargado=0;
      this.elementos.formato="";
      return this.presentToast("Solo se aceptan  archivo en formato Png y Jpg");
    }
  }

  getFileExtension(filename: any) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  }

  limpiador(resul: any){
    if(resul.false){
      
      this.presentToast(resul.false);
    }else{
      Object.keys(this.elementos).forEach(ele=>{
        this.elementos[ele]=null;  
      });
      this.presentToast(resul.true);
    }

  }

}
