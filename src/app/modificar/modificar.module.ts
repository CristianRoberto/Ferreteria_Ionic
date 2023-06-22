import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarPageRoutingModule } from './modificar-routing.module';

import { ModificarPage } from './modificar.page';
import { PopovermodiComponent } from 'src/app/components/popovermodi/popovermodi.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  entryComponents:[
    PopovermodiComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ModificarPage]
})
export class ModificarPageModule {}
