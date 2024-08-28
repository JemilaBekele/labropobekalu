import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ProfileData } from "@/app/types/profiletype";
import { formatDateTime } from '@/app/utils/dateUtils';

export const RA_generatePdf = (data: [string, { result: string; remark: string }][], profileData: ProfileData) => {
  const doc = new jsPDF();
  const formattedTime = formatDateTime(new Date(profileData.reportDate), 'medium');

  // Add blue line at the top
  doc.setDrawColor(3, 97, 97); // Set color to blue
  doc.setLineWidth(5); // Set line width
  doc.line(0, 0, doc.internal.pageSize.width, 0); // Draw line at y=0 to ensure visibility

  // Company Information
  const imgWidth = 120; // Adjusted width for better fit
  const imgHeight = 30; // Adjusted height for better fit
  const imagePath = "/image/bekalu.PNG";
  const x = (doc.internal.pageSize.width - imgWidth) / 2;
  const y = 5; // Decreased y-position for better spacing

  doc.setFontSize(12);
  doc.addImage(imagePath, 'JPEG', x, y, imgWidth, imgHeight);

  // Line below the top bar
  doc.setLineWidth(1);
  doc.line(10, y + imgHeight + 10, doc.internal.pageSize.width - 10, y + imgHeight + 10);

  // Profile Information in 3 columns
  const profileStartY = y + imgHeight + 15;
  const leftColumnX = 10;
  const middleColumnX = 75;
  const rightColumnX = 140;

  doc.setFontSize(10);

  doc.text(`Patient Name: ${profileData.clientName}`, leftColumnX, profileStartY);
  doc.text(`Location: ${profileData.location}`, middleColumnX, profileStartY);
  doc.text(`Phone Number: ${profileData.phoneNumber}`, rightColumnX, profileStartY);

  doc.text(`MRN: ${profileData.MRN}`, leftColumnX, profileStartY + 8);
  doc.text(`Sex: ${profileData.sex}`, middleColumnX, profileStartY + 8);
  doc.text(`Sample ID: ${profileData.SampleId}`, rightColumnX, profileStartY + 8);

  doc.text(`CRN: ${profileData.CRN}`, leftColumnX, profileStartY + 16);
  doc.text(`Age: ${profileData.age}`, middleColumnX, profileStartY + 16);
  doc.text(`Report Date: ${formattedTime}`, rightColumnX, profileStartY + 16);

  // Line below profile information
  doc.line(10, profileStartY + 20, doc.internal.pageSize.width - 10, profileStartY + 20);

  // Add "Stool Examination" Title
  doc.setFontSize(14);
  doc.text(`Rarasitology`, leftColumnX, profileStartY + 30);

  // RA Test Results Table
  const RAColumns = ["Test Name", "Result", "Ref. Range", "Remark"];
  const RARows = [
    ["Stool Examination", "", "", ""],
    ["Color", "", "Brown", ""],
    ["Consistence", "", "Formed", ""],
    ["O/P", "", "No o/p", ""],
    ["Pus Cell", "", "", ""],
    ["Red Blood cell", "", "", ""],
    ["Bacteria", "", "", ""],
  ];

  // Populate RA Test rows with data
  data.forEach(([item, { result, remark }]) => {
    const row = RARows.find((r) => r[0] === item);
    if (row) {
      row[1] = result;
      row[3] = remark; // Adjusted index for Remark column
    }
  });

  let finalY = profileStartY + 40;
  const filteredRARows = RARows.filter(row => row[1] !== "");

  if (filteredRARows.length > 0) {
    autoTable(doc, {
      startY: finalY,
      head: [RAColumns],
      body: filteredRARows,
    });
    finalY = (doc as any).lastAutoTable.finalY;
  }

  // Recommendation Section
  const recommendation = data.find(([item]) => item === 'Recommendation')?.[1].result || '';
  if (recommendation) {
    doc.setFontSize(14);
    doc.text('Recommendation', leftColumnX, finalY + 10);

    doc.setFontSize(10);
    doc.text(recommendation, leftColumnX, finalY + 15, { maxWidth: 193 });
  }

  // Add Footer
  const addFooter = () => {
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);

      const authorized = "Result Authorized By: TILIKSEW MENGESHA";
      const footerTitle = "Address";
      const footerEmail = "Email";
      const footerTele = "Tel";
      const footerAddress = "Kazanchis, Addis Ababa, Ethiopia\nBehind Kazanchis Police Station";
      const footerMail = "P.O. Box: 6744\nethio.med.clinic@gmail.com";
      const footerTel = "0115526928\n0993928749";

      const footerY = doc.internal.pageSize.height - 30;
      doc.line(10, footerY - 5, 200, footerY - 5);

      doc.setFontSize(10);
      doc.text(authorized, 10, footerY - 10);
      doc.text(footerTitle, 10, footerY);
      doc.text(footerEmail, 80, footerY);
      doc.text(footerTele, 160, footerY);
      doc.text(footerAddress, 10, footerY + 5);
      doc.text(footerMail, 80, footerY + 5);
      doc.text(footerTel, 160, footerY + 5);
    }
  };

  addFooter();
  const pdfBlob = doc.output('blob');
// Create a new window for the PDF and trigger print dialog
const pdfUrl = URL.createObjectURL(pdfBlob);
const printWindow = window.open(pdfUrl, '_blank');
if (printWindow) {
  printWindow.onload = () => {
    printWindow.print();
    URL.revokeObjectURL(pdfUrl); // Clean up the URL object
  };
}
  // Save the PDF
  doc.save(`${profileData.clientName}_Rarasitology_report.pdf`);
};
