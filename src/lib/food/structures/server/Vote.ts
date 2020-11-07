import admin from "firebase-admin";
import { Vote } from "../shared/Vote";
import { ServerDish } from "./Dish";

const FieldValue = admin.firestore.FieldValue;

export class ServerVote extends Vote {
  public static firestoreDocument(
    dish: string
  ): FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData> {
    return ServerDish.firestoreDocument(dish);
  }

  /**
   * Create a `ServerVote` from a Firestore document.
   * @param document
   */
  public static fromFirestoreDocument(
    document: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
  ): ServerVote[] {
    if (!document.exists) {
      return [];
    }

    const data = document.data();

    const base = {
      dish: document.id,
      timestamp: document.updateTime.toDate().toISOString(),
    };

    return [
      ...data?.upvotes?.map(
        (author) => new ServerVote({ ...base, author, up: true })
      ),
      ...data?.downvotes?.map(
        (author) => new ServerVote({ ...base, author, up: false })
      ),
    ];

    // return new ServerVote({
    //   author: document.ref.id,
    //   dish: document.ref.parent.parent.id,
    //   positive: data.positive,
    //   timestamp: document.updateTime.toDate().toISOString(),
    // });
  }

  public static async fetchByDish(dish: string): Promise<ServerVote[]> {
    const document = await ServerVote.firestoreDocument(dish).get();

    return ServerVote.fromFirestoreDocument(document);
  }

  /**
   * Save to the database.
   */
  public static async create({
    dish,
    author,
    up,
  }: {
    dish: string;
    author: string;
    up: boolean;
  }): Promise<FirebaseFirestore.WriteResult> {
    const upvotes = up
      ? FieldValue.arrayUnion(author)
      : FieldValue.arrayRemove(author);
    const downvotes = up
      ? FieldValue.arrayRemove(author)
      : FieldValue.arrayUnion(author);

    return ServerVote.firestoreDocument(dish).set(
      {
        upvotes,
        downvotes,
      },
      { merge: true }
    );
  }

  public static async delete({
    dish,
    author,
  }: {
    dish: string;
    author: string;
  }): Promise<FirebaseFirestore.WriteResult> {
    return ServerVote.firestoreDocument(dish).update({
      upvotes: FieldValue.arrayRemove(author),
      downvotes: FieldValue.arrayRemove(author),
    });
  }
}
