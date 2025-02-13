pipeline {
	agent any
	tools {
		nodejs 'NodeJS'
	}
	environment {
		DOCKER_HUB_CREDENTIALS_ID = 'dockerhub-credentials'
		DOCKER_HUB_REPO = 'caonam81/grouphive'
	}
	stages {
		stage('Checkout Github'){
			steps {
				git branch: 'main', credentialsId: '062613d5-1ed5-4c3c-bbb0-f63789a76e32', url: 'https://github.com/caonam030402/group-hive-fe'
			}
		}		
		// stage('Install node dependencies'){
		// 	steps {
		// 		sh 'npm install'
		// 	}
		// }
		// stage('Test Code'){
		// 	steps {
		// 		sh 'npm test'
		// 	}
		// }
		stage('Build Docker Image'){
			steps {
				script {
					dockerImage = docker.build("${DOCKER_HUB_REPO}:latest")
				}
			}
		}
		stage('Trivy Scan'){
			steps {
				sh 'trivy --severity HIGH,CRITICAL --no-progress image --format table -o trivy-scan-report.txt ${DOCKER_HUB_REPO}:latest'
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
		// stage('Install Kubectl'){
		// 	steps {
		// 		sh '''
		// 		curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
    //             		chmod +x kubectl
    //             		mv kubectl /usr/local/bin/kubectl
		// 		'''
		// 	}
		// }
		// stage('Deploy to Kubernetes'){
		// 	steps {
		// 		script {
		// 			kubeconfig(caCertificate: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURCakNDQWU2Z0F3SUJBZ0lCQVRBTkJna3Foa2lHOXcwQkFRc0ZBREFWTVJNd0VRWURWUVFERXdwdGFXNXAKYTNWaVpVTkJNQjRYRFRJME1Ea3dOekU1TXpjMU5sb1hEVE0wTURrd05qRTVNemMxTmxvd0ZURVRNQkVHQTFVRQpBeE1LYldsdWFXdDFZbVZEUVRDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnRVBBRENDQVFvQ2dnRUJBTkVrCnJ1RTFqZCs0NC8rYkJPZEZpT1oyUWhzYklHSzVLVG1Talc4WEZ4V201NTQ3QXZYemNxU1dnSE5VSTllNjJ3N1UKcUxMREhXWDhPYmFuUDlKUjF4VkNNWWQ0cVBxcXRWS0kwT3h5bkdTNmRzV05La2FMVldJdVc3b0dIeXJBTnVwMAo3bEF6Q3RnWmZPU3N4cDNBL3grVGpYbWpGNlplWkdxdUoxOVJCZ1N3ZFdWc1NBQ0VHM3RZRnFKd1JEL1Z3bzV1CndyT1ZTdUs5M1ZNUDh1REhveDZ6RkZ5Yk5TdW1xSEptcWRIUUFvb0lleWJjVDNTQ1RaRkttQjJzNmV6NnZRM0IKZVhBaTQwQ3NoZjlUMzhTYlVvRXNtb0FQdktHQURyc2RDNUVpZ0JJdWNKTzBtSjZTblk3THZ2Q2hIKzhPR1orNAp3bW1XcGt6TkpnM0xkZk9RRmkwQ0F3RUFBYU5oTUY4d0RnWURWUjBQQVFIL0JBUURBZ0trTUIwR0ExVWRKUVFXCk1CUUdDQ3NHQVFVRkJ3TUNCZ2dyQmdFRkJRY0RBVEFQQmdOVkhSTUJBZjhFQlRBREFRSC9NQjBHQTFVZERnUVcKQkJRaVFkbFFIRUhtUklTZFQ2cmF4MFZ0cGpBOGJUQU5CZ2txaGtpRzl3MEJBUXNGQUFPQ0FRRUFZMjRzRXpmTQpZZHl4Szd6bjc4VklYMUFNK0xDVHQyOTFPb3Roa1loajFxYXJJMzZSMEhYVXZRa3FaYVFSUXhxQWZsMnhSaVd2CkY1VUlJbm9YcmVxTFdhNVk4emh0dFJxK05rZU9iaXV4MzhIb1FWWTl4dG5BcFh2TE9RanF4LzZhcVlzdjJpNUgKTmpJMWQxdWVWMmJGVHZWODJlRDdxNWNabXpPaFJxcWNPUVBvYkZPNW9qbXpLTVh1ajZ3VlpWNlk4cmdzTlFOeQpuZU00NEg0NmU5OW9hZTlsMlZUM3BEVE9IeUVIYmhFUXBFaHE5RXpBVUZMQUNRa01kN1VGaENacXhmOHRZRG85CndzaXFCem5lYUVUYUZtRlZFQTEwUk5uNjhtV05rT09XZEVhNmNGNVhNTUQrRjMwaGs4eXV4OVlzcG9uaHF5d0sKUHZ5T0Vocm9EVjUyd1E9PQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==', credentialsId: 'kubeconfig', serverUrl: 'https://192.168.49.2:8443') {
    // 						sh 'kubectl apply -f deployment.yaml'
		// 			}
		// 		}
		// 	}
		// }
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