const doc = new jsPDF();
doc.autoTable({ html: '#my-table' });
const lastTable = doc.lastAutoTable;
