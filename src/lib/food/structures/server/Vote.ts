import { Vote } from "../shared/Vote";
import { ServerDish } from "./Dish";

export class ServerVote extends Vote {
  public static firestoreCollection(
    dish: string
  ): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> {
    return ServerDish.firestoreDocument(dish).collection("votes");
  }

  public static firestoreDocument(
    dish: string,
    author: string
  ): FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData> {
    return ServerVote.firestoreCollection(dish).doc(author);
  }

  /**
   * Create a `ServerVote` from a Firestore document.
   * @param document
   */
  public static fromFirestoreDocument(
    document: FirebaseFirestore.QueryDocumentSnapshot<
      FirebaseFirestore.DocumentData
    >
  ): ServerVote {
    const data = document.data();

    return new ServerVote({
      author: document.ref.id,
      dish: document.ref.parent.parent.id,
      positive: data.positive,
      timestamp: document.updateTime.toDate().toISOString(),
    });
  }

  public static async fetchByDish(dish: string): Promise<ServerVote[]> {
    const snapshot = await ServerVote.firestoreCollection(dish).get();

    return snapshot.docs.map(ServerVote.fromFirestoreDocument);
  }

  /**
   * Save to the database.
   */
  public static async create({
    dish,
    author,
    positive,
  }: {
    dish: string;
    author: string;
    positive: boolean;
  }): Promise<FirebaseFirestore.WriteResult> {
    return ServerVote.firestoreCollection(dish).doc(author).set({
      positive,
    });
  }

  public static async delete({
    dish,
    author,
  }: {
    dish: string;
    author: string;
  }): Promise<FirebaseFirestore.WriteResult> {
    return ServerVote.firestoreCollection(dish).doc(author).delete();
  }
}
