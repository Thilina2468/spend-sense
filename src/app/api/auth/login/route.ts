import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export async function POST(req: Request){
    try {
        const {email, password} = await req.json()

        if (!email || !password) {
            return Response.json({ error: "Email and password required" }, { status: 400 });
        }

        const { user } = await signInWithEmailAndPassword( auth, email, password)
        const token = await user.getIdToken()
        console.log("Login successful for user:", user.uid, user.email);
        
        return Response.json({ success: true, uid: user.uid, email: user.email, token }, { status: 200 });

    } catch (error: any) {
        console.error("Login error:", error);
        return Response.json({ error: error?.message || "Login failed" }, { status: 400 });
    }
}