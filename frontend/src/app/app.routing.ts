import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { TablePaginationComponentComponent } from './table-pagination-component';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { RecordUpdateComponent } from './record-update';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'records', component: TablePaginationComponentComponent, canActivate: [AuthGuard] },
    { path: 'users', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'record/update/:id',component:RecordUpdateComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);