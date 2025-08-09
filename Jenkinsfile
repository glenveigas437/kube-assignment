pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds') // Set up in Jenkins
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
                        // Debug: List files to verify Dockerfile exists
                        sh "ls -la"
                        sh "pwd"
                        // Verify Dockerfile content
                        sh "cat Dockerfile"
                        // Build with verbose output
                        sh "docker build -t $BACKEND_IMAGE ."
                    }
                }
            }
        }
        stage('Build Frontend Image') {
            steps {
                dir('learnerReportCS_frontend') {
                    script {
                        // Debug: List files to verify Dockerfile exists
                        sh "ls -la"
                        sh "pwd"
                        // Verify Dockerfile content
                        sh "cat Dockerfile"
                        // Build with verbose output
                        sh "docker build -t $FRONTEND_IMAGE ."
                    }
                }
            }
        }
        stage('Push Images to Docker Hub') {
            steps {
                script {
                    // Debug: Show Docker version and login status
                    sh "docker --version"
                    sh "docker info | grep Username || echo 'Not logged in'"
                    
                    // Login to Docker Hub with better error handling
                    sh """
                        echo "Logging in to Docker Hub as user: \$DOCKERHUB_USER"
                        echo "Password length: \$(echo \$DOCKERHUB_CREDENTIALS_PSW | wc -c)"
                        echo \$DOCKERHUB_CREDENTIALS_PSW | docker login -u \$DOCKERHUB_USER --password-stdin
                    """
                    
                    // Verify login was successful
                    sh "docker info | grep Username"
                    
                    // Push images with simple retry logic
                    sh """
                        echo "Pushing backend image..."
                        docker push $BACKEND_IMAGE || (echo "Backend push failed, retrying..." && sleep 5 && docker push $BACKEND_IMAGE) || (echo "Backend push failed again, final retry..." && sleep 10 && docker push $BACKEND_IMAGE)
                    """
                    
                    sh """
                        echo "Pushing frontend image..."
                        docker push $FRONTEND_IMAGE || (echo "Frontend push failed, retrying..." && sleep 5 && docker push $FRONTEND_IMAGE) || (echo "Frontend push failed again, final retry..." && sleep 10 && docker push $FRONTEND_IMAGE)
                    """
                }
            }
        }
        stage('Deploy to Kubernetes with Helm') {
            steps {
                script {
                    sh "helm upgrade --install $HELM_RELEASE $HELM_CHART_PATH"
                }
            }
        }
    }
}
