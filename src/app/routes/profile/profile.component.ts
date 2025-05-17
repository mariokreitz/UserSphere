import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-profile',
    imports: [],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
})
export class ProfileComponent {
    private route = inject(ActivatedRoute);

    protected id: string = this.route.snapshot.params['id'];
}
