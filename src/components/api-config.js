const domain = "http://localhost:5000/api";

const api = {
  upload: domain + "/upload",
  tex: domain + "/convert_tex?",
  docx: domain + "/convert_docx_or_odt?",
  odt: domain + "/convert_docx_or_odt?",
  download: domain + "/download?"
};

export default api;
