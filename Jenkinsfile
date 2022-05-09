pipeline {
  agent any
  
  stages {
    stage("build") {
      steps {
        npm run build
      }
    }
  
    stage("test") {
        steps {
          npm run test
        }
      }
    }
}
