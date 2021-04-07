# Cryptopunks Lending & Renting Protocol

## Spec

---

### Protocol Spec

- web3 call to og crypto punks. create offer 8 8s and length. Also add protocol version (this one is v0)
- (protocol v1) web3 call to og crypto punks. create bid. 4 1s.

### Frontend Spec

- Filtering in Cryptopunks
  - *requires filters*
  - view your cryptopunks
  - view cryptopunks available for rent
  - view cryptopunks offered to me as a gift
  - view cryptopunks you are renting
  - view cryptopunks you are lending
  - view rent end date
- Click on a punk, modal window opens
  - *requires subgraph*
  - details on punk
  - owner
  - tenant
  - lease end date
  - provenance history
  - if owner: lend the punk (created the offer to address or plain offer to as per protocol)
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
  - accept the tenant rights (create bid offer)

### Services

- subgraph
  - pull all cryptopunks curently gifted to someone
- pull all cryptopunks (there is an image). There should be an API, too

### Comms

- renft cryptopunk leasing support channel?

## Tech

---

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
