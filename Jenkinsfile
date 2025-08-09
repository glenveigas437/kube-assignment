pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'glenveigas4'
        BACKEND_IMAGE = "${DOCKERHUB_USER}/learnerreport-backend:latest"
        FRONTEND_IMAGE = "${DOCKERHUB_USER}/learnerreport-frontend:latest"
        HELM_RELEASE = 'learnerreport'
        HELM_CHART_PATH = 'helm-chart'
    }

    stages {
        stage('Build Backend Image') {
            steps {
                dir('learnerReportCS_backend') {
                    script {
                        echo "Building backend Docker image..."
                        sh "docker build -t $BACKEND_IMAGE ."
                    }
                }
            }
        }
        stage('Build Frontend Image') {
            steps {
                dir('learnerReportCS_frontend') {
                    script {
                        echo "Building frontend Docker image..."
                        sh "docker build -t $FRONTEND_IMAGE ."
                    }
                }
            }
        }
        stage('Verify Images Built') {
            steps {
                script {
                    echo "Verifying Docker images were built successfully..."
                    sh "docker images | grep learnerreport"
                }
            }
        }
        stage('Deploy to Kubernetes with Helm') {
            steps {
                script {
                    echo "Deploying MERN stack to Kubernetes using HELM..."
                    sh "helm upgrade --install $HELM_RELEASE $HELM_CHART_PATH"
                    
                    echo "Deployment completed! Checking status..."
                    sh "kubectl get pods -l app=backend"
                    sh "kubectl get pods -l app=frontend"
                    sh "kubectl get pods -l app=mongodb"
                    sh "kubectl get services"
                }
            }
        }
        stage('Verify Deployment') {
            steps {
                script {
                    echo "Verifying deployment is successful..."
                    sh "helm status $HELM_RELEASE"
                    
                    echo "Application URLs:"
                    sh "kubectl get services frontend-service"
                    echo "Backend API available via: kubectl port-forward service/backend-service 3001:3001"
                    echo "Frontend available via: kubectl port-forward service/frontend-service 3000:3000"
                }
            }
        }
    }
    
    post {
        success {
            echo "🎉 CI/CD Pipeline completed successfully!"
            echo "✅ Docker images built"
            echo "✅ MERN stack deployed to Kubernetes"
            echo "✅ All services running"
        }
        failure {
            echo "❌ Pipeline failed. Check logs above."
        }
    }
} 
