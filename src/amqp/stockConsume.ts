import amqp from 'amqplib/callback_api';
import { ActionStockEnum } from '../products/enums/ActionStockEnum';
import { ProductModel } from '../products/models/Products';
import { ProductsRepository } from '../products/repositories/ProductsRepository';
import { UpdateStockService } from '../products/services/UpdateStockService';

const { AMQP_URI, AMQP_QUEUE_INCREASE, AMQP_QUEUE_DECREASE } = process.env;

export const stockConsume = async (): Promise<void> => {
  const productRepository = new ProductsRepository(ProductModel);
  const updateStockService = new UpdateStockService(productRepository);

  amqp.connect(AMQP_URI as string, (err, conn) => {
    if (err) {
      console.log(` --- Failed to connect amqp ---, ${err}`);
      return;
    }

    conn.createChannel((err, ch) => {
      if (err) {
        console.log(` Failed to create channel amqp, ${err}`);
        return;
      }

      ch.assertExchange('stock', 'direct', { durable: true });

      ch.assertQueue(AMQP_QUEUE_INCREASE, { durable: true }, (err, q) => {
        if (err) {
          console.log(
            `Failed to connect queue amqp ${AMQP_QUEUE_INCREASE}, ${err}`,
          );
          return;
        }

        ch.bindQueue(q.queue, 'stock', 'incremented');

        ch.consume(
          q.queue,
          msg =>
            updateStockService
              .execute(msg, 'incremented' as ActionStockEnum)
              .then(res =>
                console.log(`--- ${res.name} updated successfully ---`),
              )
              .catch(err => console.log(err)),
          {
            noAck: true,
          },
        );
      });

      ch.assertQueue(AMQP_QUEUE_DECREASE, { durable: true }, (err, q) => {
        if (err) {
          console.log(
            `Failed to connect channel amqp ${AMQP_QUEUE_DECREASE}, ${err}`,
          );
          return;
        }

        ch.bindQueue(q.queue, 'stock', 'decremented');

        ch.consume(
          q.queue,
          msg =>
            updateStockService
              .execute(msg, 'decremented' as ActionStockEnum)
              .then(res => {
                if (res.name) {
                  console.log(`--- ${res.name} updated successfully ---`);
                }
              })
              .catch(err => console.log(err)),
          {
            noAck: true,
          },
        );
      });
    });
  });
};
