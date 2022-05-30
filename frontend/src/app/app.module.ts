import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { NavbarComponent } from './components/navbar/navbar.component';

//Material
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// Material Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Material Layout
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
// Material Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
// Material Data tables
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

//LocaleID
import { LOCALE_ID } from '@angular/core';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(es);

//Chart
import { ChartsModule } from 'ng2-charts';

//Helper
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

//Componentes

import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { BasicComponent } from './components/payment/basic/basic.component';
import { MediumComponent } from './components/payment/medium/medium.component';
import { PremiumComponent } from './components/payment/premium/premium.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BalanceComponent } from './components/balance/balance.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CuentaPerdidasGananciasComponent } from './components/cuenta-perdidas-ganancias/cuenta-perdidas-ganancias.component';
import { EstrategiaMercadoComponent } from './components/estrategia-mercado/estrategia-mercado.component';
import { PoliticaInversionComponent } from './components/politica-inversion/politica-inversion.component';
import { PoliticaFinanciacionComponent } from './components/politica-financiacion/politica-financiacion.component';
import { EstrategiaCirculanteComponent } from './components/estrategia-circulante/estrategia-circulante.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { UsersComponent } from './components/users/users.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
import { ConsultancyComponent } from './components/consultancy/consultancy.component';
import { RegistroInformacionComponent } from './components/registro-informacion/registro-informacion.component';
import { AdminEditUserPlanComponent } from './components/admin-edit-user-plan/admin-edit-user-plan.component';
import { AdminUserPlanComponent } from './components/admin-user-plan/admin-user-plan.component';
import { PlanExpertoComponent } from './components/plan-experto/plan-experto.component';
import { ChatComponent } from './components/chat/chat.component';
import { PlanFinancieroComponent } from './components/plan-financiero/plan-financiero.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    BasicComponent,
    MediumComponent,
    PremiumComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BalanceComponent,
    CuentaPerdidasGananciasComponent,
    EstrategiaMercadoComponent,
    PoliticaInversionComponent,
    PoliticaFinanciacionComponent,
    EstrategiaCirculanteComponent,
    ResultadosComponent,
    UsersComponent,
    UpdateUserComponent,
    ConsultancyComponent,
    RegistroInformacionComponent,
    AdminEditUserPlanComponent,
    AdminUserPlanComponent,
    PlanExpertoComponent,
    ChatComponent,
    PlanFinancieroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    FormsModule, ReactiveFormsModule,

    HttpClientModule,

    //Charts
    ChartsModule,

    //Material
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-Es' },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService 
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
