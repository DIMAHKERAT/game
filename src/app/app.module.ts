import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { LoginSignupComponent } from './login-signup.component/login-signup.component';
import {environment} from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {AppRoutingModule} from './app-routing.module';
import {AngularFireAuthGuard} from '@angular/fire/auth-guard';
import {SelectGameComponent} from './select-game.component/select-game.component';
import {GameComponent} from './game/game.component';
import {MainMenuComponent} from './main-menu.component/main-menu.component';
import {GameService} from './game/services/game.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import { GameEndComponent } from './game-end/game-end.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ColorPickerModule } from 'ngx-color-picker';
import { SettingsComponent } from './settings/settings.component';
import {GameColorService} from './game/services/game-color.service';
import {ScoreService} from './game/services/score.service';


export function firebaseAppNameFactory() {
  return `game`;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginSignupComponent,
    GameComponent,
    SelectGameComponent,
    MainMenuComponent,
    GameEndComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatPasswordStrengthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ColorPickerModule,

    NgxAuthFirebaseUIModule.forRoot(environment.firebaseConfig,
      () => 'firebaseAppNameFactory',
      {
        enableFirestoreSync: true, // enable/disable autosync users with firestore
        toastMessageOnAuthSuccess: false, // whether to open/show a snackbar message on auth success - default : true
        toastMessageOnAuthError: false, // whether to open/show a snackbar message on auth error - default : true
        authGuardFallbackURL: '/loggedout', // url for unauthenticated users - to use in combination with canActivate feature on a route
        authGuardLoggedInURL: '/loggedin', // url for authenticated users - to use in combination with canActivate feature on a route
        passwordMaxLength: 60, // `min/max` input parameters in components should be within this range.
        passwordMinLength: 8, // Password length min/max in forms independently of each componenet min/max.
        // Same as password but for the name
        nameMaxLength: 50,
        nameMinLength: 2,
        // If set, sign-in/up form is not available until email has been verified.
        // Plus protected routes are still protected even though user is connected.
        guardProtectedRoutesUntilEmailIsVerified: true,
        enableEmailVerification: true, // default: true
      }),

    MatListModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatCardModule,
    MatFormFieldModule,
  ],
  providers: [AngularFireAuthGuard, GameService, GameColorService, ScoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
