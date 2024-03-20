class PersonMgmt {
  constructor() {}

  baseUrl = "https://65ba5565b4d53c066552a4af.mockapi.io/api/personnel";

  // Fetch the list of all user details (employees / students / customers)
  fetchDataList = () => {
    return axios({
      url: this.baseUrl,
      method: "GET",
    });
  };

  // Remove a user from the list
  deleteDatum = (userId) => {
    return axios({
      url: `${this.baseUrl}/${userId}`,
      method: "DELETE",
    });
  };

  // Add a user to the list
  addDatum = (payload) => {
    return axios({
      url: this.baseUrl,
      method: "POST",
      data: payload,
    });
  };

  // Fetch details of 1 user (employee / student / customer)
  fetchDatum = (userId) => {
    return axios({
      url: `${this.baseUrl}/${userId}`,
      method: "GET",
    });
  };

  // Update details of 1 user
  updateDatum = (userId, payload) => {
    return axios({
      url: `${this.baseUrl}/${userId}`,
      method: "PUT",
      data: payload,
    });
  };
}
