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
    biller_code?: string;
  }>;
  qr_string?: string;
  actions?: Array<{
    name: string;
    link: string;
  }>;
  payment_code?: string;
  finish_redirect_url?: string;
  deeplink_redirect?: string;
  permata_va_number?: string;
  mandiri_va_number?: string;
  bill_key?: string;
  biller_code?: string;
}

export interface MidtransPendingResult {
  status_code: string;
  status_message: string;
  transaction_id: string;
  payment_type: string;
  transaction_time?: string;
  transaction_status: string;
  gross_amount?: string;
  finish_redirect_url?: string;
  deeplink_redirect?: string;
  permata_va_number?: string;
  mandiri_va_number?: string;
  bill_key?: string;
  biller_code?: string;
  qr_string?: string;
  actions?: Array<{
    name: string;
    method: string;
    url: string;
    link: string;
  }>;
  payment_code?: string;
  va_numbers: Array<{
    bank: string;
    va_number: string;
    biller_code?: string;
  }>;
}

export interface MidtransErrorResult {
  status_code: string;
  status_message: string;
}
