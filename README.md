# Take‑Home Assessment

Welcome, candidate! This project contains **intentional issues** that mimic real‑world scenarios.
Your task is to refactor, optimize, and fix these problems.

## Objectives

### 💻 Frontend (React)

1. **Memory Leak**  
   - `Items.js` leaks memory if the component unmounts before fetch completes. Fix it. [Done, fixed it by passing a callback to check if the component is still mounted]

2. **Pagination & Search**  
   - Implement paginated list with server‑side search (`q` param). Contribute to both client and server. [Done, Fixed the issue with limit and also performance issue with q being converted to lowercase in the filter loop]

3. **Performance**  
   - The list can grow large. Integrate **virtualization** (e.g., `react-window`) to keep UI smooth. [Done, Built a custom virtualized list instead of installing any virtualization package]

4. **UI/UX Polish(optional)**  
   - Feel free to enhance styling, accessibility, and add loading/skeleton states.

### 🔧 Backend (Node.js)

1. **Refactor blocking I/O**  
   - `src/routes/items.js` uses `fs.readFileSync`. Replace with non‑blocking async operations. [Done, Replaced all synchronous file operations with asynchronous (promise based) approach]

2. **Performance**  
   - `GET /api/stats` recalculates stats on every request. Cache results, watch file changes, or introduce a smarter strategy. [Done, Refactored api handler to use asynchronous file read operation and cache data with support for items change check to optimize it. Also used the mean method from the utils]

3. **Additional things**
   - Replaced all synchronous file operations with asynchronous (promise based) approach
   - Add validation checks in create api with proper error response


## ⏰ Time Expectation

- Estimated time to complete: **1–2 hours**.

## 📤 Submission

Once completed, submit one of the following:

- **short video** recording your work.
- **Github Link** where your assessment result were pushed.

---

## Quick Start

node version: 18.XX
```bash
nvm install 18
nvm use 18

# Terminal 1
cd backend
npm install
npm start

# Terminal 2
cd frontend
npm install
npm start
```

> The frontend proxies `/api` requests to `http://localhost:4001`.