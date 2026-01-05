# 📝 ToDo Application with Rate Limiting

A modern full-stack todo/notes application built with React and Node.js/Express, featuring advanced rate limiting using Upstash Redis, MongoDB persistence, and a beautiful gradient UI with Tailwind CSS.

## 📋 Project Overview

This is a comprehensive note-taking application that demonstrates advanced backend concepts like rate limiting, caching, and real-time API constraints. Users can create, read, update, and delete notes with a smooth, modern interface. The app includes production-grade rate limiting to prevent API abuse.

### Key Features
- **Full CRUD Operations**: Create, read, update, and delete notes
- **Advanced Rate Limiting**: Upstash Redis-based sliding window rate limiting (100 requests/minute)
- **MongoDB Persistence**: Persistent note storage with timestamps
- **Modern UI**: Gradient background with Tailwind CSS styling
- **Toast Notifications**: User feedback for all actions
- **Responsive Design**: Mobile-friendly interface
- **Rate Limit UI Feedback**: Visual indicator when rate limit is exceeded
- **Production Ready**: Full error handling and middleware setup

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js with ES modules
- **Framework**: Express.js 5.2
- **Database**: MongoDB with Mongoose ODM
- **Caching & Rate Limiting**: 
  - Upstash Redis for distributed caching
  - @upstash/ratelimit for sliding window rate limiting
  - @upstash/redis for Redis client
- **Middleware**:
  - CORS for cross-origin requests
  - Express JSON parser
  - Custom rate limiting middleware
- **Environment**: Dotenv for configuration
- **Development**: Nodemon for auto-reload

### Frontend
- **UI Library**: React 19.2
- **Build Tool**: Vite 7.2
- **Routing**: React Router DOM 7.11
- **HTTP Client**: Axios 1.13
- **Styling**: 
  - Tailwind CSS 3.4
  - PostCSS & Autoprefixer
  - DaisyUI 4.12 (optional Tailwind components)
- **Icons**: Lucide React 0.562
- **Notifications**: React Hot Toast 2.6
- **Code Quality**: 
  - ESLint for linting
  - Prettier for code formatting

---

## 📁 Project Structure

```
toDo_application/
├── backend/
│   ├── src/
│   │   ├── server.js                # Express app setup and startup
│   │   ├── config/
│   │   │   ├── db.js                # MongoDB connection configuration
│   │   │   └── upstash.js           # Upstash Redis rate limiter setup
│   │   ├── controllers/
│   │   │   └── notesController.js   # Note CRUD operations
│   │   ├── routes/
│   │   │   └── notesRoutes.js       # Note API endpoints
│   │   ├── middleware/
│   │   │   └── ratelimitter.js      # Rate limiting middleware
│   │   └── models/
│   │       └── Note.js              # Note schema definition
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx                 # React entry point
│   │   ├── App.jsx                  # Root component with routing
│   │   ├── App.css                  # Global styles
│   │   ├── index.css                # Base styles
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Top navigation bar
│   │   │   ├── NoteCard.jsx         # Individual note display card
│   │   │   ├── NotesNotFound.jsx    # Empty state component
│   │   │   └── RateLimitedUI.jsx    # Rate limit exceeded component
│   │   ├── pages/
│   │   │   ├── HomePage.jsx         # Note listing page
│   │   │   ├── CreatePage.jsx       # Create/edit note form
│   │   │   ├── NoteDetailPage.jsx   # Full note view
│   │   │   └── ...other pages
│   │   ├── lib/
│   │   │   ├── axios.js             # Axios instance configuration
│   │   │   └── utils.js             # Utility functions
│   │   └── public/                  # Static assets
│   ├── vite.config.js               # Vite configuration
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   ├── postcss.config.js            # PostCSS configuration
│   ├── eslint.config.js             # ESLint configuration
│   └── package.json
│
└── package.json                      # Root monorepo configuration
```

---

## 🔄 How the App Works

### Rate Limiting Architecture

#### Upstash Redis Setup
1. **Redis Connection**: Uses `@upstash/redis` to connect to Upstash cloud Redis
2. **Rate Limiter Configuration**: Sliding window algorithm limits 100 requests per 60 seconds
3. **Environment Variables**: Redis URL and token from Upstash dashboard

```javascript
// Rate Limit: 100 requests per 60 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "60 s"),
});
```

#### How It Works
- Every API request passes through rate limiting middleware
- Client IP tracked to prevent abuse
- If limit exceeded: returns 429 (Too Many Requests)
- Frontend catches error and shows `RateLimitedUI` component
- User must wait before making more requests

### Note Data Flow

#### Frontend Operations
1. **Load Notes**: HomePage component mounts → Axios GET `/api/notes` → Display list
2. **Create Note**: User fills CreatePage form → POST to `/api/notes` → Navigate to detail
3. **Update Note**: User edits → PUT to `/api/notes/:id` → Refresh view
4. **Delete Note**: User confirms delete → DELETE `/api/notes/:id` → Remove from list
5. **View Detail**: Click note → React Router navigates to `/note/:id`

#### Backend Operations
1. **Database Query**: Controller uses Mongoose to query MongoDB
2. **Error Handling**: Try-catch blocks handle validation and DB errors
3. **Response Format**: Standardized JSON responses with status codes
4. **Middleware Chain**: Request → Rate Limit → JSON Parser → CORS → Routes → Controllers

### Component State Flow
```
App.jsx (Routes)
  ├── HomePage.jsx (Fetch & display notes)
  │   ├── Navbar.jsx (Nav menu)
  │   ├── NoteCard.jsx (Individual notes)
  │   └── NotesNotFound.jsx (Empty state)
  ├── CreatePage.jsx (Form for new/edit)
  └── NoteDetailPage.jsx (Full note view)
```

---

## 📊 Data Models

### Note Schema
```javascript
{
  _id: ObjectId (auto-generated),
  title: String (required),
  content: String (required),
  createdAt: Date (auto-set to now),
  updatedAt: Date (auto-set to now)
}
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local or MongoDB Atlas cloud)
- Upstash account (free tier available at upstash.com)
- NPM or Yarn

### Step-by-Step Setup

#### 1. Clone and Navigate
```bash
cd toDo_application
```

#### 2. Set Up Upstash Redis

1. Go to [upstash.com](https://upstash.com)
2. Create free account
3. Create new Redis database (select region)
4. Copy connection details from "REST API" tab
5. You'll need:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

#### 3. Configure Environment Variables

Create `.env` file in the root directory:
```env
# Server Configuration
PORT=5001
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/todo-app
# OR MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todo-app

# Upstash Redis (from dashboard)
UPSTASH_REDIS_REST_URL=https://your-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token_here
```

#### 4. Install Dependencies
```bash
npm run build
```

Installs deps for both backend and frontend.

#### 5. Start Development Server

From the root directory:
```bash
npm run start
```

This runs:
- **Backend**: `npm run start --prefix backend` on port 5001
- **Frontend**: User must run separately

**Or separately:**

Backend (from root or `backend/` directory):
```bash
npm run dev
```
With nodemon for auto-reload on port 5001

Frontend (from `frontend/` directory):
```bash
npm run dev
```
Vite dev server on port 5173

#### 6. Access the Application
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5001`

#### 7. Build for Production
```bash
npm run build
```

Creates optimized production build with frontend bundled.

#### 8. Run Production Build
```bash
npm run start
```

Runs on PORT specified in `.env` (default 5001)

---

## 📡 API Endpoints

### Base URL: `/api/notes`

All endpoints are subject to rate limiting (100 requests per minute).

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|-------------|
| GET | `/` | Get all notes (sorted newest first) | 200, 429, 500 |
| POST | `/` | Create new note | 201, 429, 500 |
| GET | `/:id` | Get single note by ID | 200, 404, 429, 500 |
| PUT | `/:id` | Update note | 200, 404, 429, 500 |
| DELETE | `/:id` | Delete note | 200, 404, 429, 500 |

### Request/Response Examples

**Create Note:**
```bash
POST /api/notes
Content-Type: application/json

{
  "title": "My Note",
  "content": "Note content here"
}

Response: 201 Created
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "My Note",
  "content": "Note content here",
  "createdAt": "2024-01-10T10:30:00.000Z",
  "updatedAt": "2024-01-10T10:30:00.000Z"
}
```

**Rate Limited Response:**
```json
429 Too Many Requests
{
  "message": "Too many requests. Please try again later."
}
```

---

## 🎯 Key Architecture Decisions

### Why Upstash Redis?
- **Distributed Rate Limiting**: Works across multiple server instances
- **Cloud-Based**: No need to manage Redis infrastructure
- **Sliding Window Algorithm**: More accurate than fixed window
- **Free Tier**: Generous free tier for learning
- **REST API**: Can be called from anywhere
- **Reliability**: 99.99% uptime guarantee

### Why Sliding Window Rate Limiting?
- Better than fixed window (prevents burst at window edges)
- Tracks actual request patterns
- Fair to users
- Prevents API abuse effectively

### Middleware Architecture
```
Request → CORS Middleware → Rate Limiter → JSON Parser → Router
                                ↓
                         Check Redis Counter
                                ↓
                      Pass/Reject to Routes
```

### Error Handling Strategy
- Try-catch blocks in all controllers
- Validation before DB operations
- Meaningful HTTP status codes
- Consistent error response format
- Client-side toast notifications

---

## 🎨 Frontend Architecture

### Pages

#### **HomePage.jsx**
- Fetches all notes from backend
- Displays notes in card grid
- Shows empty state if no notes
- Handles rate limit error UI
- Links to create and detail pages

#### **CreatePage.jsx**
- Form for creating new notes
- Text inputs for title and content
- Form validation
- Error handling
- Success notification
- Redirect after creation

#### **NoteDetailPage.jsx**
- Full note view with editing capability
- Uses URL parameter to fetch note
- Edit functionality
- Delete confirmation
- Navigation back to list

### Components

#### **Navbar.jsx**
- Top navigation bar
- Title/branding
- Link to create new note
- Responsive design

#### **NoteCard.jsx**
- Individual note display
- Shows title and preview of content
- Created date
- Edit and delete buttons
- Click to view full note

#### **NotesNotFound.jsx**
- Empty state component
- Shown when no notes exist
- Encourages user to create first note

#### **RateLimitedUI.jsx**
- Displayed when 429 error received
- Shows rate limit message
- Countdown timer (optional)
- Prevents further requests

### Styling

#### **Tailwind CSS**
- Gradient background: `radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)`
- Modern, neon aesthetic
- Responsive utilities
- Custom spacing and sizing

#### **Global Styles**
- CSS variables for theming
- Smooth transitions
- Dark theme by default
- Gradient overlays

---

## 🔒 Security & Rate Limiting

### Rate Limiting Benefits
1. **Prevents DDoS**: Limits requests from single IP
2. **API Protection**: Prevents resource exhaustion
3. **Fair Usage**: Ensures all users get access
4. **Cost Control**: Limits database operations

### Configuration
- **Limit**: 100 requests per 60 seconds
- **Window Type**: Sliding window
- **Storage**: Upstash Redis (distributed)
- **Tracking**: Client IP address

### Frontend Handling
- Catch 429 errors in axios interceptor
- Show `RateLimitedUI` component
- Disable form submission
- Optional countdown timer
- User-friendly error message

---

## 🧪 Development Workflow

### Available Scripts

**Root**:
- `npm run build` - Install deps and build frontend
- `npm run start` - Run backend server

**Backend** (from `backend/` directory):
- `npm run dev` - Start with nodemon auto-reload
- `npm run start` - Run production server

**Frontend** (from `frontend/` directory):
- `npm run dev` - Start Vite dev server with HMR
- `npm run build` - Create production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format with Prettier
- `npm run preview` - Preview production build

---

## 🚢 Deployment

### Environment-Based Configuration

**Development** (NODE_ENV=development):
- CORS enabled for localhost:5173
- Detailed error messages
- Nodemon auto-reload
- Console logs for debugging

**Production** (NODE_ENV=production):
- CORS disabled for non-development
- Frontend served from Express
- Optimized error messages
- No verbose logging

### Deployment Steps

1. **Configure Environment**:
   - Set `NODE_ENV=production`
   - Configure production MongoDB URI
   - Set Upstash credentials

2. **Build**:
   ```bash
   npm run build
   ```

3. **Deploy**:
   ```bash
   npm run start
   ```

4. **Verify**:
   - Backend running on configured PORT
   - Frontend accessible at root path
   - Database connected
   - Rate limiting active

### Deployment Platforms
- **Heroku**: Add `Procfile` with start command
- **Railway**: Auto-detect Node.js
- **Render**: Deploy as Web Service
- **AWS/Azure**: Container or VM deployment

---

## 🐛 Troubleshooting

### Rate Limiter Not Working
- Check Upstash credentials in `.env`
- Verify Redis connection: `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
- Check Upstash dashboard for database status
- Review backend logs for connection errors

### MongoDB Connection Issues
- Verify `MONGODB_URI` format
- For MongoDB Atlas: whitelist your IP
- Check connection string username/password
- Ensure MongoDB service is running (local)

### Frontend Not Loading
```bash
# Clear cache and rebuild
rm -rf frontend/dist node_modules
npm run build
```

### 429 Errors in Development
- This is normal if making many requests
- Wait 60 seconds for window to reset
- Or restart server to clear Redis cache (optional)
- Adjust limit in `upstash.js` if needed for testing

---

## 💡 Learning Outcomes

This project demonstrates:
- **Advanced Backend Patterns**: Rate limiting and caching
- **Distributed Systems**: Using cloud Redis for scaling
- **Full-Stack Development**: Complete application flow
- **Error Handling**: Production-grade error management
- **Middleware Architecture**: Custom middleware design
- **API Design**: RESTful principles
- **Frontend/Backend Integration**: Proper error handling
- **Production Deployment**: Environment configuration
- **Code Quality**: ESLint and Prettier setup

---

## 🔑 Key Concepts Explained

### Sliding Window Rate Limiting
Unlike fixed windows that reset at specific times, sliding windows track the actual request timeline:
- Each request timestamp recorded in Redis
- Old requests (>60 seconds) automatically dropped
- More accurate and fair distribution

### Upstash Redis vs Local Redis
- **Upstash**: Cloud-based, auto-managed, scalable
- **Local**: Requires setup, single server only
- **Use Upstash**: For production, distributed systems
- **Use Local**: For development only

### Why Middleware?
- Single point of request validation
- Applies to all routes automatically
- Clean separation of concerns
- Easy to test and maintain
- Can be chained for multiple checks

---

## 📚 File Dependencies

Key relationships:
- `App.jsx` → Routes to all pages
- `HomePage.jsx` → Uses axios to fetch notes, renders NoteCard
- `CreatePage.jsx` → POST to `/api/notes`
- `NoteDetailPage.jsx` → GET from `/api/notes/:id`
- `RateLimitedUI.jsx` → Shown on 429 errors
- `ratelimitter.js` → Applied to all `/api/notes` routes
- `notesController.js` → Handles all database operations

---

## 🤝 Contributing

This is a personal learning project. Feel free to fork and modify!

---

## 📄 License

ISC License

---

## 🎓 Next Steps for Learning

1. **Add Authentication**: Implement user-specific notes
2. **WebSockets**: Real-time note updates
3. **Caching**: Implement Redis caching for note reads
4. **Testing**: Add Jest/Vitest tests
5. **Database Optimization**: Add indexes for faster queries
6. **Advanced Middleware**: Custom authentication middleware
7. **Search**: Full-text search capability
8. **Tags/Categories**: Organize notes better
