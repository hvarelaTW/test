@Library('jenkins-sharedlib@feature/databricks-refactor')
import sharedlib.DatabricksJenkinsUtil

pipeline {
    agent any
    stages {
        stage('Hello') {
            steps {
                echo "${env.BRANCH_NAME}"
                echo 'Hello World Yape!!!!'
            }
        }
    }
}