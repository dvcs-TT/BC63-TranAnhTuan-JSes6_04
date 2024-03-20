// intialize personMgmt object from class
// let person = new Person();
// let student = new Student();
// let customer = new Customer();
let personMgmt = new PersonMgmt();
// let validation = new Validation();

let typeArray = ["employee", "student", "customer"];

// const fetchUserList = () => {
//   let promise = personMgmt.fetchDataList();
//   promise
//     .then((result) => {
//       renderTabContent(result.data);
//     })
//     .catch((error) => {
//       console.log("error: ", error);
//     });
// };

const renderNavPills = (navPillArray) => {
  document.querySelector("#pills-tab").innerHTML = navPillArray.reduce(
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

const renderTabContent = (navPillArray) => {
  renderNavPills(navPillArray);

  let promise = personMgmt.fetchDataList();
  promise
    .then((result) => {
      let tabPaneArray = result.data;

      document.querySelector("#pills-tabContent").innerHTML = tabPaneArray.reduce(
        (acc, value, index) => {
          const currentType = navPillArray.find(
            (type, i) => index % navPillArray.length === i
          );

          if (currentType) {
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
                ${Object.keys(value)
                  .map((property) => `<th>${property}</th>`)
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
        },
        ""
      );
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

renderTabContent(typeArray);
