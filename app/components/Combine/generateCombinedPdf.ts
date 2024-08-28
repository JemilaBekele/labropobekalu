import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ProfileData } from "@/app/types/profiletype";

declare module 'jspdf-autotable' {
  interface jsPDF {
    previousAutoTable?: any;
  }
}

type TestResult = {
  result: string;
  remark: string;
};

type DataEntry = [string, TestResult];
const imagePath = "/image/bekalu.PNG";

let currentYPosition: number;

const addHeaderAndProfile = (doc: jsPDF, profileData: ProfileData) => {
  const imgWidth = 230;
  const imgHeight = 36;
  const pageWidth = doc.internal.pageSize.width;
  const x = (pageWidth - imgWidth) / 2;
  const y = 10;

  doc.setDrawColor(3, 97, 97);
  doc.setLineWidth(1);
  doc.line(0, 0, doc.internal.pageSize.width, 0);

  doc.addImage(imagePath, 'JPEG', x, y, imgWidth, imgHeight);

  doc.setFontSize(12);
  const profileY = y + imgHeight + 10;

  doc.text(`Client Name: ${profileData.clientName}`, 10, profileY+2);
  doc.text(`Sample ID: ${profileData.SampleId}`, 10, profileY + 7);
  doc.text(`Age: ${profileData.age}`, 10, profileY + 12);
  doc.text(`Sex: ${profileData.sex}`, 90, profileY+2);
  doc.text(`Phone Number: ${profileData.phoneNumber}`, 90, profileY + 7);
  doc.text(`Report Date: ${profileData.reportDate}`, 90, profileY + 12);
  doc.text(`Location: ${profileData.location}`, 160, profileY+2);

  currentYPosition = profileY + 25;
  doc.line(10, currentYPosition - 8, pageWidth - 10, currentYPosition - 8);

  return currentYPosition;
};

const addFooter = (doc: jsPDF) => {
  const authorized = "Result Authorized By: TILIKSEW MENGESHA";
  const footertitle = "Address";
  const footeremail = "Email";
  const footertele = "Tel";
  const footerAddress = "Kazanchis, Addis Ababa, Ethiopia\nBehind Kazanchis Police Station";
  const footerMail = "P.O. Box: 6744\nethio.med.clinic@gmail.com";
  const footerTel = "0115526928\n0993928749";

  const footerY = doc.internal.pageSize.height - 37;

  // Draw a line below the authorized name
  doc.setDrawColor(0, 0, 0); // Set line color to black
  doc.setLineWidth(0.5);
  doc.line(10, footerY +15, doc.internal.pageSize.width - 10, footerY+15 );

  // Draw the authorized name
  doc.setFontSize(10);
  doc.text(authorized, 10, footerY+12);

  // Adjust Y positions for the remaining footer elements
  doc.setFontSize(8);
  doc.text(footertitle, 10, footerY + 20);
  doc.text(footeremail, 80, footerY + 20);
  doc.text(footertele, 160, footerY + 20);
  doc.text(footerAddress, 10, footerY + 25);
  doc.text(footerMail, 80, footerY + 25);
  doc.text(footerTel, 160, footerY + 25);

  return footerY - 30; // Adjusted to account for the new line above the footer
};


export const generateCombinedPdf = (data: DataEntry[], profileData: ProfileData) => {
  const doc = new jsPDF();

  const addHeaderFooterToPage = () => {
    addHeaderAndProfile(doc, profileData);
    addFooter(doc);
  };

  const sections: { [title: string]: [string, string][] } = {
    'Chemistry Tests': [
      ["SGOT", "<45 U/L"],
      ["SGPT", "<40 U/L"],
      ["ALKPHOSE", "<90-300 U/L"],
      ["T.Bilirubin", "0.2-1.0 mg/dl"],
      ["D.Bilirubin", "0.0-0.2 mg/dl"],
      ["BUN(UREA)", "10-40 mg/dl"],
      ["CREATININE", "0.6-1.2 mg/dl"],
      ["FBS(RBS)", "70-104 mg/dl"],
      ["URIC ACID", "3-7 mg/dl"],
      ["T.CHOLESTROL", "<200 mg/dl"],
      ["Triglycerides", "<190 mg/dl"],
      ["LDL", "<100 mg/dl"],
      ["HDL", ">60 mg/dl"],
      ["T.Cholesterol to HDL", "<5:1"],
    ],
    'Electrolyte Tests': [
      ["Sodium(Na+)", "136-146 mmol/L"],
      ["Calcium(Ca2+)", "1.08-1.3 mmol/L"],
      ["Potassium", "3.5-5 mmol/L"],
      ["Chloride(Cl-)", "96-106 mmol/L"],
    ],
    'Hematology Tests': [
      ["WBC", "4-11"],
      ["LYMP", "0.6-4.1"],
      ["MID#", "0.1-0.9"],
      ["GRAN#", "2.7-8.5"],
      ["LYMP%", "20-50"],
      ["MID%", "3-10"],
      ["GRAN%", "40-70"],
      ["RBC", "3.8-5.8"],
      ["HGB", "11-18"],
      ["MCHC", "330-360"],
      ["MCH", "26.5-33.5"],
      ["MCV", "80-99"],
      ["RDW-CV", "10-15"],
      ["RDW-SD", "35-56"],
      ["HCT", "35-54"],
      ["PLT", "150-450"],
      ["MPV", "7-11"],
      ["PDW", "10-18"],
      ["PCT", "0.1-0.5"],
      ["P-LCR", "13-43"],
      ["ESR", "0-20 mm/hr"],
      ["Blood Film", "none, homo, parasite"],
      ["Blood Group", "RH factor"],
    ],'Hormone Tests': [
      ["TSH", "0.3-4.2 nmmol/L"],
      ["Total T3", "1.23-3.07 nmmol/L"],
      ["Total T4", "66-181 nmmol/L"],
      ["HgbAIC", "4.0-6.0 %"],
      ["Troponin", "0-0.3 ng/ml"],
      ["PSA", "0-4 ng/ml"],
      ["Vitamin D", "30-100 ng/ml"],
      ["LH", "2.95-13.65 mIu/mL"],
      ["FSH", "4.46-12.43 mIu/mL"],
    ],
    'Rarasitology Tests': [
      ["Stool Examination", ""],
      ["color", "Brown"],
      ["Consistence", "Formed"],
      ["O/P", "No o/p"],
      ["Pus Cell", ""],
      ["Red Blood cell", ""],
      ["Bacteria", ""],
    ],
    'Microbiology Tests': [
      ["Acid fast stain", ""],
      ["Wet smear", ""],
      ["Gram stain", ""],
      ["KOH", ""],
    ],
    'Serology Tests': [
      ["Will felix OX 19", "Negative"],
      ["HBsAg", "Negative"],
      ["HCV Ab", "Negative"],
      ["VDRL", "Negative"],
      ["H.pylori Ab", "Negative"],
      ["H.pylori Ag", "Negative"],
      ["SO", "Non-Reactive"],
      ["SH", "Non-Reactive"],
      ["RF", "Non-Reactive"],
      ["ASO", "Non-Reactive"],
    ],
    'Urinalysis Tests': [
      ["Color", "Yellow"],
    ["Appearance", "Clear"],
    ["Specific Gravity", "1.005-1.030"],
    ["PH",  "5-8"],
    ["Protein",  "Negative"],
    ["Glucose",  "Negative"],
    ["Bilirubin",  "Negative"],
    ["Urobilinogen",  "Normal"],
    ["Nitrite",  "Negative"],
    ["Ketone",  "Negative"],
    ["Blood", "Negative"],
    ["Leukocyte",  "Negative"],
    ["HCG",  "Negative"],
    ["WBC",  "0-4/HPF"],
    ["RBC",  "1-3/HPF"],
    ["Epithelial",  "2-4 LPF"],
    ["WBC cast",  "Negative"],
    ["RBC cast",  "Negative"],
    ["Granular cast",  "Negative"],
    ["Hyaline cast", "Negative"],
    ["Cal-Oxalet",  "Negative"],
    ["Cystal",  "Negative"],
    ["Bacteria", "Negative"],
    ["Parasite",  "Negative"],
    ],
  };

  addHeaderFooterToPage();

  const addTableWithPagination = (title: string, rows: [string, string][]) => {
    const marginBottom = 10;
    const tableSpacing = 10;
    const headerHeight = currentYPosition;
    const footerY = doc.internal.pageSize.height - 40;
  
    const availableHeight = footerY - currentYPosition;
  
    // Filter rows to only include those with results
    const filteredRows: string[][] = rows
      .map(([testName, referenceRange]) => {
        const testResult = data.find(([key]) => key === testName)?.[1];
        const result = testResult?.result || "";
        const remark = testResult?.remark || "";
        return result ? [testName, result, referenceRange, remark] : null; // Only include rows with results
      })
      .filter((row): row is string[] => row !== null); // Type assertion to filter out null values
  
    // If there are no filtered rows, do not generate the table or the title
    if (filteredRows.length === 0) {
      return;
    }
  
    // Measure the height needed for the table
    const tableHeight = filteredRows.length * 5 + 10; // Approximate height based on row count
  
    // If the table fits on the current page, generate it here
    if (currentYPosition + tableHeight <= footerY) {
      doc.setFontSize(14);
      doc.text(title, 10, currentYPosition);
      currentYPosition += 5;
  
      autoTable(doc, {
        head: [["Test Name", "Result", "Ref. Range", "Remark"]],
        body: filteredRows,
        startY: currentYPosition,
        margin: { bottom: marginBottom },
        styles: {
          fontSize: 9,
          overflow: 'linebreak',
          cellPadding: 1,
        },
        headStyles: {
          fillColor: '#000000',
          textColor: '#ffffff',
        },
        columnStyles: {
          0: { cellWidth: 40 },
          1: { cellWidth: 40 },
          2: { cellWidth: 40 },
          3: { cellWidth: 40 },
        },
      });
  
      currentYPosition = doc.lastAutoTable.finalY + tableSpacing+5 ;
    } else {
      // If the table doesn't fit on the current page, add a new page and then generate it
      doc.addPage();
      currentYPosition = headerHeight; // Reset Y position for the new page
      addHeaderFooterToPage();
  
      doc.setFontSize(14);
      doc.text(title, 5, currentYPosition);
      currentYPosition += 5;
  
      autoTable(doc, {
        head: [["Test Name", "Result", "Ref. Range", "Remark"]],
        body: filteredRows,
        startY: currentYPosition,
        margin: { bottom: marginBottom },
        styles: {
          fontSize: 9,
          overflow: 'linebreak',
          cellPadding: 1,
        },
        headStyles: {
          fillColor: '#000000',
          textColor: '#ffffff',
        },
        columnStyles: {
          0: { cellWidth: 40 },
          1: { cellWidth: 40 },
          2: { cellWidth: 40 },
          3: { cellWidth: 40 },
        },
      });
  
      currentYPosition = doc.lastAutoTable.finalY + tableSpacing+5;
    }
  
    // Check if there is space left on the page for the next table or if a new page is needed
    if (doc.internal.pageSize.height - currentYPosition < marginBottom) {
      doc.addPage();
      currentYPosition = headerHeight; // Reset Y position for the new page
      addHeaderFooterToPage();
    }
  };
  
  // Usage in the loop
  for (const [title, rows] of Object.entries(sections)) {
    addTableWithPagination(title, rows);
  }
  const addRecommendation = (doc: jsPDF, data: DataEntry[]) => {
    const recommendation = data.find(([item]) => item === 'Recommendation')?.[1].result || '';
    
    if (recommendation) {
      if (currentYPosition + 20 > doc.internal.pageSize.height - 40) {
        doc.addPage();
        currentYPosition = 20;
        addHeaderFooterToPage();
      }
      doc.setFontSize(14);
      doc.text("Recommendation", 10, currentYPosition +2);
      doc.setFontSize(12);
      doc.text(recommendation, 10, currentYPosition + 7, { maxWidth: 193 });
  
      currentYPosition += 30; // Update current Y position
    }
  };
  
 // Add recommendation if it exists
 addRecommendation(doc, data);

 // Save the PDF
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

  doc.save(`${profileData.clientName}.pdf`);
};
