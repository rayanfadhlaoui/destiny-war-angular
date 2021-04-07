import { Routes, RouterModule } from '@angular/router';
import { CreateFighterComponent } from './fighters/create';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { TournamentComponent } from './tournament';
import { AuthGuard } from './_helpers';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'createCharacter', component: CreateFighterComponent,canActivate: [AuthGuard]},
    { path: 'tournament', component: TournamentComponent, canActivate: [AuthGuard]},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);