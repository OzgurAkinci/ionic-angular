import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private ngFirestore: AngularFirestore) {}

  getItem() {
    return this.ngFirestore.collection('items').snapshotChanges();
  }

}
