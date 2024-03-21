export class Customer {
  constructor(
    account,
    type,
    fullName,
    email,
    address,
    company,
    invoiceValue,
    rating
  ) {
    super(account, type, fullName, email, address);
    this.company = company;
    this.invoiceValue = invoiceValue;
    this.rating = rating;
  }
}
