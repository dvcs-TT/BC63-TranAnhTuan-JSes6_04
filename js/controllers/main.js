import { Employee } from "../models/Employee.js";
import { Student } from "../models/Student.js";
import { Customer } from "../models/Customer.js";

import { PersonMgmt} from "../services/PersonMgmt.js";
import { Validation } from "../services/Validation.js";

// intialize person management object from class
let personMgmt = new PersonMgmt();
// intialize validation object from class
let validation = new Validation();

const headerObj = {
  employee: [
    "Account",
    "Type",
    "Full name",
    "E-mail",
    "Address",
    "Working days",
    "Daily wage",
    "Salary",
  ],
  student: [
    "Account",
    "Type",
    "Full name",
    "E-mail",
    "Address",
    "Math",
    "Physics",
    "Chemistry",
    "GPA",
  ],
  customer: [
    "Account",
    "Type",
    "Full name",
    "E-mail",
    "Address",
    "Company",
    "Invoice value",
    "Rating",
  ],
};

// sort by a certain property of an person object
const sortByObjProp = (objProp, navPillObj) => {
  let promise = personMgmt.fetchPersonList();
  promise
    .then((result) => {
      let tabPaneArray = result.data;
      tabPaneArray.sort((a, b) => {
        const propA = a[objProp].toUpperCase(); // ignore upper and lowercase
        const propB = b[objProp].toUpperCase(); // ignore upper and lowercase
        if (propA < propB) {
          return -1;
        }
        if (propA > propB) {
          return 1;
        }

        // props must be equal
        return 0;
      });
      renderNavPills(navPillObj);
      renderTabContent(navPillObj, tabPaneArray);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

const renderNavPills = (navPillObj) => {
  const typeArray = Object.keys(navPillObj);
  document.querySelector("#pills-tab").innerHTML = typeArray.reduce(
    (acc, value, index) => {
      return (
        acc +
        `
      <!-- navPills | ${value} -->
      <li class="nav-item" role="presentation">
        <button
          class="nav-link ${!index ? "active" : ""}"
          id="pills-${value}-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-${value}"
          type="button"
          role="tab"
          aria-controls="pills-${value}"
          aria-selected="${!index ? "true" : "false"}"
        >
          ${value}
        </button>
      </li>
      `
      );
    },
    ""
  );
};

const renderTabContent = (navPillObj, tabPaneArray) => {
  const typeArray = Object.keys(navPillObj);
  document.querySelector("#pills-tabContent").innerHTML = tabPaneArray.reduce(
    (acc, value, index) => {
      const currentType = typeArray.find(
        (type, i) => index % typeArray.length === i
      );

      if (currentType) {
        const headers = navPillObj[currentType];
        return (
          acc +
          `
      <div
      class="tab-pane fade ${!index ? "show active" : ""}"
      id="pills-${currentType}"
      role="tabpanel"
      aria-labelledby="pills-${currentType}-tab"
      tabindex="0"
      >
        <div id="tabContent_${currentType}">
        <table>
        <tbody>
        <tr>
              ${headers.map((header) => `<th>${header}</th>`).join("")}
              <th>Actions</th>
            </tr>
        ${tabPaneArray
          .filter((value) => value.type === currentType)
          .reduce(
            (acc, value) =>
              acc +
              `<tr>
                ${Object.entries(value)
                  .map(([key, val]) => `<td>${val}</td>`)
                  .join("")}
                <td>
                  <button class="btn btn-danger" onclick="deletePerson('${
                    value.account
                  }, ${navPillObj}')">Delete</button>
                  <button class="btn btn-success ms-3" data-toggle="modal" data-target="#myModal" onclick="editPerson('${
                    value.account
                  }')">Edit</button>
                </td>
              </tr>`,
            ""
          )}
        </tbody>
        </table>
        </div>
      </div>            
        `
        );
      }
      return acc;
    },
    ""
  );
};

const fetchUserList = (navPillObj) => {
  renderNavPills(navPillObj);

  let promise = personMgmt.fetchPersonList();
  promise
    .then((result) => {
      let tabPaneArray = result.data;
      renderTabContent(navPillObj, tabPaneArray);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

fetchUserList(headerObj);

const getPersonInfo = () => {
  const inputNodeList = document.querySelectorAll(
    "#formNS input, #formNS select"
  );

  let data = {};
  inputNodeList.forEach((inputNode) => {
    const { name, value } = inputNode;

    // Add a new property (a pair of name:value) to the empty object 'data'
    data[name] = value;
  });

  if (data.type === "employee") {
    const person = new Employee(
      data.account,
      data.type,
      data.fullName,
      data.email,
      data.address,
      data.workingDays,
      data.dailyWage
    );
  } else if (data.type === "student") {
    const person = new Student(
      data.account,
      data.type,
      data.fullName,
      data.email,
      data.address,
      data.math,
      data.physics,
      data.chemistry
    );
  } else if (data.type === "customer") {
    const person = new Customer(
      data.account,
      data.type,
      data.fullName,
      data.email,
      data.address,
      data.company,
      data.invoiceValue,
      data.rating
    );
  }
  return person;
};

const addPerson = (navPillObj) => {
  const person = getPersonInfo();

  if (person.type === "employee") {
    const promise = personMgmt.addPerson({
      ...person,

      salary: person.calcSalary(),
    });
  } else if (person.type === "student") {
    const promise = personMgmt.addPerson({
      ...person,

      gpa: person.calcGpa(),
    });
  } else if (person.type === "customer") {
    const promise = personMgmt.addPerson({
      ...person,
    });
  }

  promise
    .then((result) => {
      let tabPaneArray = result.data;
      renderNavPills(navPillObj);
      renderTabContent(navPillObj, tabPaneArray);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

window.editPerson = (personAccount) => {
  // Add an attribute to button object
  document.querySelector("#btnCapNhat").setAttribute("data-id", personAccount);
  // document.getElementById("btnCapNhat").setAttribute("data-id", personAccount);

  const promise = personMgmt.fetchPerson(personAccount);
  promise
    .then((result) => {
      // Destructure to extract result.data
      const { data } = result;

      // Display person info to the form
      document.querySelector("#account").value = data.account;
      document.querySelector("#type").value = data.type;
      document.querySelector("#fullName").value = data.fullName;
      document.querySelector("#email").value = data.email;
      document.querySelector("#address").value = data.address;
      if (data.type === "employee") {
        document.querySelector("#workingDays").value = data.workingDays;
        document.querySelector("#dailyWage").value = data.dailyWage;
      } else if (data.type === "student") {
        document.querySelector("#math").value = data.math;
        document.querySelector("#physics").value = data.physics;
        document.querySelector("#chemistry").value = data.chemistry;
      } else if (data.type === "customer") {
        document.querySelector("#company").value = data.company;
        document.querySelector("#invoiceValue").value = data.invoiceValue;
        document.querySelector("#rating").value = data.rating;
      }
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

const updatePerson = () => {
  const person = getPersonInfo();
  // const personAccount = document.getElementById("btnCapNhat").getAttribute("data-id");
  const personAccount = document
    .querySelector("#btnCapNhat")
    .getAttribute("data-id");
  console.log("personAccount: ", personAccount);

  if (person.type === "employee") {
    const promise = personMgmt.updatePerson(personAccount, {
      ...person,
      salary: person.calcSalary(),
    });
  } else if (person.type === "student") {
    const promise = personMgmt.updatePerson(personAccount, {
      ...person,
      gpa: person.calcGpa(),
    });
  } else if (person.type === "customer") {
    const promise = personMgmt.updatePerson(personAccount, {
      ...person,
    });
  }

  promise
    .then((result) => {
      let tabPaneArray = result.data;
      renderNavPills(navPillObj);
      renderTabContent(navPillObj, tabPaneArray);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

window.deletePerson = (personAccount, navPillObj) => {
  const promise = personMgmt.deletePerson(personAccount);

  promise
    .then((result) => {
      let tabPaneArray = result.data;
      renderNavPills(navPillObj);
      renderTabContent(navPillObj, tabPaneArray);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};
