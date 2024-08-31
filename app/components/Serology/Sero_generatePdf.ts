import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ProfileData } from "@/app/types/profiletype";
import { formatDateTime } from '@/app/utils/dateUtils';

export const sero_generatePdf = (data: [string, { result: string; remark: string }][], profileData: ProfileData) => {
  const doc = new jsPDF();
  const formattedTime = formatDateTime(new Date(profileData.reportDate), 'medium');

  // Company Information
  const imgWidth = 35; // Adjusted width for better fit
  const imgHeight = 30; // Adjusted height for better fit
  const imagePath = "/image/logo.PNG";
  const x = (doc.internal.pageSize.width - imgWidth) / 2;
  const y = 5; // Decreased y-position for better spacing

  doc.setFontSize(12);
  doc.addImage(imagePath, 'JPEG', 10, y, imgWidth, imgHeight);

  // Set font size and style for the main title
doc.setFontSize(22);
doc.setFont("helvetica", "bold");
doc.text('ULTRAHEALTH BIOMEDICAL', 120, 20, { align: 'center' });

// Set font size and style for the subtitle
doc.setFontSize(16);
doc.setFont("helvetica", "normal");
doc.text('ENGINEERING PLC', 120, 30, { align: 'center' });
  
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
   doc.setDrawColor(139, 103, 60);
   doc.setLineWidth(2.5);
   doc.line(10, profileStartY + 20, 200, profileStartY + 20);
   doc.setDrawColor(29, 184, 205);
   doc.setLineWidth(1.3);
   doc.line(10, profileStartY + 23, 200, profileStartY + 23);
  // Add "Serology" Title
  doc.setFontSize(14);
  doc.text('Serology', leftColumnX, profileStartY + 30);

  // Serology Test 1 Results Table
  const sero1Columns = ["Test Name", "Result", "Ref.Range", "Remark"];
  const sero1Rows = [
    ["SO", "", "Non-Reactive", ""],
    ["SH", "", "Non-Reactive", ""],
    ["RF", "", "Non-Reactive", ""],
    ["ASO", "", "Non-Reactive", ""],
  ];

  data.forEach(([item, { result, remark }]) => {
    const row = sero1Rows.find(r => r[0] === item);
    if (row) {
      row[1] = result;
      row[3] = remark;
    }
  });

  let finalY = profileStartY + 40;
  if (sero1Rows.some(row => row[1] !== "")) {
    autoTable(doc, {
      startY: finalY, // Adjust to position table below the title
      head: [sero1Columns],
      body: sero1Rows.filter(row => row[1] !== "")
    });
    finalY = (doc as any).lastAutoTable.finalY;
  }

  // Serology Test 2 Results Table
  const sero2Columns = ["Test Name", "Result", "Ref.Range", "Remark"];
  const sero2Rows = [
    ["Will felix OX 19", "", "Negative", ""],
    ["HBsAg", "", "Negative", ""],
    ["HCV Ab", "", "Negative", ""],
    ["VDRL", "", "Negative", ""],
    ["H.pylori Ab", "", "Negative", ""],
    ["H.pylori Ag", "", "Negative", ""],
  ];

  data.forEach(([item, { result, remark }]) => {
    const row = sero2Rows.find(r => r[0] === item);
    if (row) {
      row[1] = result;
      row[3] = remark;
    }
  });

  if (sero2Rows.some(row => row[1] !== "")) {
    autoTable(doc, {
      startY: finalY + 10, // Adjust to position table below the first table
      head: [sero2Columns],
      body: sero2Rows.filter(row => row[1] !== "")
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
    doc.setLineWidth(0.7);

    doc.setDrawColor(139, 103, 60);
    
    doc.line(10, footerY - 6, 200, footerY - 6);
    doc.setDrawColor(29, 184, 205);
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

  // Save the PDF
  const pdfBlob = doc.output('blob');

  // Create a new window for the PDF and trigger print dialog
  const pdfUrl = URL.createObjectURL(pdfBlob);
  const printWindow = window.open(pdfUrl, '_blank');
  if (printWindow) {
    printWindow.onload = () => {
      printWindow.print();
      URL.revokeObjectURL(pdfUrl);
    };
  }

  // Also save the PDF
  doc.save(`${profileData.clientName}.pdf`);
};
