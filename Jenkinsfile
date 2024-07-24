pipeline {
    agent any

    stages {
        // stage('Checkout') {
        //     steps {
        //         // Example using Git, adjust as per your version control system
        //         git 'https://github.com/nitn-lab/funClub.git'
        //     }
        // }

        stage('Install Dependencies') {
            steps {
                // Use Node.js installation configured in Jenkins
                // Replace '12.x' with your Node.js version if necessary
                // tool name: 'NodeJS 12.x', type: 'org.jenkinsci.plugins.tools.ToolInstallation'

                // npm install
                bat 'npm install'
            }
        }

        stage('Run') {
            steps {
                // Use Node.js installation configured in Jenkins
                // Replace '12.x' with your Node.js version if necessary
                // tool name: 'NodeJS 12.x', type: 'org.jenkinsci.plugins.tools.ToolInstallation'

                // npm install
                bat 'npm start'
            }
        }

        

        // Add more stages as needed, e.g., for testing, building, deploying
    }

    // Post-build actions can be defined here if needed
    // post {
    //     // Example: Send an email notification on build failure
    //     failure {
    //         mail to: 'team@example.com',
    //              subject: "Failed: ${currentBuild.fullDisplayName}",
    //              body: "Something went wrong with the build."
    //     }
    // }
}

