pipeline {
	agent any
	// tools {
	// 	nodejs 'NodeJS'
	// }
	environment {
		DOCKER_HUB_CREDENTIALS_ID = 'dockerhub-credentials'
		DOCKER_HUB_REPO = 'caonam81/grouphive'
		ENV_FILE = credentials('env')
	}
	stages {
    stage('Build') {
            steps {
                script {
                    sh "cat \$ENV_FILE > .env"
                }
            }
    }
		stage('Checkout Github'){
			steps {
				git branch: 'main', credentialsId: 'git', url: 'https://github.com/caonam030402/group-hive-fe'
			}
		}		
		// stage('Install node dependencies'){
		// 	steps {
		// 		sh 'npm install'
		// 	}
		// }
		// stage('Test Code'){
		// 	steps {
		// 		sh 'npm run test'
		// 	}
		// }
		stage('Build Docker Image'){
			steps {
				script {
					dockerImage = docker.build("${DOCKER_HUB_REPO}:latest")
				}
			}
		}
		stage('Push Image to DockerHub'){
			steps {
				script {
					docker.withRegistry('https://registry.hub.docker.com', "${DOCKER_HUB_CREDENTIALS_ID}"){
						dockerImage.push('latest')
					}
				}
			}
		}
	
	}

	post {
		success {
			echo 'Build&Deploy completed succesfully!'
		}
		failure {
			echo 'Build&Deploy failed. Check logs.'
		}
	}
}