import { inject, Injectable, Injector, runInInjectionContext } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/compat/firestore';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface BaseEntity {
    id?: string;
    createdAt: Date;
    updatedAt: Date;
}

@Injectable()
export abstract class FirestoreService<T extends BaseEntity> {
    protected collection: AngularFirestoreCollection<T>;
    protected cachedEntities: T[] = [];
    protected cacheTimestamp: number = 0;
    protected readonly CACHE_DURATION = 5 * 60 * 1000; // 5 Minuten
    private injector = inject(Injector);

    protected constructor(
      private firestore: AngularFirestore,
      private collectionName: string,
    ) {
        this.collection = this.firestore.collection<T>(collectionName);
    }

    getAll(): Observable<T[]> {
        const now = Date.now();
        if (this.cachedEntities.length && now - this.cacheTimestamp < this.CACHE_DURATION) {
            return of(this.cachedEntities);
        }

        return runInInjectionContext(this.injector, () => {
            return this.collection.snapshotChanges().pipe(
              map(actions => {
                  if (actions.length === 0) {
                      return [];
                  }

                  return actions.map(a => {
                      const data = a.payload.doc.data() as T;
                      const id = a.payload.doc.id;
                      return { ...data, id } as T;
                  });
              }),
              tap(entities => {
                  this.cachedEntities = entities;
                  this.cacheTimestamp = Date.now();
              }),
              catchError(err => {
                  console.error(`Fehler beim Laden von ${this.collectionName}:`, err);
                  return of([]);
              }),
            );
        });
    }

    getById(id: string): Observable<T> {
        return runInInjectionContext(this.injector, () => {
            return this.firestore.doc<T>(`${this.collectionName}/${id}`).valueChanges().pipe(
              map(entity => {
                  if (!entity) throw new Error('Entität nicht gefunden');
                  return { ...entity, id } as T;
              }),
              catchError(err => {
                  console.error(`Fehler beim Laden der Entität mit ID ${id}:`, err);
                  return throwError(() => new Error('Entität konnte nicht geladen werden'));
              }),
            );
        });
    }

    create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Observable<string> {
        const newEntity = {
            ...entity,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as T;

        return runInInjectionContext(this.injector, () => {
            return from(this.collection.add(newEntity)).pipe(
              map(docRef => docRef.id),
              tap(() => this.clearCache()),
              catchError(err => {
                  console.error(`Fehler beim Erstellen einer ${this.collectionName}-Entität:`, err);
                  return throwError(() => new Error('Entität konnte nicht erstellt werden'));
              }),
            );
        });
    }

    update(id: string, entity: Partial<Omit<T, 'id' | 'createdAt'>>): Observable<void> {
        const updatedData = {
            ...entity,
            updatedAt: new Date(),
        } as Partial<T>;

        return runInInjectionContext(this.injector, () => {
            return from(this.firestore.doc<T>(`${this.collectionName}/${id}`).update(updatedData)).pipe(
              tap(() => this.clearCache()),
              catchError(err => {
                  console.error(`Fehler beim Aktualisieren der Entität mit ID ${id}:`, err);
                  return throwError(() => new Error('Entität konnte nicht aktualisiert werden'));
              }),
            );
        });
    }

    delete(id: string): Observable<void> {
        if (!id) {
            return throwError(() => new Error('ID ist erforderlich zum Löschen einer Entität'));
        }

        return runInInjectionContext(this.injector, () => {
            return from(this.firestore.doc<T>(`${this.collectionName}/${id}`).delete()).pipe(
              tap(() => this.clearCache()),
              catchError(err => {
                  console.error(`Fehler beim Löschen der Entität mit ID ${id}:`, err);
                  return throwError(() => new Error('Entität konnte nicht gelöscht werden'));
              }),
            );
        });
    }

    query(queryFn: QueryFn): Observable<T[]> {
        return runInInjectionContext(this.injector, () => {
            return this.firestore.collection<T>(this.collectionName, queryFn).valueChanges({ idField: 'id' }).pipe(
              catchError(err => {
                  console.error('Fehler bei Datenbankabfrage:', err);
                  return throwError(() => new Error('Datenbankabfrage fehlgeschlagen'));
              }),
            );
        });
    }

    protected clearCache(): void {
        this.cachedEntities = [];
        this.cacheTimestamp = 0;
    }
}