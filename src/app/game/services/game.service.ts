import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {firestore} from 'firebase';
import DocumentReference = firestore.DocumentReference;
import {Game} from '../models/game';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  collectionName = 'games';
  games: Game[] = [];

  constructor(private firestore1: AngularFirestore) {
  }

  /**
   * if customerId is null the customer data will be inserted, else it will be merged into Firebase data
   * @param customerId customer Id
   * @param customer customer Object
   */
  // saveCustomer(customerId: string, customer: Partial<Game>): Promise<DocumentReference | void> {
  //   if (customerId) {
  //     delete customer.id;
  //     if (!customer.createdOn) {
  //       // @ts-ignore
  //       customer.createdOn = firestore.FieldValue.serverTimestamp();
  //     }
  //     console.log(customer);
  //     Object.keys(customer).map((key) => {
  //       if (!customer[key]) {
  //         customer[key] = null;
  //       }
  //     });
  //     return this.firestore1.collection(this.collectionName).doc(customerId).set(customer, {merge: true});
  //   } else {
  //     return this.firestore1.collection(this.collectionName).add(customer);
  //   }
  // }

  async getGames(): Promise<Game[]> {
    const games = await this.firestore1.collection(this.collectionName).ref.get();
    this.games = games.docs.map(g => {
      console.log('this is g', g.data());
      // @ts-ignore
      return new Game(g.data().level, g.data().name, g.data().data);
    });
    return this.games;
  }

  public getGame(level: number) {
    return this.games.find(g => g.level === level);
  }

  //
  // async getCustomerById(customerId: string): Promise<Customer> {
  //   const customer = await this.firestore1.collection(this.collectionName).ref.doc(customerId).get();
  //   const customer1 = customer.data() as Customer;
  //   customer1.id = customer.id;
  //   return customer1;
  // }
  //
  // async getVisitors(): Promise<Customer[]> {
  //   const customers = await this.firestore1.collection(this.collectionName).ref.get();
  //   return customers.docs.map(customer => {
  //     const customer1 = customer.data() as Customer;
  //     return customerFromJson(customer.id, customer.data());
  //   }).filter(x => !x.hasOrders)
  //     .sort((x, y) => {
  //       if (x.lastLogin && y.lastLogin) {
  //         return x.lastLogin.isBefore(y.lastLogin) ? 1 : -1;
  //       } else if (x.lastLogin && !y.lastLogin) {
  //         return 1;
  //       } else if (!x.lastLogin && y.lastLogin) {
  //         return -1;
  //       } else {
  //         return 0;
  //       }
  //     });
  // }
  //
  // async createCustomerDocReference(): Promise<string> {
  //   let id = '';
  //   let docSnapshot: firestore.DocumentSnapshot = null;
  //   let loopBreaker = 0;
  //   do {
  //     id = this.firestore1.createId();
  //     docSnapshot = await this.firestore1.collection(this.collectionName).doc(id).get().toPromise();
  //     loopBreaker++;
  //     if (loopBreaker > 10) {
  //       console.error('CustomersService', 'could not generate a unique Id for the document');
  //       break;
  //     }
  //   } while (docSnapshot.exists);
  //   return id;
  // }

  // setIsCalled(docID: string, isCalledParam: boolean): Promise<void> {
  //   return this.firestore1.collection(this.collectionName).doc(docID).set({
  //     isCalled: isCalledParam,
  //     calledOn: firestore.FieldValue.serverTimestamp()
  //   }, {merge: true});
  // }

}
