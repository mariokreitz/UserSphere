import { UserMetadata } from '@angular/fire/auth';

export interface UserInterface {
    uid: string;
    email: string;
    username: string;
    emailVerified: boolean;
    metadata: UserMetadata;
}

