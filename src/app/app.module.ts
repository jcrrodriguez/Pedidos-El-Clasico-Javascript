import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { HomeMaipuComponent } from './home-maipu/home-maipu.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { NavComponent } from './nav/nav.component';
import { CrearPedidosComponent } from './pedidos/crear-pedidos/crear-pedidos.component';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { ListPedidosComponent } from './pedidos/list-pedidos/list-pedidos.component';
import { PedidoComponent } from './pedidos/pedido/pedido.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeMaipuComponent,
    AuthComponent,
    LoginComponent,
    NavComponent,
    CrearPedidosComponent,
    ListPedidosComponent,
    PedidoComponent,
    ErrorDialogComponent
  ],
  imports: [
    MatDialogModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
