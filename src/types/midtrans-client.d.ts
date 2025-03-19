declare module "midtrans-client" {
  export class Snap {
    constructor(config: {
      isProduction: boolean;
      serverKey: string;
      clientKey: string;
    });
    createTransaction(transaction: {
      transaction_details: {
        order_id: string;
        gross_amount: number;
      };
    }): Promise<{
      token: string;
      redirect_url: string;
      transaction_time: string;
      transaction_status: string;
      transaction_id: string;
      status_message: string;
      status_code: string;
      gross_amount: string;
      fraud_status: string;
      currency: string;
    }>;
  }
}
