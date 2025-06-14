# Next.js Frontend Project
This is a Next.js frontend project that has been containerized using Docker for easy development, testing, and deployment.

# Environment Variables Setup
This project uses environment variables to manage configuration values. To keep sensitive data out of the source code, environment variables are defined in an .env.local file, which is ignored by Git.

1. Copy the Example File
Run the following command in the project root to create your own .env.local file:
cp .env.example .env.local

2. Edit .env.local
Open the .env.local file and fill in the missing values:
NEXT_PUBLIC_IMAGE_URL=/images/
NEXT_PUBLIC_BACKEND_URL=your_backend_url
NEXT_PUBLIC_WS_URL=your_ws_url
NEXT_PUBLIC_WORDPRESS_URL=your_wordpress_url

3. Restart the Next.js server (if already running):
npm run dev

# How to Build and Run the Project Development Mode

1. Install dependencies:
npm install

2. Start the development server:
npm run dev

3. Open http://localhost:3000 in your browser.

# How to Build and Run the Project with Docker

1. Build the Docker Image
Run the following command in the project root to build the Docker image:
docker build -t next-frontend .
- This command creates a Docker image named `next-frontend` using the `Dockerfile`.

2. Run the Docker Container
Start a container from the built image in detached mode:
docker run -d -p 3000:3000 next-frontend

- `-d`: Runs the container in the background.
- `-p 3000:3000`: Maps port 3000 on your host to port 3000 in the container.

3. Access the Application
Open your browser and navigate to:
http://localhost:3000

The Next.js application should be up and running.

4. Stop and Remove the Container (Optional)
To stop and remove the running container:
docker ps
docker stop <container-id>
docker rm <container-id>

5. Troubleshooting

**Port Conflict**: If port 3000 is already in use, you can map a different host port, e.g., `-p 3001:3000`.

**Build Issues**: Ensure you have enough disk space and memory allocated to Docker (check Docker Desktop settings on Windows/Mac).

**Application Not Loading**: Check container logs for errors:
  docker logs <container-id>

