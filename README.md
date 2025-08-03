# NirogGyan Assignment

**Live:** [https://niroggyan-assignment-frontend.onrender.com/](https://niroggyan-assignment-frontend.onrender.com/)

---

## Tools / Libraries Used

- **React** – For building the frontend user interface.  
- **React Router** – For client-side routing and navigation.  
- **Node.js** – Backend runtime environment.  
- **Express** – Web framework for building REST APIs.  
- **SQLite3** – Lightweight database for storing doctors and appointments data.  
- **Git & GitHub** – Version control and code repository.  
- **VS Code** – Development environment.  
- **Render** – Platform used for deploying both frontend and backend applications.  
- **Perplexity AI** – Used to generate sample data and images for the project.

---

## Improvements with More Time

- **Authentication & Authorization:** Implement user login and role-based access control to secure sensitive data and user-specific actions.  
- **Saving Appointments in Database:** Enable full backend integration to save, update, and manage appointments persistently.  
- **Add Minimal Simple Animations:** Enhance UI with subtle animations for buttons, transitions, and loading indicators to improve user experience.  
- **Work on Color Theory:** Refine the app’s color palette for better aesthetics, accessibility, and visual harmony across the interface.  
- **Advanced Features:** Appointment reminders, calendar integration, and doctor availability management.

---

## Challenges Faced and Solutions

- **Managing `.gitignore` for Node Modules and Lock Files**  
  Needed to prevent committing unnecessary files like `node_modules` and `package-lock.json` to keep repo clean.  
  *Solution:* Created a `.gitignore` file with appropriate paths to exclude these folders/files before committing.

- **Image Handling and Styling Challenges**  
  Needed to fit profile images in limited container space without cropping important parts.  
  *Solution:* Used CSS techniques like `object-fit: cover` and tailored container styles to ensure the head portion of images was visible and consistent.

- **API Integration and State Management**  
  Faced challenges managing API calls and state synchronization between frontend and backend components.  
  *Solution:* Used React hooks with fetch requests and implemented conditional rendering for loading, error, and success states.
