# The Shape Store Demo

This tiny local development hosted store uses React running on Vite with React Router, with a NodeJS backend for delivery of data. 

I wrote this from scratch by hand using Copilot sparingly for suggestions for type errors and such. When I _do_ use Copilot in VSCode it's more of a question / answer bot to resolve issues, suggest changes that I then adapt to my liking. Creating 1000 lines of code with an agent, then having another agent review it and pushing to prod is a bad idea.

Styling is done with tailwind CSS and ShadCN. 

Compound component used for the Shape Cards, and context used for handling state of cart.

While this is a very basic implimentation, future enchancements could include:
* Authentication and JSON Web Tokens for API security
* Rate limiting middleware for the API
* Request logging, for metrics and security
* All the other cart stuff we love: remove items, update quantities
* Product pages that show full details
* Search functionality for shapes listing page
* Automated testing / linting

If there are specifics that need to be demo'd let me know I will impliment.

// Christopher

## How to serve on local

1. Clone the codebase to your local machine from [git@github.com:christophervlapa/shape-store.git](git@github.com:christophervlapa/shape-store.git)
2. Install deps `npm install`
3. Open your fave terminal (I use ZSH with ohmyzsh) and run `node server/app.cjs` to start the NodeJS API server
4. Open a new terminal tab and run `npm run dev`
5. In a browser go to [http://localhost:5173/](http://localhost:5173/)

## NOTE!!!
I would NEVER commit `.env.local` to a repo. It's only included to demo the security aspect 🙂

---
---

# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
