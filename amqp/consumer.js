const amqp = require('amqplib/callback_api')
const save_to_db = require('../functions/save_to_db')

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1
        }

        const queue = 'Diana-queue'

        channel.assertQueue(queue, {
            durable: false
        })

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            const arr_chemical_agents = JSON.parse(msg.content)
            const dim = arr_chemical_agents.length
            let i
            let result_front_end = []
            /*
            reg_date: timedata,
            value: values,
            types: agents,
            sensor:names,
            uid:ids,
            lat:coords[0],
            long:coords[1]*/
            for(i=0;i<dim;i++){
                // Taking info about the chemical_agent in position i
                const reg_date = arr_chemical_agents[i].reg_date
                const value = arr_chemical_agents[i].value
                const type = arr_chemical_agents[i].types
                const sensor = arr_chemical_agents[i].sensor
                const lat = arr_chemical_agents[i].lat
                const lon = arr_chemical_agents[i].long

                /*
                type: object.type,
                sensore: object.sensore,
                value: object.value,
                date: object.date,
                lon: object.lon,
                lat: object.lat
                */
                
                if(value >= 101 && value <= 150){
                    const toSaveInDb = {
                        type: type,
                        sensore: sensor,
                        value: value,
                        date: reg_date,
                        lon: lon,
                        lat: lat
                    }

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

                    save_to_db(toSaveInDb)

                    result_front_end.push({
                        type: type,
                        value: value,
                        air_pollution_level: 'Hazardous',
                        color: 'brown'
                    })
                }
            }
            
            // funzioneLuca(JSON.stringify(result_front_end))

        }, {
            noAck: true
        })
    })
})