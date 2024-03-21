import { Person } from "./Person.js";

export class Employee extends Person {
  constructor(account, type, fullName, email, address, workingDays, dailyWage) {
    super(account, type, fullName, email, address);
    this.workingDays = workingDays;
    this.dailyWage = dailyWage;
  }

  calcSalary() {
    let monthlyWage = this.dailyWage * this.workingDays;
    this.salary = monthlyWage;
    return monthlyWage;
  }
}
