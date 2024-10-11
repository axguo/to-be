#!/bin/bash

# Define the output file names
mergedPDF="qr_codes/merged.pdf"
outputFileName="qr_codes/mergedAndArranged.pdf"

# Merge PDFs
qpdf --empty --pages qr_codes/qr_*.png -- $mergedPDF

# Arrange two pages per sheet sideways
pdfjam --nup 2x1 --landscape $mergedPDF --outfile $outputFileName

echo "Merged and arranged PDFs into ${outputFileName}"
