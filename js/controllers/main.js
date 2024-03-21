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
                  <button class="btn btn-danger" onclick="deleteSV('${
                    value.account
                  }')">Delete</button>
                  <button class="btn btn-success ms-3" data-toggle="modal" data-target="#myModal" onclick="editSV('${
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
    "#foodForm input, #foodForm select"
  );

  let data = {};
  inputNodeList.forEach((inputNode) => {
    const { name, value } = inputNode;

    // dynamic key
    data[name] = value;
  });

  if (data.type === "employee") {
    const employee = new Employee(
      data.account,
      data.type,
      data.fullName,
      data.email,
      data.address,
      data.workingDays,
      data.dailyWage
    );
    return employee;
  } else if (data.type === "student") {
    const student = new Student(
      data.account,
      data.type,
      data.fullName,
      data.email,
      data.address,
      data.math,
      data.physics,
      data.chemistry
    );
    return student;
  } else if (data.type === "customer") {
    const employee = new Employee(
      data.account,
      data.type,
      data.fullName,
      data.email,
      data.address,
      data.company,
      data.invoiceValue,
      data.rating
    );
    return employee;
  }
};

window.deletePerson = (personAccount, navPillObj) => {
  const promise = services.deletePerson(personAccount);

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

// sort by a certain property of an person object
let sortByObjProp = (objProp, navPillObj) => {
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
