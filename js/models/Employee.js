class Employee {
  constructor(account, type, fullName, email, address, workingDays, dailyWage) {
    super(account, type, fullName, email, address);
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
