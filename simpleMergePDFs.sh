#!/bin/bash

# Define the output file names
mergedPDF="merged.pdf"
outputFileName="mergedAndArranged.pdf"

# Merge PDFs
qpdf --empty --pages iteration_*.pdf -- $mergedPDF

# Arrange two pages per sheet sideways
pdfjam --nup 2x1 --landscape $mergedPDF --outfile $outputFileName

echo "Merged and arranged PDFs into ${outputFileName}"