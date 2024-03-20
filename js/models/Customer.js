export class Customer {
  constructor(
    account,
    fullName,
    eMail,
    address,
    company,
    invoiceValue,
    rating
  ) {
    super(account, fullName, eMail, address);
    this.company = company;
    this.invoiceValue = invoiceValue;
    this.rating = rating;
  }
}
