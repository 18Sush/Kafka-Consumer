import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "1",
  brokers: ["localhost:9092"], // Update with your Kafka broker(s) information
});

/*const producer = kafka.producer();*/
const consumer = kafka.consumer({ groupId: "kafka-sandbox" }); // Update with your consumer group ID

const connectKafka = async () => {
  //await producer.connect();
  await consumer.connect();
};

/*const sendKafkaMessage = async (message) => {
  try {
    await producer.send({
      topic: "kafka-chat-3", // Update with your Kafka topic
      messages: [{ value: JSON.stringify(message) }],
    });
  } catch (error) {
    console.error("Error sending Kafka message:", error);
  }
};*/

const receiveKafkaMessage = async (callback) => {
  try {
    await consumer.subscribe({ topic: "kafka-chat-3" }); // Update with your Kafka topic
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const messageData = JSON.parse(message.value.toString());
        callback(messageData);
      },
    });
  } catch (error) {
    console.error("Error receiving Kafka message:", error);
  }
};

export { connectKafka,  receiveKafkaMessage };