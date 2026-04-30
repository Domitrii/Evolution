Evolution — Gaming E-Commerce Store

A university assignment project built as part of the FdSc/BSc Computer Science programme at University College Birmingham.

## Live Demo: evolution-sepia.vercel.app

<img width="1470" height="956" alt="Screenshot 2026-04-30 at 11 50 39" src="https://github.com/user-attachments/assets/3256e3d2-609e-4dc7-b6fb-b28984a01477" />


## Project Overview
Evolution is a gaming-oriented e-commerce web application developed as a web development coursework assignment. The goal of this project was to design and build a fully functional, responsive front-end for an online store specialising in video games across PC and console platforms, as well as hardware equipment and product reviews.
The brief required demonstrating practical skills in modern web development — including component-based architecture, client-side routing, form handling, and responsive UI design — while producing a product that mirrors the functionality of real-world gaming retailers.
The site was inspired by and critically compared against existing platforms such as Instant Gaming, examining how Evolution's design and features align with or differ from industry standards.

## Purpose

This project was built to:

Apply front-end development skills in a realistic, project-based context
Demonstrate understanding of React, TypeScript, and component-driven design
Implement a complete e-commerce UI including product listings, navigation, and checkout-style forms
Practice responsive design principles across different screen sizes
Deploy a production-ready application using modern tooling (Vite + Vercel)


## Features

Game listings — Browse games available for various PC and console formats
Hardware section — Equipment listings alongside game products
Product reviews — User-facing review and rating display
Responsive layout — Adapts to desktop, tablet, and mobile screens
Form validation — Handled with Formik and Yup for a smooth user experience
Toast notifications — Instant feedback for user actions
Featured content carousel — Highlighted deals and new releases via React Slick
Client-side routing — Seamless page navigation with React Router DOM
SEO meta management — Page titles and metadata handled with React Helmet Async


## Tech Stack

- Framework: React 19
Language: TypeScript 5.9
Build Tool: Vite 7 
Styling: SCSS (Sass)
Routing: React Router DOM v7
Forms & Validation: Formik + Yup
HTTP Client: Axios 
Notifications: React Hot Toast
Icons: React Icons
Carousel: React Slick
Progress UI: React Circular Progressbar
SEO: React Helmet Async
Deployment: Vercel

## Running the Project Locally

Prerequisites

Node.js v18 or higher
npm

Steps
bash# Clone the repository
git clone https://github.com/Domitrii/Evolution.git

# Navigate into the project directory
cd Evolution

# Install dependencies
npm install

# Start the development server
npm run dev
The app will be available at http://localhost:5173.
Other Scripts
bashnpm run build      # Build for production
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint checks

## Project Structure

Evolution/
├── public/          # Static assets (favicon, images)
├── src/             # All application source code
│   ├── components/  # Reusable UI components
│   ├── pages/       # Page-level views
│   └── assets/      # Images and media files
├── index.html
├── vite.config.ts
├── vercel.json      # Vercel SPA routing config
└── package.json

## Deployment
The project is deployed on Vercel. A vercel.json configuration file is included to correctly handle client-side routing, ensuring direct URL access and page refreshes work as expected in a single-page application.

## Academic Context
Student: Dmitrii Kopyrin
Institution: University College Birmingham
Programme: FdSc/BSc Computer Science
Module: Web Development
Academic Year: 2024/25
