// let person = new Person();
// let student = new Student();
// let customer = new Customer();
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

const renderTabContent = (navPillObj) => {
  renderNavPills(navPillObj);
  
  const typeArray = Object.keys(navPillObj);
  
  let promise = personMgmt.fetchDataList();
  promise
    .then((result) => {
      let tabPaneArray = result.data;

      document.querySelector("#pills-tabContent").innerHTML =
        tabPaneArray.reduce((acc, value, index) => {
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
                      ${headers
                        .map((header) => `<th>${header}</th>`)
                        .join("")}
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
        }, "");
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

renderTabContent(headerObj);
