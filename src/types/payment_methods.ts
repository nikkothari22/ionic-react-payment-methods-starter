export type PaymentMethod = UPI | BankAccount


interface PaymentMethodBasicDetails {
    id: string
    name: string
    type: 'UPI' | 'bank_account'
}
interface UPI extends PaymentMethodBasicDetails {
    type: 'UPI',
    upiID: string
}

interface BankAccount extends PaymentMethodBasicDetails {
    type: 'bank_account',
    accountNumber: string,
    IFSC: string,
    accountHolderName: string,
    bankName: string,
    isDefault: boolean
}