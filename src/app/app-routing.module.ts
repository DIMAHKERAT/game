import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {LoginSignupComponent} from './login-signup/login-signup.component';
import {NgModule} from '@angular/core';
import {GameComponent} from './game/game.component';
import {MainMenuComponent} from './main-menu.compnent/main-menu.component';
import {SelectGameComponent} from './select-game/select-game.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', redirectTo: 'games', pathMatch: 'full' },
  {
    path: 'game/:id',
    component: GameComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'main',
    component: MainMenuComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'games',
    component: SelectGameComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'login',
    component: LoginSignupComponent,
  },
  {
    path: 'loggedout',
    component: LoginSignupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
