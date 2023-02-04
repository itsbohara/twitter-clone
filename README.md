# Twitter Clone

Full-Stack Twitter clone web app built with Next.Js / React.Js / Tailwind & Radix UI.

- Backend - Node.Js / MongoDB

![Preview of built clone](./public/demo-clone.jpg)

## Features

- 🚧 google/twitter login - (✅ Google Login)
- ✅ Text/Image tweet - [!only-1-image]
- ✅ like/reply to tweet, retweet
- ✅ search/follow/unfollow users
- ✅ user profile, update profile
- ✅ Notifications for follow, tweet like/reply
- ✅ Twitter blue <img src="./public/twitter-blue.svg" height="15"> Badge
- ✅ profile cover upload, profile/cover/tweet-image zoom-imageViewer

## TODO

- [ ] tweet notification
- [ ] quote retweet
- [ ] tweet tags
- [ ] Fix - Full screen Image viewer

## Getting Started ⚡️

- Clone this repo:

```bash
  git clone https://github.com/itsbohara/twitter-clone
```

- Config `.env` using reference `.env.example` file

To install the packages:

```bash
bun install
# or
npm install
```

To run the development server:

```bash
bun run dev
# or
npm run dev
```

- 🔥 Use [bun](https://bun.sh) instead of `npm` for speed🚀

Twitter clone will be live on `localhost:3000` and start experimenting the functionalities or begin adding yours 😉

### Project Structure

- _`client`_ - axios api client
- _`components`_ - shared components used across - the app
- _`contexts`_ - context providers
- _`guards`_ - route guards
- _`hooks`_ - shared hooks
- _`redux`_ - global app store
- _`sections`_ - part of pages, composition of components
- _`pages`_ - main app pages
- _`utils`_ - shared utility functions

### Backend Server 🗄️

I have used Node/Mongo/Express for backend server implementation.

- Repo Link - https://github.com/mblearningprojects/twitter-clone-server

### Special Thanks

I would like to give special thanks to [royquilor](https://github.com/royquilor) for awesome [twitter-ui-clone](https://github.com/royquilor/twitter-ui-practise) implementation.

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
