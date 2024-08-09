def notifyLINE(emoji, status) {
    def url = 'https://notify-api.line.me/api/notify'
    def message = "${emoji} Build ${JOB_NAME}:${buildTag} ${status}  \r\n"

    sh """
    curl -X POST ${url} \
    -H 'Authorization: Bearer ${LINE_TOKEN}' \
    -F 'message=${message}'
    """
}

pipeline {
    agent any
    environment {
        LINE_TOKEN = credentials('LINE_TOKEN')
        containerName = 'iats-frontend'
        registryName = 'arigatopix/iats-frontend'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-cred-arigatopix')
        GIT_SSH_CREDENTIALS = credentials('github-arigatopix')
        prodCredentials = 'devskill-server-credentials'
        user = 'n2itchallenge'
        serverIP = '172.30.200.193'
        server = "${user}@${serverIP}"
        buildTag = "v1.0.0-${BUILD_NUMBER}" // Dynamic build tag
        APP_PATH = "/home/${user}/app/iats/frontend"
    }

    stages {
        stage('login dockerhub') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }

        stage('build images latest') {
            steps {
                script {
                    sh "docker buildx build --push -t ${registryName}:${buildTag} --platform=linux/amd64 -f ./docker/Dockerfile ."
                    env.BUILD_TAG = buildTag
                }
            }
        }

        stage('replace placeholders and copy docker-compose to production') {
            steps {
                sshagent([prodCredentials]) {
                    script {
                        // Update docker-compose file with new image tag
                        sh "sed -i 's#arigatopix/iats-frontend:.*#arigatopix/iats-frontend:${env.BUILD_TAG}#' ./docker/docker-compose-prod.yaml"

                        // Copy existing .env file from production server
                        sh "scp -o StrictHostKeyChecking=no ${server}:${APP_PATH}/.env ./.env"

                        // Update the REGISTRY_NAME and IMAGE_TAG in the copied .env file
                        sh "sed -i 's|^REGISTRY_NAME=.*|REGISTRY_NAME=${registryName}|' .env"
                        sh "sed -i 's|^IMAGE_TAG=.*|IMAGE_TAG=${env.BUILD_TAG}|' .env"

                        // Ensure .env file exists on production server or pass environment variables
                        sh "ssh -o StrictHostKeyChecking=no ${server} mkdir -p ${APP_PATH}"
                        sh "scp -o StrictHostKeyChecking=no ./docker/docker-compose-prod.yaml ${server}:${APP_PATH}/docker-compose-prod.yaml"
                        sh "scp -o StrictHostKeyChecking=no .env ${server}:${APP_PATH}/.env"
                        sh "ssh -o StrictHostKeyChecking=no ${server} docker compose -f ${APP_PATH}/docker-compose-prod.yaml pull"
                        sh "ssh -o StrictHostKeyChecking=no ${server} docker compose -f ${APP_PATH}/docker-compose-prod.yaml up -d"
                    }
                }
            }
        }
    }

    post {
        success {
            notifyLINE('🎉',"succeed > ${serverIP}")
        }
        failure {
            notifyLINE('😰', 'failed')
        }
        always {
            script {
                sh """
          docker rm -f ${containerName} || true
          docker image rm -f ${registryName}:${env.BUILD_TAG} || true
          docker logout
        """
            }
        }
    }
}
