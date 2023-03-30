const headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("steamProjectToken")}`,
  },
};

export default headers;
