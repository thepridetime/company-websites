# AWS Deployment Guide for The Pride Times Backend

This backend service is containerized and ready for production deployment on AWS using any of the following architectures:

## Architecture Options

### Option 1: AWS App Runner (Fastest, Fully Managed Serverless Containers)
- **Best for:** Rapid production rollout with zero infrastructure maintenance.
- **Steps:**
  1. Open **AWS App Runner** in AWS Management Console.
  2. Choose **Source code repository** (connected to GitHub) or **Container registry** (Amazon ECR).
  3. Set build command: `npm install`
  4. Set start command: `node server.js`
  5. Port: `8080`
  6. Health check path: `/health`

### Option 2: AWS Elastic Beanstalk (Docker Platform)
- **Best for:** Traditional EC2-backed microservices with built-in auto-scaling and ALB.
- **Steps:**
  1. Create an Application in **Elastic Beanstalk**.
  2. Platform: **Docker** (running on 64bit Amazon Linux 2023).
  3. Upload the `backend/` folder as a `.zip` archive containing `Dockerfile`, `package.json`, and `server.js`.
  4. Set environment variable `PORT=8080`.

### Option 3: AWS ECS (Elastic Container Service) with Fargate
- **Best for:** High-scale enterprise deployments with strict VPC isolation.
- **Workflow:**
  1. Build and push image to **Amazon ECR** via the included GitHub Action (`.github/workflows/aws-backend-deploy.yml`).
  2. Create a Fargate Task Definition pointing to the ECR image with `8080:8080` port mapping.
  3. Attach an **Application Load Balancer (ALB)** with target group health check at `/health`.

## Environment Variables
- `PORT`: `8080` (default)
- `NODE_ENV`: `production`
- `ALLOWED_ORIGINS`: Comma-separated list of allowed frontend domains (e.g. `https://thepridetime.com,http://localhost:5173`)
