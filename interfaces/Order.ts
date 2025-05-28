export interface Order {
    email: string;
    total: number;
    merchant_oid: string;
    name: string;
    address: string;
    phoneNumber: string;
    ipAddress: string;
    bucket: [string, string, number][];
    paid: boolean;
    date: string;
    status: string;
    payment_error_code?: string;
    payment_error?: string;
    isSent: boolean;
}
