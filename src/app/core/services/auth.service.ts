import { inject, Injectable } from '@angular/core';
import {
    Auth,
    createUserWithEmailAndPassword,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
    UserCredential,
} from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { UserInterface } from '../../../models/interface/UserInterface';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private auth = inject(Auth);
    private firestore = inject(Firestore);
    private googleProvider = new GoogleAuthProvider();
    private githubProvider = new GithubAuthProvider();

    public signIn(email: string, password: string) {
        const promise = signInWithEmailAndPassword(this.auth, email, password)
          .then(async (cred) => {
              await this.ensureProfileExists(cred);
              return cred;
          });

        return from(promise);
    }

    public signUp(email: string, password: string) {
        const promise = createUserWithEmailAndPassword(this.auth, email, password)
          .then(async (cred) => {
              const displayName = email.split('@')[0];
              await this.addProfileToStore(cred, displayName);
              await updateProfile(cred.user, { displayName });
              return cred;
          });

        return from(promise);
    }

    public signInWithGoogle() {
        const promise = signInWithPopup(this.auth, this.googleProvider)
          .then(async (cred) => {
              await this.ensureProfileExists(cred);
          });

        return from(promise);
    }

    public signInWithGithub() {
        const promise = signInWithPopup(this.auth, this.githubProvider)
          .then(async (cred) => {
              await this.ensureProfileExists(cred);
          });

        return from(promise);
    }

    public logout() {
        const promise = this.auth.signOut();
        return from(promise);
    }

    updateProfile(displayName = 'Gast', photoURL = '') {
        const promise = updateProfile(this.auth.currentUser!, { displayName, photoURL });
        return from(promise);
    }

    private async ensureProfileExists(cred: UserCredential) {
        const userRef = doc(this.firestore, 'users', cred.user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            const displayName = cred.user.displayName || cred.user.email?.split('@')[0] || 'Gast';
            await this.addProfileToStore(cred, displayName);
        }
    }

    private async addProfileToStore(cred: UserCredential, displayName: string) {
        const metadata = {
            creationTime: cred.user.metadata.creationTime || null,
            lastSignInTime: cred.user.metadata.lastSignInTime || null,
        };

        const userData: UserInterface = {
            uid: cred.user.uid,
            email: cred.user.email!,
            username: cred.user.displayName || displayName,
            photoURL: cred.user.photoURL || '',
            emailVerified: cred.user.emailVerified,
            UserMetadata: metadata,
        };

        await setDoc(doc(this.firestore, 'users', userData.uid), userData);
    }

}
