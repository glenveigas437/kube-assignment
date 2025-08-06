# MERN Stack Kubernetes Deployment with HELM and Jenkins CI/CD

This project demonstrates the complete deployment of a MERN (MongoDB, Express.js, React.js, Node.js) stack application using Kubernetes, HELM charts, and Jenkins CI/CD pipeline.

## 🏗️ Project Structure

```
KubeAssignment/
├── learnerReportCS_backend/     # Node.js/Express backend application
├── learnerReportCS_frontend/    # React frontend application
├── k8s/                         # Kubernetes deployment files
│   ├── backend-deployment.yaml
│   ├── frontend-deployment.yaml
│   └── mongodb-deployment.yaml
├── helm-chart/                  # HELM chart for streamlined deployment
│   ├── Chart.yaml
│   ├── values.yaml
│   └── templates/
│       ├── backend.yaml
│       ├── frontend.yaml
│       └── mongodb.yaml
├── Jenkinsfile                  # Jenkins CI/CD pipeline
└── README.md
```

## 🚀 Features

- **Microservices Architecture**: Separate deployments for frontend, backend, and database
- **Container Orchestration**: Kubernetes deployments with proper service discovery
- **Package Management**: HELM charts for easy configuration and deployment
- **CI/CD Pipeline**: Automated Jenkins pipeline for build and deployment
- **Persistent Storage**: MongoDB with persistent volume claims
- **Environment Configuration**: Configurable environment variables through HELM values

## 🛠️ Technology Stack

- **Frontend**: React.js with Material-UI
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **Package Manager**: HELM
- **CI/CD**: Jenkins
- **Container Registry**: Docker Hub

## 📦 Components

### Backend Application
- **Port**: 3001
- **Framework**: Express.js
- **Features**: Authentication, user management, batch registration, career services
- **Database**: MongoDB connection with Mongoose ODM

### Frontend Application
- **Port**: 3000
- **Framework**: React.js
- **UI Library**: Material-UI, Chakra UI
- **Features**: Admin dashboard, student dashboard, faculty dashboard

### Database
- **Type**: MongoDB
- **Persistence**: Kubernetes Persistent Volume Claims
- **Storage**: 1Gi default (configurable)

## 🚀 Deployment Options

### Option 1: Direct Kubernetes Deployment

```bash
# Deploy all components
kubectl apply -f k8s/

# Check deployment status
kubectl get pods
kubectl get services
```

### Option 2: HELM Chart Deployment (Recommended)

```bash
# Install the HELM chart
helm install learnerreport helm-chart

# Upgrade deployment
helm upgrade learnerreport helm-chart

# Check status
helm status learnerreport
```

## 🔧 Configuration

### HELM Values (helm-chart/values.yaml)

```yaml
replicaCount: 1

backend:
  image: glenveigas4/learnerreport-backend:latest
  port: 3001
  env:
    PORT: 3001
    ATLAS_URI: mongodb://mongodb-service:27017/learner_reportDB
    HASH_KEY: thisIsMyHashKey
    JWT_SECRET_KEY: thisIsMyJwtSecretKey

frontend:
  image: glenveigas4/learnerreport-frontend:latest
  port: 3000
  env:
    REACT_APP_API_BASE_URL: http://backend-service:3001

mongodb:
  image: mongo:latest
  port: 27017
  storage: 1Gi
```

### Environment Variables

| Component | Variable | Description |
|-----------|----------|-------------|
| Backend | PORT | Application port (3001) |
| Backend | ATLAS_URI | MongoDB connection string |
| Backend | HASH_KEY | Password hashing key |
| Backend | JWT_SECRET_KEY | JWT token secret |
| Frontend | REACT_APP_API_BASE_URL | Backend API endpoint |

## 🔄 CI/CD Pipeline

The Jenkins pipeline automates:

1. **Build Stage**: Creates Docker images for frontend and backend
2. **Push Stage**: Uploads images to Docker Hub registry
3. **Deploy Stage**: Deploys application using HELM charts

### Jenkins Pipeline Stages

```groovy
pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        DOCKERHUB_USER = 'glenveigas4'
        BACKEND_IMAGE = "${DOCKERHUB_USER}/learnerreport-backend:latest"
        FRONTEND_IMAGE = "${DOCKERHUB_USER}/learnerreport-frontend:latest"
        HELM_RELEASE = 'learnerreport'
        HELM_CHART_PATH = 'helm-chart'
    }
    stages {
        stage('Build Backend Image') { ... }
        stage('Build Frontend Image') { ... }
        stage('Push Images to Docker Hub') { ... }
        stage('Deploy to Kubernetes with Helm') { ... }
    }
}
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Docker installed and running
- Kubernetes cluster (minikube, kind, or cloud provider)
- HELM 3.x installed
- kubectl configured
- Jenkins (optional, for CI/CD)

### Quick Start

1. **Clone the repository**
```bash
git clone <repository-url>
cd KubeAssignment
```

2. **Build Docker images**
```bash
# Build backend
cd learnerReportCS_backend
docker build -t glenveigas4/learnerreport-backend:latest .

# Build frontend
cd ../learnerReportCS_frontend
docker build -t glenveigas4/learnerreport-frontend:latest .
```

3. **Deploy with HELM**
```bash
cd ..
helm install learnerreport helm-chart
```

4. **Access the application**
```bash
# Get service URLs
kubectl get services

# Port forward to access locally
kubectl port-forward service/frontend-service 3000:3000
kubectl port-forward service/backend-service 3001:3001
```

## 🔍 Verification

### Check Deployment Status
```bash
# Check pods
kubectl get pods

# Check services
kubectl get services

# Check persistent volumes
kubectl get pv,pvc

# HELM status
helm list
helm status learnerreport
```

### Access Logs
```bash
# Backend logs
kubectl logs deployment/backend

# Frontend logs
kubectl logs deployment/frontend

# MongoDB logs
kubectl logs deployment/mongodb
```

## 📊 Monitoring and Scaling

### Scale Deployments
```bash
# Scale backend
kubectl scale deployment backend --replicas=3

# Scale frontend
kubectl scale deployment frontend --replicas=2

# Or using HELM
helm upgrade learnerreport helm-chart --set replicaCount=3
```

### Health Checks
```bash
# Check pod health
kubectl describe pod <pod-name>

# Check service endpoints
kubectl get endpoints
```

## 🔒 Security Considerations

- **Secrets Management**: Store sensitive data in Kubernetes secrets
- **RBAC**: Implement role-based access control
- **Network Policies**: Restrict inter-pod communication
- **Image Security**: Scan Docker images for vulnerabilities

## 🧹 Cleanup

```bash
# Remove HELM deployment
helm uninstall learnerreport

# Remove Kubernetes resources
kubectl delete -f k8s/

# Remove Docker images
docker rmi glenveigas4/learnerreport-backend:latest
docker rmi glenveigas4/learnerreport-frontend:latest
```

## 📝 Assignment Requirements Fulfilled

✅ **Kubernetes Deployment Files**: Complete YAML configurations for all components  
✅ **HELM Chart**: Templated deployments with configurable values  
✅ **Jenkins CI/CD**: Automated build and deployment pipeline  
✅ **MERN Stack**: Full-stack application with MongoDB, Express, React, Node.js  
✅ **Scalability**: Configurable replica counts and resource limits  
✅ **Documentation**: Comprehensive setup and deployment guide  

## 🔗 Repository Links

- **Frontend Repository**: https://github.com/UnpredictablePrashant/learnerReportCS_frontend
- **Backend Repository**: https://github.com/UnpredictablePrashant/learnerReportCS_backend

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test deployments
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note**: This project demonstrates enterprise-grade Kubernetes deployment practices suitable for production environments with proper CI/CD integration. 
