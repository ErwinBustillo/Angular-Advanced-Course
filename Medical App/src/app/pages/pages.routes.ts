import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AdminGuard, VerificaTokenGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const routes: Routes = [
    { path: 'dashboard',canActivate:[VerificaTokenGuard], component: DashboardComponent, data: { titulo: 'Dashboard'}},
    { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'}},
    { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas'}},
    { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'}},
    { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs'}},
    { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes'}},
    { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario'}},
    { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador'}},
    //MANTENIMIENTOS
    { path: 'usuarios',canActivate:[AdminGuard], component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios'}},
    { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales'}},   
    { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de medicos'}}, 
    { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Medico'}},
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

export const PAGES_ROUTES = RouterModule.forChild(routes);