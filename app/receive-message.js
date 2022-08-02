const { delay, ServiceBusClient } = require('@azure/service-bus')

const connectionString = process.env.CONNECTION_STRING
const queueName = process.env.QUEUE_NAME

const receiveMessage = async () => {
  const sbClient = new ServiceBusClient(connectionString)
  const receiver = sbClient.createReceiver(queueName)

  const myMessageHandler = async (messageReceived) => {
    console.log(`New passport application received for: ${messageReceived.body.name}`)
  }

  const myErrorHandler = async (error) => {
    console.log(error)
  }

  receiver.subscribe({
    processMessage: myMessageHandler,
    processError: myErrorHandler
  })

  await delay(10000)

  await receiver.close()
  await sbClient.close()
}

module.exports = receiveMessage
