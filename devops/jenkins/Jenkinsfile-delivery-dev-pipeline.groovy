@Library('jenkins-sharedlib@feature/databricks-refactor')
import sharedlib.DatabricksJenkinsUtil

agent any
stages {
    stage('Hello') {
        steps {
            echo 'Hello World'
        }
    }
}