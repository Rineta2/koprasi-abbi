import {
  MidtransSuccessResult,
  MidtransPendingResult,
  MidtransErrorResult,
} from "@/types/midtrans";

declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        options: {
          onSuccess: (result: MidtransSuccessResult) => void;
          onPending: (result: MidtransPendingResult) => void;
          onError: (result: MidtransErrorResult) => void;
          onClose: () => void;
        }
      ) => void;
    };
  }
}
