pipeline {
    agent any

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Esecuzione Test Unitari') {
            steps {
                echo 'Simulazione di test in corso...'

                sh '''
                cat <<EOF > report.xml
<?xml version="1.0" encoding="UTF-8"?>
<testsuite name="Suite1" tests="2" failures="1">
    <testcase name="testLogin" classname="LoginTests"/>
    <testcase name="testDatabase" classname="DBTests">
        <failure message="Timeout connessione">Il database non ha risposto entro 500ms.</failure>
    </testcase>
</testsuite>
EOF
                '''
            }
        }

        stage('Pubblicazione Risultati') {
            steps {
                junit 'report.xml'
            }
        }
    }

    post {
        always {
            echo "Pipeline conclusa. Stato finale: ${currentBuild.result}"
        }
    }
}