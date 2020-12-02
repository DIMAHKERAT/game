import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {LoginSignupComponent} from './login-signup/login-signup.component';
import {NgModule} from '@angular/core';
import {GameComponent} from './game/game.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: AppComponent,
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
