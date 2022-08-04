import { Injectable } from '@angular/core';
import {
  collection,
  CollectionReference,
  doc,
  docData,
  docSnapshots,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  getDoc,
  setDoc,
  WriteBatch,
  writeBatch,
} from '@angular/fire/firestore';
import { isString } from 'lodash';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private _firestore: Firestore) {}

  // Documents
  doc<T>(path: string): DocumentReference<T> {
    return doc(this._firestore, path) as DocumentReference<T>;
  }

  docData$<T>(ref: DocumentReference<T> | string): Observable<T> {
    return isString(ref) ? docData(this.doc<T>(ref)) : docData(ref);
  }

  docSnap<T>(ref: DocumentReference<T> | string): Promise<DocumentSnapshot<T>> {
    return isString(ref) ? getDoc(this.doc<T>(ref)) : getDoc(ref);
  }

  docSnap$<T>(
    ref: DocumentReference<T> | string
  ): Observable<DocumentSnapshot<T>> {
    return isString(ref) ? docSnapshots(this.doc<T>(ref)) : docSnapshots(ref);
  }

  patchDoc<T>(ref: DocumentReference<T>, data: Partial<T>): Promise<void> {
    return setDoc<T>(ref, { ...data }, { merge: true });
  }

  batch(): WriteBatch {
    return writeBatch(this._firestore);
  }

  // Collections
  collection<T>(path: string): CollectionReference<T> {
    return collection(this._firestore, path) as CollectionReference<T>;
  }
}
