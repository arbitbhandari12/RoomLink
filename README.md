 Installation and Setup Instructions
🔍 Clone the Repository
bash
Copy
Edit
git clone https://github.com/arbitbhandari12/RoomLink.git
cd RoomLink
📦 Install Frontend Dependencies
bash
Copy
Edit
cd frontend
npm install
📦 Install Backend Dependencies
bash
Copy
Edit
cd ../backend
npm install
🛠️ Setup MongoDB
Make sure MongoDB and MongoDB Compass are installed locally.

Start your MongoDB server.

Open MongoDB Compass to create your database and collections.

🚀 Run the Application
▶️ Start Backend
bash
Copy
Edit
cd backend
npx nodemon server.js
▶️ Start Frontend
In a new terminal:

bash
Copy
Edit
cd frontend
npm run dev
🌐 Application URLs
Frontend: http://localhost:5173

Backend: http://localhost:4001
