// src/app/app.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterOutlet } from '@angular/router';
import { take } from 'rxjs/operators';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { UserService } from './core/services/user.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        HeaderComponent,
        FooterComponent,
        MatCardModule,
        MatProgressSpinnerModule,
    ],
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit {
    protected isAuthChecked = signal(false);

    private userService = inject(UserService);
    private router = inject(Router);

    ngOnInit(): void {
        this.userService.firebaseUser$.subscribe(user => {
            if (user) {
                const metadata = {
                    creationTime: user.metadata.creationTime || null,
                    lastSignInTime: user.metadata.lastSignInTime || null,
                };
                this.userService.currentUser.set({
                    uid: user.uid,
                    email: user.email ?? '',
                    username: user.displayName ?? '',
                    photoURL: user.photoURL ?? '',
                    emailVerified: user.emailVerified,
                    UserMetadata: metadata,
                });
            } else {
                this.userService.currentUser.set(null);
            }
        });

        this.userService.isAuthenticated$
          .pipe(take(1))
          .subscribe(isAuth => {
              if (isAuth && (this.router.url === '/login' || this.router.url === '' || this.router.url === '/')) {
                  this.router.navigate([ '/dashboard' ]);
              }
              this.isAuthChecked.set(true);
          });
    }
}
