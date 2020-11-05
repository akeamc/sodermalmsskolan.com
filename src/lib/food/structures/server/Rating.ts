import { Rating } from "../shared/Rating";
import admin from "../../../firebase/admin";

export class ServerRating extends Rating {
  public static get firebaseCollectionName(): string {
    return "ratings";
  }

  public static firebaseCollection(): FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData
  > {
    const db = admin.firestore();

    return db.collection(ServerRating.firebaseCollectionName);
  }

  public static fromFirebaseDoc(
    document: FirebaseFirestore.QueryDocumentSnapshot<
      FirebaseFirestore.DocumentData
    >
  ): ServerRating {
    const data = document.data();

    return new ServerRating({
      author: data.author,
      dish: data.dish,
      rating: data.rating,
      timestamp: document.createTime.toDate().toISOString(),
    });
  }

  public static async fetchAll(): Promise<ServerRating[]> {
    const snapshot = await ServerRating.firebaseCollection().get();

    return snapshot.docs.map(ServerRating.fromFirebaseDoc);
  }

  public static async fetchByDish(dish: string): Promise<ServerRating[]> {
    const snapshot = await ServerRating.firebaseCollection()
      .where("dish", "==", dish)
      .get();

    return snapshot.docs.map(ServerRating.fromFirebaseDoc);
  }
}
