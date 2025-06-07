Signature Generator App

A simple React application that allows users to draw signatures, customize pen width, and download the signature as a transparent PNG image. The app uses the react-signature-canvas library to enable signature drawing on a canvas.

Live Demo: https://draw-signature-app.vercel.app/
Features

    Draw signatures on a canvas with a white background for visibility.
    Adjust pen width using a slider (0.5 to 10).
    Clear the canvas to start over.
    Download the signature as a PNG image with a transparent background.
    Responsive design for desktop and mobile use.

Technologies Used

    React: Frontend framework (v19.1.0).
    react-signature-canvas: Library for canvas-based signature drawing (v1.1.0-alpha.2).
    Vercel: Hosting and deployment platform.
    CSS: Basic styling for the canvas and UI.

Installation

To run this project locally, follow these steps:

    Clone the Repository:
    bash

git clone <repository-url>
cd signature-app
Install Dependencies: Ensure you have Node.js installed, then run:
bash
npm install
Run the App Locally: Start the development server:
bash
npm start
The app will be available at http://localhost:3000.
Build for Production (Optional): To create a production build:
bash
npm run build
