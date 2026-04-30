# Docker Deployment Guide for Quizzard on Coolify

This guide explains how to build and deploy Quizzard using Docker on your Proxmox server with Coolify.

## Overview

The Quizzard application is split into two separate Docker containers:
- **Backend**: Node.js API server
- **Frontend**: Nginx web server serving React app

## Files Included

- `backend/Dockerfile` - Backend container configuration
- `frontend/Dockerfile` - Frontend container configuration
- `.dockerignore` - Files to exclude from Docker builds
- `docker-compose.yml` - For local testing (optional)
- `.env.docker.example` - Environment variables template

## Building Docker Images

### Backend Image

```bash
cd backend
docker build -t quizzard-backend:latest .
```

### Frontend Image

```bash
cd frontend
docker build -t quizzard-frontend:latest .
```

## Deploying on Coolify (Proxmox)

### 1. Backend Deployment

In Coolify, create a new application and use:

```
Builder: Dockerfile
Dockerfile Path: ./backend/Dockerfile
Port: 5000
```

**Environment Variables:**
```
MONGODB_URI=mongodb://your-mongo-host:27017/quizzard
JWT_SECRET=your_super_secret_key_here
ADMIN_EMAILS=admin1@example.com,admin2@example.com
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=production
```

### 2. Frontend Deployment

In Coolify, create another application and use:

```
Builder: Dockerfile
Dockerfile Path: ./frontend/Dockerfile
Port: 80
```

**Environment Variables:**
```
VITE_API_URL=https://your-api-domain.com/api
```

Replace `https://your-api-domain.com` with your actual backend URL.

## Local Testing with Docker Compose

To test both services together locally:

```bash
# Create .env file in project root
cp .env.docker.example .env

# Edit .env with your values (especially GEMINI_API_KEY)

# Build and run
docker-compose up --build

# Access:
# Frontend: http://localhost
# Backend: http://localhost:5000
# MongoDB: localhost:27017
```

## Environment Variables

### Backend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://mongo:27017/quizzard` |
| `JWT_SECRET` | JWT signing secret (change in production!) | `your_secret_key` |
| `ADMIN_EMAILS` | Comma-separated admin emails | `admin@example.com,mod@example.com` |
| `GEMINI_API_KEY` | Google Gemini API key | `AIzaSyD...` |
| `NODE_ENV` | Environment (production/development) | `production` |
| `PORT` | Server port | `5000` |

### Frontend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `https://api.your-domain.com` |

## Database Setup

For MongoDB, you have options:

### Option 1: Use MongoDB Atlas (Cloud)
- Create free account at https://www.mongodb.com/cloud/atlas
- Set `MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/quizzard`

### Option 2: Self-hosted MongoDB on Proxmox
- Deploy MongoDB container in Coolify
- Use internal network URL: `mongodb://mongo-container:27017/quizzard`

### Option 3: Docker Compose Stack
- MongoDB is included in the `docker-compose.yml`
- Perfect for local development and testing

## Health Checks

Both containers include health checks:

**Backend**: Pings `/api` endpoint
```
GET http://localhost:5000/api
```

**Frontend**: Checks if Nginx is responding
```
GET http://localhost/
```

## Performance Tips

1. **Caching**: Frontend Dockerfile caches static assets for 1 year
2. **Multi-stage builds**: Reduces final image size by excluding build dependencies
3. **Alpine Linux**: Used for smaller image footprint
4. **Non-root user**: Both containers run as non-root users for security
5. **Health checks**: Automatic container recovery on failure

## Troubleshooting

### Container won't start
```bash
docker logs <container-id>
```

### Backend can't connect to MongoDB
- Check `MONGODB_URI` is correct
- Ensure MongoDB is running and accessible
- Verify network connectivity (firewall rules)

### Frontend shows blank page
- Check browser console for errors
- Verify `VITE_API_URL` points to correct backend
- Check CORS headers in backend

### Build fails
```bash
# Clear Docker cache and rebuild
docker build --no-cache -t quizzard-backend:latest ./backend
```

## Image Sizes

- **Backend**: ~180MB (Alpine Node.js + dependencies)
- **Frontend**: ~20MB (Alpine Nginx + static files)

## Security Notes

⚠️ **Important for Production:**

1. Change `JWT_SECRET` to a random secure string
2. Use strong MongoDB passwords
3. Enable SSL/TLS in Coolify
4. Use environment variables (never hardcode secrets)
5. Set `NODE_ENV=production`
6. Use strong `ADMIN_EMAILS` passwords
7. Regularly update base images

## Docker Registry Push (Optional)

To push images to a private registry:

```bash
docker tag quizzard-backend:latest your-registry.com/quizzard-backend:latest
docker push your-registry.com/quizzard-backend:latest

docker tag quizzard-frontend:latest your-registry.com/quizzard-frontend:latest
docker push your-registry.com/quizzard-frontend:latest
```

## Updates & Redeployment

To update the application:

1. Make code changes
2. Push to repository
3. In Coolify, trigger a rebuild (auto or manual)
4. Containers will restart with new code

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Coolify Documentation](https://coolify.io/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Nginx Official Image](https://hub.docker.com/_/nginx)
- [Node.js Official Image](https://hub.docker.com/_/node)

---

For questions or issues, create an issue in the GitHub repository.
