import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { UserService } from './core/services/user.service';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        HeaderComponent,
        FooterComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    private userService = inject(UserService);

    ngOnInit(): void {
        this.userService.user$.subscribe((user) => {
            if (user) {
                this.userService.currentUser.set({
                    email: user.email!,
                    username: user.displayName!,
                });
            } else {
                this.userService.currentUser.set(null);
            }
        });
    }
}
