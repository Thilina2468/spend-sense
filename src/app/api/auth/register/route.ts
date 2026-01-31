import { createUserWithEmailAndPassword } from "firebase/auth";
  import { doc, serverTimestamp, setDoc } from "firebase/firestore";
  import { auth, db } from "@/lib/firebase";

  export async function POST(req: Request) {
    try {
      const { name, email, password } = await req.json();

      if (!name || !email || !password) {
        return Response.json({ error: "Name, Email and password required" }, { status: 400 });
      }

      if (password.length < 6) {
        return Response.json({ error: "Password must be 6+ characters" }, { status: 400 });
      }

      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: user.email,
        createdAt: serverTimestamp(),
      });

      return Response.json(
        { success: true, uid: user.uid, email: user.email },
        { status: 201 }
      );
    } catch (error: any) {
      return Response.json({ error: error.message }, { status: 400 });
    }
  }