pipeline {
agent any
stages {
stage('Checkout SCM') {
steps {
// 'checkout scm' dice a Jenkins di scaricare il

codice della repo configurata
checkout scm
}
}
stage('Esecuzione Test Unitari') {
steps {
echo 'Simulazione di test in corso...'

/* Usiamo 'cat <<EOF' per creare fisicamente un

file XML sul disco.

Questo file simula il report generato da

framework come JUnit o Jest.

Impostiamo failures="1" per testare la

reazione di Jenkins.
*/
sh """
cat <<EOF > report.xml
<?xml version="1.0" encoding="UTF-8"?>
<testsuite name="Suite1" tests="2" failures="1">
<testcase name="testLogin" classname="LoginTests"/>
<testcase name="testDatabase" classname="DBTests">
<failure message="Timeout connessione">Il database non ha

risposto entro 500ms.</failure>
</testcase>
</testsuite>
EOF

"""
}
}
stage('Pubblicazione Risultati') {
steps {
// Il plugin JUnit analizza il file XML e crea

grafici e tabelle

junit 'report.xml'
}
}
}
post {
always {
echo "Pipeline conclusa. Stato finale:

${currentBuild.result}"

}
}
}