# Simple FullStack Reddit clone

### Technologies used:

| Part of App        | Technology                                  |
| ------------------ | ------------------------------------------- |
| **UI**             | React, Next.js, Chakra UI                   |
| **GraphQL Client** | Apollo                                      |
| **Server**         | Express, Apollo-Server-GraphQL, TypeGrpahQL |
| **ORM**            | TypeORM                                     |
| **Database**       | PostgreSQL, Redis                           |

### Description:

This is simple a fullstack project that copying some Reddit functionality. You can create, delete and update your own posts, see posts of other people and updoot or downdoot them.

User functionality:

-   Register with email, username and password
-   Login with email or username and password
-   Reset password by following link, that was sent on his(her) email
-   CRUD operations with post
-   Upvote/Downvote post

### How to run project on your PC:

Requirements:

-   Node.js + yarn
-   PostgreSQL, Redis
-   Fill your data (DB name, pass etc.) in `server/src/index.ts`

Steps:

1. `git clone https://github.com/Vadim-Barabanov/lireddit.git`
2. `cd lireddit/server && yarn watch` , Ctrl + c after compiling and then `yarn dev`
3. `cd lireddit/web && yarn dev`
4. Open browser and go to -> `localhost:3000/`

In case you want to check grapqhql -> `localhost:4000/grapqhql`

### Author:

[Vadim Barabanov](https://vadim-barabanov.netlify.app)
