import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import http from "@/client/axios";

export type SessionUser = {
  authenticated: boolean;
  user?: string;
  message?: string;
};

async function userRoute(
  req: NextApiRequest,
  res: NextApiResponse<SessionUser>
) {
  if (req.session.user) {
    try {
      const token = req.session.user?.["token"];
      if (!token) throw new Error("Invalid auth!");
      const userRes = await http.get("/account/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const { currentUser } = userRes.data;
      res.json({ user: { ...currentUser, token }, authenticated: true });
    } catch (error) {
      res.status(401).send({ authenticated: false, message: "Invalid auth!" });
    }
  } else {
    res.status(401).send({ authenticated: false });
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
