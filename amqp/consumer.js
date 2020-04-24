const amqp = require('amqplib/callback_api')
const {save_to_db} = require('../functions/save_to_db')
const config = require('config')
//const {sender_email} = require('...')
//const {funzioneLuca} = require('...')

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
                const arr_chemical_agents = JSON.parse(msg.content)
                const dim = arr_chemical_agents.length
                let i
                let result_front_end = []
                let result_email = []

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
                        const toSaveInDb = {
                            type: type,
                            sensore: sensor,
                            value: value,
                            date: reg_date,
                            lon: lon,
                            lat: lat
                        }
                        result_email.push(toSaveInDb)
                        save_to_db(toSaveInDb)
                    
                        result_front_end.push({
                            type: type,
                            value: value,
                            air_pollution_level: 'Unhealthy for sensitive groups',
                            color: 'orange'
                        })
                    }
                
                    else if(value >= 151 && value <= 200){
                        const toSaveInDb = {
                            type: type,
                            sensore: sensor,
                            value: value,
                            date: reg_date,
                            lon: lon,
                            lat: lat
                        }
                        result_email.push(toSaveInDb)
                        save_to_db(toSaveInDb)

                        result_front_end.push({
                            type: type,
                            value: value,
                            air_pollution_level: 'Unhealthy',
                            color: 'red'
                        })
                    }
                
                    else if(value >= 201 && value <= 300){
                        const toSaveInDb = {
                            type: type,
                            sensore: sensor,
                            value: value,
                            date: reg_date,
                            lon: lon,
                            lat: lat
                        }
                        result_email.push(toSaveInDb)
                        save_to_db(toSaveInDb)

                        result_front_end.push({
                            type: type,
                            value: value,
                            air_pollution_level: 'Very Unhealthy',
                            color: 'violet'
                        })
                    }
                
                    else if(value >= 301){
                        const toSaveInDb = {
                            type: type,
                            sensore: sensor,
                            value: value,
                            date: reg_date,
                            lon: lon,
                            lat: lat
                        }
                        result_email.push(toSaveInDb)
                        save_to_db(toSaveInDb)

                        result_front_end.push({
                            type: type,
                            value: value,
                            air_pollution_level: 'Hazardous',
                            color: 'brown'
                        })
                    }
                }

                // console.log(result_front_end)   <- LUCA
                // console.log(result_email)       <- MARIO
            
                // Sending results
                // funzioneLuca(JSON.stringify(result_front_end))
                // email_sender(result_email)

            }, {
                noAck: true
            })
        })
    })
}

exports.amqpStartUp = amqpStartUp