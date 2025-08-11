// lib/leaderboard.ts
import { db, getDeviceId } from "./firebase";
import { addDoc, collection, serverTimestamp, query, orderBy, limit, onSnapshot } from "firebase/firestore";

export async function submitScore(name: string, score: number) {
  const deviceId = await getDeviceId(); // optional
  return addDoc(collection(db, "leaderboard"), {
    name: name.trim(),
    score,
    createdAt: serverTimestamp(),
    deviceId,
  });
}

export function watchTopScores(
  onRows: (rows: Array<{ id: string; name: string; score: number; createdAt: any }>) => void,
  topN = 50
) {
  const q = query(collection(db, "leaderboard"), orderBy("score", "desc"), orderBy("createdAt", "asc"), limit(topN));
  return onSnapshot(q, (snap) => onRows(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))));
}
