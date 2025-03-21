export interface MidtransSuccessResult {
  transaction_id: string;
  order_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  status_message: string;
  status_code: string;
  va_numbers?: Array<{
    bank: string;
    va_number: string;
  }>;
}

export interface MidtransPendingResult {
  status_code: string;
  status_message: string;
  transaction_id: string;
  va_numbers: Array<{
    bank: string;
    va_number: string;
  }>;
}

export interface MidtransErrorResult {
  status_code: string;
  status_message: string;
}
