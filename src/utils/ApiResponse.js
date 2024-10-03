class ApiResponse {
  constructor(statuscode, message = 'Success', data, success = true) {
    this.message = message;
    this.statusCode = statusCode;
    this.success = success;
    this.data = data;
  }
}

export { ApiResponse };
