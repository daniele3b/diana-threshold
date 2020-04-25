const amqp = require('amqplib/callback_api')
const {save_to_db} = require('../functions/save_to_db')
const config = require('config')
const {email_sender} = require('../functions/email_sender')
//const {frontend_comunicate} = require('../websockets/ws')

function amqpStartUp() {
    amqp.connect(config.get('amqp_server'), function(error0, connection) {
        if (error0) {
            throw error0
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1
            }

            const queue = config.get('queue')

            channel.assertQueue(queue, {
                durable: false
            })

            channel.consume(queue, function(msg) {
                // Taking chemical agents from Diana that must be analyzed
                const arr_chemical_agents = JSON.parse(msg.content)
                const dim = arr_chemical_agents.length
                let i

                let soglia_superata = false

                for(i=0;i<dim;i++){

                    // Taking info about the chemical_agent in position i
                    const reg_date = arr_chemical_agents[i].reg_date
                    const value = arr_chemical_agents[i].value
                    const type = arr_chemical_agents[i].types
                    const sensor = arr_chemical_agents[i].sensor
                    const lat = arr_chemical_agents[i].lat
                    const lon = arr_chemical_agents[i].long
                
                    // Checking tresholds
                    if(value >= 101 && value <= 150){
                        soglia_superata = true

                        const toSaveInDb = {
                            type: type,
                            sensore: sensor,
                            value: value,
                            date: reg_date,
                            lon: lon,
                            lat: lat
                        }
                        // Sending an email and saving into the database
                        email_sender(toSaveInDb)
                        save_to_db(toSaveInDb)

                        const forFrontEnd = {
                            type: type,
                            value: value,
                            air_pollution_level: 'Unhealthy for sensitive groups',
                            color: 'orange'                        
                        }
                        // Communicating with frontend
                        // frontend_comunicate(JSON.stringify(forFrontEnd))
                    }
                    
                    // Checking tresholds
                    else if(value >= 151 && value <= 200){
                        soglia_superata = true

                        const toSaveInDb = {
                            type: type,
                            sensore: sensor,
                            value: value,
                            date: reg_date,
                            lon: lon,
                            lat: lat
                        }
                        // Sending an email and saving into the database
                        email_sender(toSaveInDb)
                        save_to_db(toSaveInDb)

                        const forFrontEnd = {
                            type: type,
                            value: value,
                            air_pollution_level: 'Unhealthy',
                            color: 'red'                        
                        }
                        // Communicating with frontend
                        // frontend_comunicate(JSON.stringify(forFrontEnd))
                    }
                    
                    // Checking tresholds
                    else if(value >= 201 && value <= 300){
                        soglia_superata = true

                        const toSaveInDb = {
                            type: type,
                            sensore: sensor,
                            value: value,
                            date: reg_date,
                            lon: lon,
                            lat: lat
                        }
                        // Sending an email and saving into the database
                        email_sender(toSaveInDb)
                        save_to_db(toSaveInDb)
                        
                        const forFrontEnd = {
                            type: type,
                            value: value,
                            air_pollution_level: 'Very Unhealthy',
                            color: 'violet'                        
                        }
                        // Communicating with frontend
                        // frontend_comunicate(JSON.stringify(forFrontEnd))
                    }
                    
                    // Checking tresholds
                    else if(value >= 301){
                        soglia_superata = true

                        const toSaveInDb = {
                            type: type,
                            sensore: sensor,
                            value: value,
                            date: reg_date,
                            lon: lon,
                            lat: lat
                        }
                        // Sending an email and saving into the database
                        email_sender(toSaveInDb)
                        save_to_db(toSaveInDb)

                        const forFrontEnd = {
                            type: type,
                            value: value,
                            air_pollution_level: 'Hazardous',
                            color: 'brown'                        
                        }
                        // Communicating with frontend
                        // frontend_comunicate(JSON.stringify(forFrontEnd))
                    }
                }

                if(!soglia_superata){
                    console.log("All chemical_agents' values are below maximum threshold")
                    return
                }

            }, {
                noAck: true
            })
        })
    })
}

exports.amqpStartUp = amqpStartUp