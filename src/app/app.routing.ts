import { Routes, RouterModule } from '@angular/router';
import { FighterComponent } from './fighters';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'createCharacter', component: FighterComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);