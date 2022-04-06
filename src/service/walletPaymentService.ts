import { AxiosResponse, CancelToken } from "axios";
import API from "../utils/API";

export interface UserPaymentRequestBody {
  user_id: number;
  sender_wallet_id: number;
  receiver_wallet_id: number;
  payment_value: number;
  taxes?: number;
}

// UserId           int `json:"user_id"`
// 	SenderWalletId   int `json:"sender_wallet_id"`
// 	ReceiverWalletId int `json:"receiver_wallet_id"`
// 	PaymentValue     int `json:"payment_value"`
// 	Taxes            int `json:"taxes"`

export const userPayment = (
  data: UserPaymentRequestBody,
  cancelToken: CancelToken,
  authHeader: string
) => {
  console.log(data);
  return API.post("/wallet/payment/u2u", data, {
    cancelToken,
    headers: {
      Authorization: authHeader,
    },
  }).then((res: AxiosResponse) => {
    return res.status;
  });
};
