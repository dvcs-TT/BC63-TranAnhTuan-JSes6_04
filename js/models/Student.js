import { Person } from "./Person.js";

export class Student extends Person {
  constructor(account, type, fullName, email, address, math, physics, chemistry) {
    super(account, type, fullName, email, address);
    this.math = math;
    this.physics = physics;
    this.chemistry = chemistry;
  }

  calcGpa() {
    let gpAverage = (this.math + this.physics + this.chemistry) / 3;
    this.gpa = gpAverage;
    return gpAverage;
  }
}
