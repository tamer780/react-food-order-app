# React Food Order App

A food-ordering practice project with a React frontend and a local Express API. Users can browse meals, manage cart quantities, enter delivery details, and submit an order.

## Features

- Fetch meals and images from the local API.
- Add and remove cart items with derived quantity and price totals.
- Open cart and checkout dialogs.
- Validate checkout fields with React 19 `useActionState`.
- Display request errors and an order confirmation.
- Clear the cart when the confirmation is dismissed.

## Stack

**Frontend:** React 19, Redux Toolkit, React Redux, Tailwind CSS 4, Vite.  
**Local API:** Node.js, Express, JSON-file storage.

## Run locally

Use a Node.js version compatible with the Vite version in `package.json`. Start both processes in separate terminals.

### 1. Start the API

```bash
git clone https://github.com/tamer780/react-food-order-app.git
cd react-food-order-app/backend
npm install
npm start
```

The API runs at `http://localhost:3000`. Run the command from `backend/` because the server uses relative paths for data and images.

### 2. Start the frontend

From the repository root:

```bash
npm ci
npm run dev
```

Open the URL printed by Vite. Meal and order requests currently use the local API on port 3000.

## Design decisions

- `cartSlice` handles item quantities and totals; `uiSlice` controls the active dialog.
- A reusable request hook separates fetching from component rendering.
- Shared inputs and a portal-backed modal support the cart and checkout flow.
- Client-side checkout validation preserves entered values after errors.

Suggested review: [cart state](src/store/cartSlice.js), [checkout](src/components/cart/Checkout.jsx), and [Express routes](backend/app.js).

## Refactor history

The existing [migration pull request](https://github.com/tamer780/react-food-order-app/pull/1) documents the move from Context API and native CSS to Redux Toolkit and Tailwind CSS. The original README points to [v1.0](https://github.com/tamer780/react-food-order-app/tree/v1.0) for the earlier implementation.

## Demo boundaries

Orders are stored in `backend/data/orders.json`. This is a local learning API without payment processing or a database-backed production order system. Use fictional customer details when trying the demo. No automated test suite is included.

## Frontend checks

```bash
npm run lint
npm run build
npm run preview
```

A frontend build does not bundle or start the Express API.
