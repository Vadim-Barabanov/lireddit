# Simple FullStack Reddit clone

### Technologies used:

-   **UI:** React + Next.js + Chakra UI
-   **GraphQL Client:** URQL/Apollo
-   **Server:** Express + Apollo-Server-GraphQL + TypeGraphQL
-   **ORM:** MikroORM/TypeORM
-   **Database:** PostgreSQL, Redis

### How to run project on your PC:

Requirements:

    -   node.js
    -   yarn
    -   PostgreSQL
    -   Redis
    -   Create "lireddit" data base, or change its name in `server/src/index.ts`

1. Clone repo on your machine
2. cd into server folder and run `yarn watch` and after compiling run `yarn dev`
3. cd into web folder and run `yarn dev`
4. Open browser and go to -> `localhost:3000/`
5. If you want to check grapqhql -> `localhost:4000/grapqhql`

### Author:

[Vadim Barabanov](https://vadim-barabanov.netlify.app)
