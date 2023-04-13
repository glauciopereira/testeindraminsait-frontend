import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'clientes', component: ClienteComponent},
  {path: 'clientes/cadastrar', component: CadastroComponent},
  {path: 'clientes/:cpf', component: CadastroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
