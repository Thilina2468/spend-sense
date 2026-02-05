import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validatePassword(password: string): string | null {
  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain an uppercase letter";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain a lowercase letter";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain a number";
  }
  return null;
}

function getErrorMessage(errorCode?: string): string {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "This email is already registered";
    case "auth/invalid-email":
      return "The email address is invalid";
    case "auth/weak-password":
      return "The password is too weak";
    default:
      return "Registration failed. Please try again later";
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return Response.json({ error: "Name, email and password required" }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(email)) {
      return Response.json({ error: "Invalid email format" }, { status: 400 });
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return Response.json({ error: passwordError }, { status: 400 });
    }

    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: user.email,
      createdAt: serverTimestamp(),
    });

    const token = await user.getIdToken();
    console.log("Registration successful for user:", user.uid, user.email);
    
    return Response.json(
      { success: true, uid: user.uid, email: user.email, token },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    const errorCode = error?.code;
    const clientMessage = getErrorMessage(errorCode);
    return Response.json({ error: clientMessage }, { status: 400 });
  }
}
