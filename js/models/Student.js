export class Student {
  constructor(account, fullName, eMail, address, math, physics, chemistry) {
    super(account, fullName, eMail, address);
    this.math = math;
    this.physics = physics;
    this.chemistry = chemistry;
    this.gpa = 0;
  }

  calcGpa() {
    let gpAverage = (this.math + this.physics + this.chemistry) / 3;
    this.gpa = gpAverage;
    return gpAverage;
  }
}
