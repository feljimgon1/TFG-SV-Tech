import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEditUserPlanComponent } from './components/admin-edit-user-plan/admin-edit-user-plan.component';
import { AdminUserPlanComponent } from './components/admin-user-plan/admin-user-plan.component';
import { BalanceComponent } from './components/balance/balance.component';
import { ChatComponent } from './components/chat/chat.component';
import { ConsultancyComponent } from './components/consultancy/consultancy.component';
import { CuentaPerdidasGananciasComponent } from './components/cuenta-perdidas-ganancias/cuenta-perdidas-ganancias.component';
import { EstrategiaCirculanteComponent } from './components/estrategia-circulante/estrategia-circulante.component';
import { EstrategiaMercadoComponent } from './components/estrategia-mercado/estrategia-mercado.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { BasicComponent } from './components/payment/basic/basic.component';
import { MediumComponent } from './components/payment/medium/medium.component';
import { PremiumComponent } from './components/payment/premium/premium.component';
import { PlanExpertoComponent } from './components/plan-experto/plan-experto.component';
import { PlanFinancieroComponent } from './components/plan-financiero/plan-financiero.component';
import { PoliticaFinanciacionComponent } from './components/politica-financiacion/politica-financiacion.component';
import { PoliticaInversionComponent } from './components/politica-inversion/politica-inversion.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { RegistroInformacionComponent } from './components/registro-informacion/registro-informacion.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  //Auth
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  //Services
  {
    path: 'basic',
    component: BasicComponent
  },
  {
    path: 'medium',
    component: MediumComponent
  },
  {
    path: 'premium',
    component: PremiumComponent
  },
  //Plan financiero
    //Información
  {
    path: 'plan-financiero',
    component: PlanFinancieroComponent
  }, 
    //Calculadora
  {
    path: 'balance',
    component: BalanceComponent
  },
  {
    path: 'cuenta-perdidas-ganancias',
    component: CuentaPerdidasGananciasComponent
  },
  {
    path: 'estrategia-mercado',
    component: EstrategiaMercadoComponent
  },
  {
    path: 'politica-inversion',
    component: PoliticaInversionComponent
  },
  {
    path: 'politica-financiacion',
    component: PoliticaFinanciacionComponent
  },
  {
    path: 'estrategia-circulante',
    component: EstrategiaCirculanteComponent
  },
  {
    path: 'resultados',
    component: ResultadosComponent
  },
  //Administración
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'users/update/:id',
    component: UpdateUserComponent
  },
  {
    path: 'consultancy',
    component: ConsultancyComponent
  },
  {
    path: 'consultancy/:id',
    component: AdminUserPlanComponent
  },
  {
    path: 'consultancy/edit/:id',
    component: AdminEditUserPlanComponent
  },
  {
    path: 'plan-experto',
    component: PlanExpertoComponent
  },
  {
    path:'registro-informacion',
    component: RegistroInformacionComponent
  },
  //Chat
  {
    path: 'chat',
    component: ChatComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
