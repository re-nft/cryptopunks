# Cryptopunks Lending & Renting Protocol

With utmost respect,

![reNFT-logo](https://user-images.githubusercontent.com/13678461/111640139-cd885a00-87f3-11eb-89dd-4373e4de378d.png)

## Contributions

Our issues are split into xxx categories

- 🎨 denotes predominantly works pertaining to front-end spec below
- 🧠 denotes predominantly works pertaining to protocol spec / subgraph

Issue format is the following

`{emoji} - {if front: endpoint} - {description}`

To contribute, create a branch with the id of the issue you are tackling. **One PR per one issue only, please!**

We are using Tailwindcss for our front-end for 10x development. If you are working on a front-end task, have a look here to pick which components you need

https://tailwindui.com/components

Then, drop all the required components in the issue you are working in and I will share the HTML code snippet with you. 

When submitting a PR, ensure all checks pass. Only PRs that are fully checked out can be merged.

## Spec

### Protocol Spec

- web3 call to og crypto punks. create offer 8 8s and length. Also add protocol version (this one is v0)

### Frontend Spec

- Filtering in Cryptopunks
  - **requires filters**
  - view all cryptopunks gifted (superset of the below)
  - view cryptopunks gifted to me (subset of the above)
  - view cryptopunks I gifted (subset of all, by definition lol)
  - under each punk view extra info (current owner, current tenant, tenancy dates)
- Click on a punk, modal window opens
  - **requires subgraph**
  - details on a punk
  - owner
  - tenant
  - tenancy dates
  - provenance history
  - *if owner*: lend the punk (created the offer to address or plain offer to as per protocol)
- FAQ
  - section about how it works
  - section about responsibilities of the renter and the lender

- Optional
  - little notes section for yourself, to remind you where you have used the cryptopunks
    this is useful for when the renting period ends to remind you where you need to take it off
  - email notification for when the due date is coming up
  - ability to view lender's address
  - filtering / sorting
  - highly useful. API to change all / some of your social avatars with the cryptopunk you have just rented out. Likewise, enable unsetting. (we can do this super easily with Next.js)
  - only owner can change details about the punk. When clicking on a punk, show the punk's provenance + owners' details. (plural)

- Future
  - view cryptopunks available for rent
  - web3 call to og crypto punks. create bid. 4 1s. This will accept tenancy rights.

### Services

- subgraph
  - pull all cryptopunks curently gifted to someone
- pull all cryptopunks (there is an image). There should be an API, too

### Comms

- renft cryptopunk leasing support channel?

## Tech

### Next.js

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
