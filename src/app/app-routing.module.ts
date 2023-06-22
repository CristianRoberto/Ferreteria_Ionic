import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {LogiGuard} from './guard/logi.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'consulta',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'ingreso',
    loadChildren: () => import('./ingreso/ingreso.module').then( m => m.IngresoPageModule),canActivate:[LogiGuard]
  },
  {
    path: 'consulta',
    loadChildren: () => import('./buscar/buscar.module').then( m => m.BuscarPageModule)
  },
  {
    path: 'eliminar',
    loadChildren: () => import('./eliminar/eliminar.module').then( m => m.EliminarPageModule),canActivate:[LogiGuard]
  },
  {
    path: 'modificar',
    loadChildren: () => import('./modificar/modificar.module').then( m => m.ModificarPageModule),canActivate:[LogiGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
