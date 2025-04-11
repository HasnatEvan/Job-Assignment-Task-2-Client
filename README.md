📚 Book Listing Application
This is a book listing application built using the public Gutendex API. The application is developed with React, Tailwind CSS, DaisyUI, React Icons, and uses localStorage to save wishlist and preferences.

🔗 Live Link : https://lambent-seahorse-766dad.netlify.app/

🚀 Features
🔍 Real-time Search: Filter books by title.

📂 Genre Filter: Dropdown to filter books by genre/topic.

❤️ Wishlist System: Add or remove books from the wishlist using a like/love icon (stored in localStorage).

📄 Book Details Page: View more info about a specific book.

📑 Pagination: Browse books using numbered pagination (1, 2, 3…).

📱 Responsive Design: Fully optimized for mobile and desktop devices.

🧭 Routing: Includes Home, Wishlist, and Book Details pages.

💾 Persistence: User's search and filter preferences are saved in localStorage.

🛠️ Technologies Used
React JS

React Router DOM

Tailwind CSS

DaisyUI

React Icons

Local Storage (Browser API)

📁 Folder Structure
arduino
Copy
Edit
📦 book-app
├── 📂 public
├── 📂 src
│   ├── 📂 components
│   │   ├── Navbar.jsx
│   │   ├── BookCard.jsx
│   │   ├── WishlistCard.jsx
│   │   └── Pagination.jsx
│   ├── 📂 pages
│   │   ├── Home.jsx
│   │   ├── Wishlist.jsx
│   │   └── BookDetails.jsx
│   ├── 📂 utils
│   │   ├── api.js
│   │   └── localStorage.js
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js
└── README.md
📸 Screenshots
Add your screenshots here if available.

🧠 SOLID Principles Followed
Single Responsibility: Each component has one responsibility.

Open/Closed: Components are extendable via props, but closed for direct modification.

Liskov Substitution: Props-based render ensures reusable and replaceable components.

Interface Segregation: Small, specific components.

Dependency Inversion: Components rely on hooks/utilities instead of hardcoded logic.

📦 Installation & Setup
bash
Copy
Edit
git clone https://github.com/your-username/book-listing-app.git
cd book-listing-app
npm install
npm run dev
📝 Author
Hasnat Evan


✅ Task Requirement Checklist
 Fetch books from Gutendex API

 Display title, author, genre, image, and id

 Real-time search

 Filter by genre/topic

 Wishlist using localStorage

 Pagination

 Book details page

 Navbar

 Responsive Design

 SOLID principles

 Deployed and pushed to GitHub with proper commits

🔗 