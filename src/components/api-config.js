const domain = "http://localhost:5000/api";

const api = {
  upload: domain + "/upload",
  tex: domain + "/convert?",
  docx: domain + "/convert?",
  odt: domain + "/convert?",
  download: domain + "/download?"
};

export default api;
