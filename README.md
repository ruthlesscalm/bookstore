# Bookstore

A server-rendered bookstore application built with Express, EJS, and MongoDB.

## Features

* Create, read, update, and delete books
* Server-side rendering using EJS
* MongoDB for data storage
* Express-based backend

## Note
* No actual book content is stored, only book metadata.
  
## Tech Stack

* Node.js
* Express
* EJS
* MongoDB

## Getting Started

### Prerequisites

* Node.js and npm
* MongoDB database

### Installation

```bash
git clone https://github.com/ruthlesscalm/bookstore.git
cd bookstore
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
HOSTNAME=localhost
MONGODB_URI=<your-mongodb-connection-string>
```

### Development

Terminal 1:

```bash
npm run tailwind
```

Terminal 2:

```bash
npm run dev
```

Visit:

```text
http://localhost:3000
```

## License

This project is licensed under the MIT License.

Feel free to use the code for learning, experimentation, or reference.
