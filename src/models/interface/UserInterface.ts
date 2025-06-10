export interface UserInterface {
    uid: string;
    email: string;
    username: string;
    photoURL: string;
    emailVerified: boolean;
    UserMetadata: {
        creationTime: string | null;
        lastSignInTime: string | null;
    };
}