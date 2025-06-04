# Warehouse Management System

A web-based Warehouse Management System designed to streamline and optimize inventory, shipments, and user management. Built with React, Node.js, and Vite.

## Features

- **User Authentication:** Secure login/logout, role-based access.

- **Inventory Management:** Add, update, search, and delete items.

- **Category Filtering:** Filter inventory by categories (Statinery, Electronics, General, etc.).

- **Shipments Tracking:** Track incoming and outgoing shipments.

- **Supplier Management:** Manage supplier data.

- **User Management:** Admin interface for managing system users.

- **RESTful API Integration:** Connects frontend to backend for dynamic data operations.

## Tech Stack

- **Frontend:** React, React Router, CSS.

- **Backend:** Node.js

- **Database:** Fetch API for HTTP requests

## Getting Started

### App Access

- Visit https://app.netlify.com/projects/group-11-warehousemanagementsystem in your browser .

### Prerequisites 

- Node.js (v16+ recommended)

- npm

### Installation 

1. **Clone the repository:**
   ```bash
    git clone https://github.com/Moringa-SDF-PT10/group-11-project.git

   cd group-11-project
   ``` 

2. **Install dependencies:**

   ```bash
   npm install 
   ```

3. **Start the development server:**

```bash
npm start dev
```
Access the app at [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  components/     # Reusable React components

  context/        # React context for authentication

  pages/          # Page components (Dashboard, Inventory, etc.)

  App.jsx         # Main React App

  App.css         # Global styles

public/           # Static assets

README.md
```

## Contributing

1. Fork the repository

2. Create your feature branch (`git checkout -b feature/my-feature`)

3. Commit your changes (`git commit -am 'Add new feature'`)

4. Push to the branch (`git push origin feature/my-feature`)

5. Open a Pull Request

## License

[MIT](LICENSE)

---

**Developed by Moringa SDF PT10 Group 11**