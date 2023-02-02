import http from "@/client/axios";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "@/lib/session";

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body;
  try {
    const loginRes = await http.post("/account/googleLogin", { token });
    const { token: sessionToken } = loginRes.data;
    const userRes = await http.get("/account/me", {
      headers: { Authorization: `Bearer ${sessionToken}` },
    });
    const user = { data: userRes.data["currentUser"], token };
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error: any) {
    res.status(401).json({ message: error?.message ?? error?.toString() });
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
