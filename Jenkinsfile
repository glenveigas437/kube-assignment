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
                        sh "docker build -t $BACKEND_IMAGE ."
                    }
                }
            }
        }
        stage('Build Frontend Image') {
            steps {
                dir('learnerReportCS_frontend') {
                    script {
                        sh "docker build -t $FRONTEND_IMAGE ."
                    }
                }
            }
        }
        stage('Push Images to Docker Hub') {
            steps {
                script {
                    sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_USER --password-stdin"
                    sh "docker push $BACKEND_IMAGE"
                    sh "docker push $FRONTEND_IMAGE"
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
