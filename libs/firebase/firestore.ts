import {
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  setDoc,
  WriteBatch,
  writeBatch,
  Firestore,
} from 'firebase/firestore';
import { isString } from 'lodash';

// Documents
export function doc<T>(
  database: Firestore,
  path: string
): DocumentReference<T> {
  return doc(database, path) as DocumentReference<T>;
}

export function docSnap<T>(
  database: Firestore,
  ref: DocumentReference<T> | string
): Promise<DocumentSnapshot<T>> {
  return isString(ref) ? getDoc(doc<T>(database, ref)) : getDoc(ref);
}

export function patchDoc<T>(
  ref: DocumentReference<T>,
  data: Partial<T>
): Promise<void> {
  return setDoc<T>(ref, { ...data }, { merge: true });
}

export function batch(database: Firestore): WriteBatch {
  return writeBatch(database);
}

// Collections
export function collection<T>(
  database: Firestore,
  path: string
): CollectionReference<T> {
  return collection(database, path) as CollectionReference<T>;
}
