import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeMaipuComponent } from './home-maipu/home-maipu.component';
import { CrearPedidosComponent } from './pedidos/crear-pedidos/crear-pedidos.component';
import { ListPedidosComponent } from './pedidos/list-pedidos/list-pedidos.component';
import { PedidoComponent } from './pedidos/pedido/pedido.component';

const routes: Routes = [
  {
    path: '',
    component: HomeMaipuComponent
  },
  {
    path: 'crear-pedido',
    component: CrearPedidosComponent
  },
  {
    path: 'pedidos',
    component: ListPedidosComponent
  },
  {
    path: 'pedido/:date',
    component: PedidoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
