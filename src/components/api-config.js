const domain = "http://localhost:5000/api";

const api = {
  upload: domain + "/upload",
  convert_tex: domain + "/convert_tex?",
  convert_docx: domain + "/convert_docx?",
  download: domain + "/download?"
};

export default api;
