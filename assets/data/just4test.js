// isEmpty		kiemTraRong
// isLength	kiemTraDoDai
// isNumber	kiemTraSo
// isMatch		kiemTraTrung
// isMatchAccount	kiemTrMaSVTrung

let typeArray = ["employee", "student", "customer"];

const renderNavPills = (navPillArray) => {
  document.querySelector("#pills-tab").innerHTML = navPillArray.reduce(
    (acc, value, index) => (
      acc +
      `
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
    ),
    ""
  );
};

const renderTabContent = (navPillArray) => {
  renderNavPills(navPillArray);

  let promise = personMgmt.fetchDataList();
  promise
    .then((result) => {
      let tabPaneArray = result.data;

      document.querySelector("#tableDanhSach").innerHTML = tabPaneArray.reduce(
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
                          ${Object.keys(value).map(
                            (property) => `<th>${property}</th>`
                          ).join("")}
                          <th>Actions</th>
                        </tr>
                        ${tabPaneArray
                          .filter((value) => value.type === currentType)
                          .reduce((acc, value) => (
                            acc +
                            `<tr>
                              ${Object.entries(value).map(
                                ([key, val]) => `<td>${val}</td>`
                              ).join("")}
                              <td>
                                <button class="btn btn-danger" onclick="deleteSV('${value.account}')">Delete</button>
                                <button class="btn btn-success ms-3" data-toggle="modal" data-target="#myModal" onclick="editSV('${value.account}')">Edit</button>
                              </td>
                            </tr>`
                          ), "")}
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


typeArray[i] === "employee" ? (<thead id="customers" class="text-primary">
<tr>
  <th class="nowrap">
    <span class="mr-1">Account</span>
    <i class="fa fa-arrow-up" id="SapXepTang"></i>
    <i class="fa fa-arrow-down" id="SapXepGiam"></i>
  </th>
  <th>Full name</th>
  <th>E-mail</th>
  <th>Address</th>
  <th>Company</th>
  <th>Invoice value</th>
  <th>Rating</th>
  <th></th>
  <th><em class="fa fa-cog"></em></th>
</tr>
</thead>) : (typeArray[i] === "student" ? "xyz" : );

const data = {
  navPills: [
    { tabName: "tabEmployee", showName: "Employees", type: "employee" },
    { tabName: "tabStudent", showName: "Students", type: "student" },
    { tabName: "tabCustomer", showName: "Customers", type: "customer" },
  ],

  tabPanes: [
    {
      account: "001",
      type: "employee",
      fullName: "Malcolm Lindgren",
      eMail: "Janice.Hessel@hotmail.com",
      address: "014 Darrel Route",
      workingDays: 24,
      dailyWage: 100000,
      salary: 2400000,
    },
    {
      account: "002",
      type: "employee",
      fullName: "Miriam Dietrich",
      eMail: "Ari_Hartmann87@gmail.com",
      address: "7407 Baumbach Road",
      workingDays: 23,
      dailyWage: 200000,
      salary: 4600000,
    },
    {
      account: "003",
      type: "employee",
      fullName: "Cora Bernhard",
      eMail: "Polly.Goyette@gmail.com",
      address: "196 Lysanne Land",
      workingDays: 22,
      dailyWage: 300000,
      salary: 6600000,
    },
    {
      account: "004",
      type: "employee",
      fullName: "Jeff MacGyver",
      eMail: "Leanna_Durgan74@yahoo.com",
      address: "200 Dario Shoal",
      workingDays: 21,
      dailyWage: 100000,
      salary: 2100000,
    },
    {
      account: "005",
      type: "employee",
      fullName: "Lawrence Kirlin",
      eMail: "Sanford.Nicolas99@gmail.com",
      address: "38607 Glover Viaduct",
      workingDays: 20,
      dailyWage: 200000,
      salary: 4000000,
    },
    {
      account: "006",
      type: "employee",
      fullName: "Elsa Thiel",
      eMail: "Anabel_Farrell@yahoo.com",
      address: "332 Braun Rapids",
      workingDays: 19,
      dailyWage: 300000,
      salary: 5700000,
    },
    {
      account: "007",
      type: "employee",
      fullName: "Hubert Wiza",
      eMail: "Stefanie.Blanda12@hotmail.com",
      address: "77353 Olson Crossing",
      workingDays: 17,
      dailyWage: 100000,
      salary: 1700000,
    },
    {
      account: "008",
      type: "employee",
      fullName: "Ms. Isaac Jaskolski",
      eMail: "Ernesto12@hotmail.com",
      address: "85803 Myra Curve",
      workingDays: 16,
      dailyWage: 200000,
      salary: 3200000,
    },
    {
      account: "009",
      type: "employee",
      fullName: "Nina Huel",
      eMail: "Larry.Stanton@gmail.com",
      address: "71545 Howe Common",
      workingDays: 15,
      dailyWage: 300000,
      salary: 4500000,
    },
    {
      account: "010",
      type: "employee",
      fullName: "Nathan Gottlieb II",
      eMail: "Skye_Thompson@yahoo.com",
      address: "0106 Sawayn Keys",
      workingDays: 14,
      dailyWage: 100000,
      salary: 1400000,
    },

    {
      account: "101",
      type: "student",
      fullName: "Jonathon Glover",
      eMail: "Coralie27@hotmail.com",
      address: "1951 Cartwright Extension",
      math: 5,
      physics: 6,
      chemistry: 7,
      gpa: 6,
    },
    {
      account: "102",
      type: "student",
      fullName: "Mike Stehr",
      eMail: "Kaleigh_Gulgowski@hotmail.com",
      address: "796 Sylvester Harbors",
      math: 8,
      physics: 9,
      chemistry: 10,
      gpa: 9,
    },
    {
      account: "103",
      type: "student",
      fullName: "Fannie Christiansen",
      eMail: "Dan30@gmail.com",
      address: "84600 Rey Flats",
      math: 9,
      physics: 7,
      chemistry: 7,
      gpa: 7.7,
    },
    {
      account: "104",
      type: "student",
      fullName: "Josh Legros",
      eMail: "Timothy63@hotmail.com",
      address: "6067 Mraz Row",
      math: 8,
      physics: 6,
      chemistry: 8,
      gpa: 7.3,
    },
    {
      account: "105",
      type: "student",
      fullName: "Dr. Shaun Cummings",
      eMail: "Colten67@yahoo.com",
      address: "3502 Klein Estate",
      math: 6,
      physics: 7,
      chemistry: 9,
      gpa: 7.3,
    },
    {
      account: "106",
      type: "student",
      fullName: "Sheryl Auer",
      eMail: "Harmon_Waelchi@gmail.com",
      address: "974 Shanahan Park",
      math: 7,
      physics: 7,
      chemistry: 5,
      gpa: 6.3,
    },
    {
      account: "107",
      type: "student",
      fullName: "Mario Kihn",
      eMail: "Jo21@gmail.com",
      address: "17821 Catherine Valley",
      math: 8,
      physics: 6,
      chemistry: 6,
      gpa: 6.7,
    },
    {
      account: "108",
      type: "student",
      fullName: "Marlon Schinner IV",
      eMail: "Greta27@hotmail.com",
      address: "29955 Johns Gateway",
      math: 7,
      physics: 7,
      chemistry: 8,
      gpa: 7.3,
    },
    {
      account: "109",
      type: "student",
      fullName: "Percy Nienow",
      eMail: "Hilma33@yahoo.com",
      address: "719 Kessler Harbors",
      math: 9,
      physics: 7,
      chemistry: 5,
      gpa: 7,
    },
    {
      account: "110",
      type: "student",
      fullName: "Laverne McDermott",
      eMail: "Carolanne_Moore@hotmail.com",
      address: "266 Hailey Cape",
      math: 8,
      physics: 8,
      chemistry: 6,
      gpa: 7.3,
    },

    {
      account: "201",
      type: "customer",
      fullName: "Mr. Willie Casper III",
      eMail: "Lorna99@yahoo.com",
      address: "62536 Harber Locks",
      company: "Adams LLC",
      invoiceValue: "615.15",
      rating: 45,
    },
    {
      account: "202",
      type: "customer",
      fullName: "Norman Muller",
      eMail: "Erica_Runolfsdottir@gmail.com",
      address: "0314 Corwin River",
      company: "Hilpert - Maggio",
      invoiceValue: "797.29",
      rating: 82,
    },
    {
      account: "203",
      type: "customer",
      fullName: "Shawna Robel",
      eMail: "Alanna_Watsica17@gmail.com",
      address: "9142 Georgianna Summit",
      company: "Marquardt Group",
      invoiceValue: "49.23",
      rating: 35,
    },
    {
      account: "204",
      type: "customer",
      fullName: "Sergio Heaney DVM",
      eMail: "Nat.Gorczany@gmail.com",
      address: "73646 Howe Burgs",
      company: "Howell, Dicki and Nienow",
      invoiceValue: "700.40",
      rating: 54,
    },
    {
      account: "205",
      type: "customer",
      fullName: "Shannon O'Reilly",
      eMail: "Oscar_Beatty@gmail.com",
      address: "76932 Melissa Rue",
      company: "Fadel LLC",
      invoiceValue: "285.57",
      rating: 91,
    },
    {
      account: "206",
      type: "customer",
      fullName: "Charlie Mueller",
      eMail: "Rosa_Reilly94@hotmail.com",
      address: "63880 Morissette Centers",
      company: "Koch - Goodwin",
      invoiceValue: "32.44",
      rating: 80,
    },
    {
      account: "207",
      type: "customer",
      fullName: "Martha Quitzon",
      eMail: "Shaylee61@yahoo.com",
      address: "04477 Wuckert Ville",
      company: "Strosin, Dicki and Luettgen",
      invoiceValue: "768.67",
      rating: 41,
    },
    {
      account: "208",
      type: "customer",
      fullName: "Clint Effertz Sr.",
      eMail: "Beryl_Ryan7@gmail.com",
      address: "03472 Lonnie Keys",
      company: "Grimes, Torphy and Stark",
      invoiceValue: "901.95",
      rating: 12,
    },
    {
      account: "209",
      type: "customer",
      fullName: "Jessica Lebsack II",
      eMail: "Cory.Von21@hotmail.com",
      address: "9413 Corene Cove",
      company: "Balistreri and Sons",
      invoiceValue: "487.40",
      rating: 92,
    },
    {
      account: "210",
      type: "customer",
      fullName: "Michelle Senger",
      eMail: "Trace97@yahoo.com",
      address: "6146 Sporer Shores",
      company: "Krajcik, Lubowitz and Ziemann",
      invoiceValue: "91.06",
      rating: 66,
    },
  ],
};



const objTemplate1 = {
  employee: [
    {
      account: "abc",
      type: "employee",
      fullName: "abc",
      eMail: "abc",
      address: "abc",
      workingDays: 0,
      dailyWage: 0,
      salary: 0,
    },
  ],
  student: [
    {
      account: "abc",
      type: "student",
      fullName: "abc",
      eMail: "abc",
      address: "abc",
      math: 0,
      physics: 0,
      chemistry: 0,
      gpa: 0,
    },
  ],
  customer: [
    {
      account: "abc",
      type: "customer",
      fullName: "abc",
      eMail: "abc",
      address: "abc",
      company: 0,
      invoiceValue: 0,
      rating: 0,
    },
  ],
};


const objTemplate2 = {
  employee: [],

  student: [],

  customer: [],
};
