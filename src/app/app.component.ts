// src/app/app.component.ts
import { Component, inject, OnInit } from '@angular/core';
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
    ],
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit {
    private userService = inject(UserService);
    private router = inject(Router);

    ngOnInit(): void {
        this.userService.firebaseUser$.subscribe(user => {
            if (user) {
                this.userService.currentUser.set({
                    email: user.email ?? '',
                    username: user.displayName ?? '',
                });
            } else {
                this.userService.currentUser.set(null);
            }
        });

        this.userService.isAuthenticated$
          .pipe(take(1))
          .subscribe(isAuth => {
              if (isAuth && (this.router.url === '' || this.router.url === '/')) {
                  this.router.navigate([ '/dashboard' ]);
              }
          });
    }
}
