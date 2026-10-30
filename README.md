# Full Stack Development Lab - Submission Repositary

# Group Project (Blog website)
A miniature Twitter / community-forum clone built with the MERN stack (MongoDB, Express, React, Node).
People post short text updates with an optional image, like and comment (with nested replies), and follow each other to shape their feed.

## Features

- **Accounts** – register / log in with JWT auth (7-day tokens, bcrypt-hashed passwords, rate-limited auth routes).
- **Dynamic feed** – Home shows posts from people you follow plus your own, newest first, with infinite scroll.
  The page polls every 30s and offers a "Show N new posts" banner. Explore shows everyone's posts (guests can browse it).
- **Posts with images** – up to 280 characters and one JPEG/PNG/GIF/WebP image (5 MB max), uploaded with multer.
  `@mentions` link to profiles; `#hashtags` and URLs are styled.
- **Likes** – on posts and comments, optimistic UI, one like per user enforced by a unique index.
- **Nested comments** – replies to replies, collapsible branches, up to 6 levels deep (deeper replies become siblings).
  Authors can delete their comments; a post's author can delete any comment on their post.
- **Follower / following graph** – follow and unfollow, follower and following lists, "follows you" badge,
  and "People to follow" suggestions ranked by mutual follows (friends-of-friends).
- **Profiles** – avatar, bio, counts, posts / followers / following tabs, edit profile with avatar upload.
- **Search** – debounced people search by username or display name.
- Light and dark themes (follows the OS setting), responsive down to phone width.

## Quick start

Requirements: Node 18+ and a MongoDB instance (local `mongod`, Docker, or a free MongoDB Atlas cluster).

```bash
# 1. install everything
npm run install:all

# 2. configure the API
cp server/.env.example server/.env      # then edit MONGO_URI / JWT_SECRET if needed

# 3. (optional) load demo data — only runs on an empty database
npm run seed                            # add `-- --reset` to wipe and reseed

# 4. run API (http://localhost:5000) and React app (http://localhost:5173) together
npm run dev
```

Open http://localhost:5173. After seeding, log in as `maya`, `dev`, `sofia`, `kenji` or `amara` with password `password123`.

Need MongoDB quickly? `docker run -d -p 27017:27017 --name murmur-mongo mongo:7`

### Production-style run

```bash
npm run build     # builds client/dist
npm start         # API serves the built client at http://localhost:5000 (needs JWT_SECRET set)
```

## Project structure

```
murmur/
├── server/
│   └── src/
│       ├── index.js, app.js        # bootstrap, middleware, routing
│       ├── models/                 # User, Post, Comment, Follow, Like
│       ├── routes/                 # auth, users, posts, comments
│       ├── middleware/             # auth (JWT), upload (multer), error handling
│       ├── lib/                    # pagination + viewer-state helpers, like toggle
│       └── seed.js                 # demo data
└── client/
    └── src/
        ├── api.js                  # fetch wrapper (token, errors, FormData)
        ├── context/AuthContext.jsx
        ├── hooks/useInfiniteList.js
        ├── components/             # PostCard, PostComposer, CommentThread, FollowButton, ...
        └── pages/                  # Home, Explore, Profile, PostDetail, AuthPage
```

## Data model

| Collection | Key fields | Notes |
| --- | --- | --- |
| `User` | username, email, password (hashed, `select: false`), displayName, bio, avatar, followersCount, followingCount, postsCount | Counters are denormalised for cheap profile reads |
| `Post` | author, text, image, likesCount, commentsCount | Index `{author, _id:-1}` serves the feed and profile timelines |
| `Comment` | post, author, parent, depth, text, likesCount | Parent-reference tree; one query loads a thread, the client builds the tree |
| `Follow` | follower → following | One document per edge, unique `{follower, following}`; indexed both directions |
| `Like` | user, targetType (`Post`/`Comment`), target | Unique `{user, targetType, target}` makes liking idempotent and race-safe |

# Assignments
Assignment-1 is submitted for Static Web page using html, css and javascript.

# Assignment-2 (Individual Project - Taak Manager)
Task manager map is a simple end-to-end react project to Manage and Track Tasks or Activities read more in README.md.

# Observation
Submitted 1-9 experiments in pdf.

# E-record
Submitted e-record pdf from codetantra.

# Group Project Members
 P.Daswanth - A24126552270
 J.Mahesh - A24126552271
 B.Simha Girish - A24126552272
 P.Chetan - A24126552273
 I.Kanishk - A24126552274


