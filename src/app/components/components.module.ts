import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {PopovermodiComponent} from './popovermodi/popovermodi.component';
import { FormsModule } from '@angular/forms';
import {PopoverlogiComponent} from './popoverlogi/popoverlogi.component';
import {PopoverregistroComponent} from './popoverregistro/popoverregistro.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PopovermodiComponent,
    PopoverlogiComponent,
    PopoverregistroComponent
  ],exports:[
    PopovermodiComponent,
    PopoverlogiComponent,
    PopoverregistroComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class ComponentsModule { }
