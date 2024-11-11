# Real-Time Page Synchronization with WebSocket

This project demonstrates a real-time page synchronization system built with React and WebSockets. It allows a single user (the "admin") to control which page is displayed across multiple client connections (the "viewers").  

## How It Works

1. **WebSocket Server:**
   - A Node.js server with the `ws` library handles all WebSocket connections.
   - It manages user roles (admin and viewer) and broadcasts messages to all connected clients.
   - The server keeps track of the `currentPage` and sends it to newly connected users.

2. **Admin Interface:**
   - The admin interface (an `Admin` component in React) is responsible for:
     - Navigating between pages using "Previous" and "Next" buttons.
     - Sending `pageChange` messages to the WebSocket server to inform viewers of the updated page.

3. **Viewer Interface:**
   - The viewer interface (a `Viewer` component in React) is responsible for:
     - Receiving page change messages from the server.
     - Displaying the current page number, updating in real-time when the admin changes the page.

4. **WebSocket Communication:**
   - The server and client communicate using WebSockets, allowing for efficient real-time updates.
   - The `react-use-websocket` library is used on the client side to handle WebSocket connections and messages.



## Running the Application

### Steps to Run the App:

1. **Open Multiple Browser Tabs**: You'll need at least two tabs:
    - **Admin Tab**: In one tab, click the "Login as Admin" button.
    - **Viewer Tabs**: In the other tabs, click "Login as Viewer".

2. **Admin Navigation**: The admin can use "Previous" and "Next" buttons to change pages.

3. **Real-Time Synchronization**: All viewer tabs will instantly update to display the same page as the admin.

---

## Detailed Walkthrough

### 1. **User Connection**:
   - When a new user connects, the server assigns them a unique ID and checks if they're the first user (making them the admin).

### 2. **Page Change**:
   - The admin clicks "Previous" or "Next". This triggers an event in the Admin component:
     - The admin component sends a `pageChange` message with the updated page number to the WebSocket server.

### 3. **Broadcasting**:
   - The server receives this message and broadcasts it to all connected viewers.

### 4. **Viewer Updates**:
   - The Viewer components receive the `pageChange` message, update their `currentPage` state, and re-render to display the new page number.

---

## Technology Explanation

### 1. **WebSockets**:
   - WebSockets provide a persistent, bi-directional communication channel between the server and clients, enabling real-time updates without the need for constant polling.

### 2. **ws Library**:
   - Used for handling WebSockets on the server side.

### 3. **react-use-websocket Library**:
   - Used on the client side to connect to the WebSocket server and handle messages efficiently.

---

## Project Setup

1. **Clone the Repository**:
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. **Install Dependencies**:
    - On the server:
      ```bash
      cd server
      npm install
      ```

    - On the client:
      ```bash
      cd client
      npm install
      ```

3. **Run the Application**:
    - Start the backend (server) on port 4000:
      ```bash
      npm start
      ```
    - Start the frontend (client) on port 3000:
      ```bash
      npm run start
      ```

4. **Test the Real-Time Sync**:
    - Open the app in multiple browser tabs. One tab should be the admin, and the others should be viewers.
    - When the admin changes the page, the viewers' pages should update in real time.

---

## How It Works:

- **Admin Controls**:
    - The admin can click "Previous" or "Next" to navigate through pages.
    - A WebSocket message is sent to the server with the new page number.

- **Viewer Controls**:
    - Viewers receive the page change message from the WebSocket server and update their page to match the admin's.

---

## Technologies Used:

- **React**: A JavaScript library for building user interfaces.
- **WebSockets**: For real-time communication between the client and server.
- **Express**: A minimal web framework for Node.js.
- **react-use-websocket**: A React hook for handling WebSocket connections.
- **ws**: A WebSocket library for Node.js.
