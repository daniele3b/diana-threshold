# diana-threshold
Diana è una piattaforma di monitoring degli agenti chimici da fornire alle autorità competenti per salvaguardare il territorio. Attraverso le stazioni dislocate nel territorio è possibile analizzare i dati riguardanti gli agenti chimici in tempo reale e studiarne la relazione con fattori complementari come:

* Traffico aereo
* Agenti atmosferici
* Traffico terrestre
* Raggi UV
 
Viene fornita la possibilità di effettuare il download e l'analisi dei dati per rendere più facile l'analisi di dati complessi.
Siamo fortemente convinti che la tutela dell'ambiente non può avvenire senza la partecipazione attiva dei cittadini, per questo è stato introdotto un meccanismo di segnalazione di eventi che possono nuocere alla salute del territorio. Infine, le autorità avranno a disposizione uno strumento di broadcasting per inviare degli annunci importanti a tutti gli utenti del sistema.
 
# Tecnologie usate

Diana è strutturato principalmente in due moduli:

* frontend
* backend

Il frontend è stato realizzato con Vue.js, Javascript, CSS e diverse librerie:

* Bootstrap
* Axios
* vue2-google-maps
* Chart-js

Il backend è stato realizzato con Nodejs e diverse librerie:

* Bcrypt
* Mongoose
* Express
* Passport
* Request
* JWT
* Config
* Cors
* Nodemailer
* Amqplib

La comunicazione tra frontend e backend avviene tramite chiamate REST (Axios), il backend è suddiviso in due moduli comunicanti tramite AMQP. Il secondo modulo ha implementato anche una websocket che verrà utilizzata per scopi futuri.
Il modulo 2 del progetto Diana, comunica con il primo tramite AMQP per installarlo ci sono dei requisiti, bisogna aver installato sul proprio dispositivo:

* MongoDB
* RabbitMQ
* Nodejs

E' necessaria l'installazione del modulo 1 del backend:
* Diana(modulo 1): https://github.com/daniele3b/Progetto-Diana
* Diana-app(frontend): https://github.com/daniele3b/diana_app

Per installare ed eseguire questo modulo bisogna seguire i seguenti passi:

* npm install
* verificare i parametri presenti nel config
* richiedere il .env
* Eseguire con nodemon oppure node index.js
* Avviare gli altri moduli come indicato nei readme.md

