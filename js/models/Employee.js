export class Employee {
  constructor(account, fullName, eMail, address, workingDays, dailyWage) {
    super(account, fullName, eMail, address);
    this.workingDays = workingDays;
    this.dailyWage = dailyWage;
    this.salary = 0;
  }

  calcSalary() {
    let monthlyWage = this.dailyWage * this.workingDays;
    this.salary = monthlyWage;
    return monthlyWage;
  }
}
