import {Injectable} from "@angular/core";

import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
import {AuthService} from "./auth.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  /*
  constructor(private auth: AuthService, private firestore: AngularFirestore, private storage: Storage) {}

  async uploadImage(cameraFile: Photo) {
    const user = this.auth.userData;
    const path = `uploads/${user.uid}/profile.webp`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');

      const imageUrl = await getDownloadURL(storageRef);

      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userDocRef, {
        imageUrl
      });
      return true;
    } catch (e) {
      return null;
    }
  }
   */
  constructor(private afs: AngularFirestore,  public afAuth: AngularFireAuth, private auth: AuthService,
              private storage: AngularFireStorage) {}

  async uploadImage(cameraFile: Photo) {
    const user = this.auth.userData;
    const path = `uploads/${user.uid}/profile.webp`;
    const storageRef = this.storage.ref(path);
    const fileUploadTask = this.storage.upload(path, cameraFile);

    const upload = storageRef.child(path);
    const imgURL = await storageRef.getDownloadURL();

    //const imageUrl = await getDownloadURL(storageRef);

    const link = storageRef.getDownloadURL();

    const profile = {
      photoURL: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
    }

    return (await this.afAuth.currentUser).updateProfile(profile);
  }

}
