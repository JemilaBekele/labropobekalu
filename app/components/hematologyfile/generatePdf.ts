import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ProfileData } from "@/app/types/profiletype";
import { formatDateTime } from '@/app/utils/dateUtils';

export const generatePdf = (data: [string, { result: string; remark: string }][], profileData: ProfileData) => {
  const doc = new jsPDF();

  
 const formattedTime = formatDateTime(new Date(profileData.reportDate), 'medium'); 
 

  // Company Information
  const imgWidth = 35; // Adjusted width for better fit
  const imgHeight = 30; // Adjusted height for better fit
  const imagePath = "/image/logo.PNG";
  const x = (doc.internal.pageSize.width - imgWidth) / 2;
  const y = 5; // Decreased y-position for better spacing

  
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
  const profileStartY = y + imgHeight + 10; // Increased spacing between image and profile information
  const leftColumnX = 10;
  const middleColumnX = 75; // Position for the middle column
  const rightColumnX = 140; // Position for the right column

  doc.setFontSize(10); // Reduced font size for better fit

  doc.text(`Patient Name: ${profileData.clientName}`, leftColumnX, profileStartY);
  doc.text(`Location: ${profileData.location}`, middleColumnX, profileStartY);
  doc.text(`Phone Number: ${profileData.phoneNumber}` ,rightColumnX, profileStartY);

  doc.text(`MRN: ${profileData.MRN}`, leftColumnX, profileStartY + 5);
  doc.text(`Sex: ${profileData.sex}`, middleColumnX, profileStartY + 5);
  doc.text(`Sample ID: ${profileData.SampleId}`, rightColumnX, profileStartY + 5);

  doc.text(`CRN: ${profileData.CRN}`, leftColumnX, profileStartY + 10);
  doc.text(`Age: ${profileData.age}`, middleColumnX, profileStartY + 10);
  doc.text(`Report Date: ${formattedTime}`, rightColumnX, profileStartY + 10);

  // Line below profile information
  doc.setDrawColor(139, 103, 60);
  doc.setLineWidth(2.5);
  doc.line(10, profileStartY + 13, 200, profileStartY + 13);
  doc.setDrawColor(29, 184, 205);
  doc.setLineWidth(1.3);
  doc.line(10, profileStartY + 16, 200, profileStartY + 16);


  // Add "Hematology" title
  doc.setFontSize(14);
  doc.text('Hematology', 10, profileStartY + 22);

  // Helper function to generate tables
  const generateTable = (columns: string[], rows: string[][], startY: number) => {
    const filteredRows = rows.filter(row => row[1] !== "" || row[3] !== "");
    if (filteredRows.length > 0) {
      autoTable(doc, {
        startY,
        head: [columns],
        body: filteredRows,
        styles: { fontSize: 8 } // Set the font size for table content
      });
      return (doc as any).lastAutoTable.finalY; // Use 'as any' to bypass TypeScript type checking
    }
    return startY;
  };
  

  // CBC Test 1 Results Table
  const cbc1Columns = ["Test Name", "Result", "Ref.Range", "Remark"];
  const cbc1Rows = [
    ["WBC", "", "4-11", ""],
    ["LYMP", "", "0.6-4.1", ""],
    ["MID#", "", "0.1-0.9", ""],
    ["GRAN#", "", "2.7-8.5", ""],
    ["LYMP%", "", "20-50", ""],
    ["MID%", "", "3-10", ""],
    ["GRAN%", "", "40-70", ""],
    ["RBC", "", "3.8-5.8", ""],
    ["HGB", "", "11-18", ""],
    ["MCHC", "", "330-360", ""],
    ["MCH", "", "26.5-33.5", ""],
    ["MCV", "", "80-99", ""],
    ["RDW-CV", "", "10-15", ""],
    ["RDW-SD", "", "35-56", ""],
    ["HCT", "", "35-54", ""],
    ["PLT", "", "150-450", ""],
    ["MPV", "", "7-11", ""],
    ["PDW", "", "10-18", ""],
    ["PCT", "", "0.1-0.5", ""],
    ["P-LCR", "", "13-43", ""]
  ];

  data.forEach(([item, { result, remark }]) => {
    const row = cbc1Rows.find(r => r[0] === item);
    if (row) {
      row[1] = result;
      row[3] = remark;
    }
  });

  const finalY = generateTable(cbc1Columns, cbc1Rows, profileStartY + 25);

  // CBC Test 2 Results Table
  const cbc2Columns = ["Test Name", "Result", "Ref.Range", "Remark"];
  const cbc2Rows = [
    ["ESR", "", "0-20 mm/hr", ""],
    ["Blood Film", "", "none, homo, parasite", ""],
    ["Blood Group", "", "RH factor", ""]
  ];

  data.forEach(([item, { result, remark }]) => {
    const row = cbc2Rows.find(r => r[0] === item);
    if (row) {
      row[1] = result;
      row[3] = remark;
    }
  });

  const finalY2 = generateTable(cbc2Columns, cbc2Rows, finalY + 5);

  // Recommendation Section
  const recommendation = data.find(([item]) => item === 'Recommendation')?.[1].result || '';
  if (recommendation) {
    doc.setFontSize(14);
    doc.text('Recommendation', 10, finalY2 + 10);
    doc.setFontSize(10);
    doc.text(recommendation, 10, finalY2 + 15, { maxWidth: doc.internal.pageSize.width - 20 });
  }

  // Add footer
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

      // Ensure the footer doesn't overlap with content
      const footerY = doc.internal.pageSize.height - 15;
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
  doc.save(`${profileData.clientName}.pdf`);
};
