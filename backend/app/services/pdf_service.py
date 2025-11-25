"""
PDF Service for extracting text from PDF files
"""
import base64
from typing import Optional
from io import BytesIO
import pdfplumber


class PDFService:
    """Service for PDF text extraction"""

    @staticmethod
    async def extract_text_from_pdf(pdf_data: bytes) -> str:
        """
        Extract text from PDF bytes
        Args:
            pdf_data: PDF file as bytes
        Returns:
            Extracted text content
        """
        try:
            full_text = []

            with pdfplumber.open(BytesIO(pdf_data)) as pdf:
                num_pages = len(pdf.pages)
                print(f"[PDF-SERVICE] Processing {num_pages} pages...")

                for page_num, page in enumerate(pdf.pages, start=1):
                    print(f"[PDF-SERVICE] Extracting text from page {page_num}/{num_pages}")

                    # Extract text from page
                    text = page.extract_text()

                    if text:
                        full_text.append(text)
                        print(f"[PDF-SERVICE] Page {page_num}: {len(text)} characters")

            combined_text = "\n\n".join(full_text)
            print(f"[PDF-SERVICE] Total extracted: {len(combined_text)} characters")

            return combined_text.strip()

        except Exception as e:
            print(f"[PDF-SERVICE] Error extracting text: {e}")
            raise Exception(f"PDF extraction failed: {str(e)}")

    @staticmethod
    def decode_base64_pdf(base64_data: str) -> bytes:
        """
        Decode base64 PDF data
        Args:
            base64_data: Base64 encoded PDF string
        Returns:
            PDF bytes
        """
        try:
            # Remove data URL prefix if present
            if "," in base64_data:
                base64_data = base64_data.split(",")[1]

            return base64.b64decode(base64_data)
        except Exception as e:
            raise Exception(f"Failed to decode base64 PDF: {str(e)}")

    @staticmethod
    def validate_pdf(pdf_data: bytes) -> bool:
        """
        Validate PDF file
        Args:
            pdf_data: PDF bytes
        Returns:
            True if valid PDF
        """
        # Check PDF header
        return pdf_data[:4] == b'%PDF'

    @staticmethod
    async def get_pdf_metadata(pdf_data: bytes) -> dict:
        """
        Get PDF metadata
        Args:
            pdf_data: PDF bytes
        Returns:
            Metadata dictionary
        """
        try:
            with pdfplumber.open(BytesIO(pdf_data)) as pdf:
                return {
                    "num_pages": len(pdf.pages),
                    "metadata": pdf.metadata or {}
                }
        except Exception as e:
            raise Exception(f"Failed to get PDF metadata: {str(e)}")
