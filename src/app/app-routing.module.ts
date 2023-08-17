import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeMaipuComponent } from './home-maipu/home-maipu.component';
import { CrearPedidosComponent } from './pedidos/crear-pedidos/crear-pedidos.component';

const routes: Routes = [
  {
    path: '',
    component: HomeMaipuComponent
  },
  {
    path: 'crear-pedido',
    component: CrearPedidosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
