"""
PDF Service for converting PDF pages to images for multi-modal LLM processing
"""
import base64
from typing import List, Literal
from io import BytesIO
from pdf2image import convert_from_bytes
from PyPDF2 import PdfReader
import fitz  # PyMuPDF
from PIL import Image


class PDFService:
    """Service for PDF to image conversion"""

    @staticmethod
    async def convert_pdf_to_images(
        pdf_data: bytes,
        dpi: int = 200,
        method: Literal["pdf2image", "pymupdf"] = "pymupdf"
    ) -> List[str]:
        """
        Convert PDF pages to base64-encoded images
        Args:
            pdf_data: PDF file as bytes
            dpi: Resolution for image conversion (default 200)
            method: Conversion method - "pdf2image" or "pymupdf" (default "pymupdf")
        Returns:
            List of base64-encoded image strings (one per page)
        """
        if method == "pymupdf":
            return await PDFService._convert_with_pymupdf(pdf_data, dpi)
        elif method == "pdf2image":
            return await PDFService._convert_with_pdf2image(pdf_data, dpi)
        else:
            raise ValueError(f"Invalid conversion method: {method}. Use 'pdf2image' or 'pymupdf'")

    @staticmethod
    async def _convert_with_pdf2image(pdf_data: bytes, dpi: int = 200) -> List[str]:
        """
        Convert PDF to images using pdf2image (requires poppler-utils)
        Args:
            pdf_data: PDF file as bytes
            dpi: Resolution for image conversion
        Returns:
            List of base64-encoded image strings
        """
        try:
            print("[PDF-SERVICE] Using pdf2image method...")
            # Convert PDF pages to PIL Image objects
            images = convert_from_bytes(pdf_data, dpi=dpi)
            num_pages = len(images)
            print(f"[PDF-SERVICE] Converting {num_pages} pages to images at {dpi} DPI...")

            base64_images = []
            for page_num, image in enumerate(images, start=1):
                print(f"[PDF-SERVICE] Processing page {page_num}/{num_pages}")

                # Convert PIL Image to base64
                buffered = BytesIO()
                image.save(buffered, format="PNG")
                img_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
                base64_images.append(img_base64)

                print(f"[PDF-SERVICE] Page {page_num}: {len(img_base64)} bytes (base64)")

            print(f"[PDF-SERVICE] Successfully converted {num_pages} pages to images")
            return base64_images

        except Exception as e:
            print(f"[PDF-SERVICE] Error converting PDF to images with pdf2image: {e}")
            raise Exception(f"PDF to image conversion failed (pdf2image): {str(e)}")

    @staticmethod
    async def _convert_with_pymupdf(pdf_data: bytes, dpi: int = 200) -> List[str]:
        """
        Convert PDF to images using PyMuPDF (faster, no external dependencies)
        Args:
            pdf_data: PDF file as bytes
            dpi: Resolution for image conversion
        Returns:
            List of base64-encoded image strings
        """
        try:
            print("[PDF-SERVICE] Using PyMuPDF method...")
            # Open PDF from bytes
            pdf_document = fitz.open(stream=pdf_data, filetype="pdf")
            num_pages = pdf_document.page_count
            print(f"[PDF-SERVICE] Converting {num_pages} pages to images at {dpi} DPI...")

            # Calculate zoom factor for desired DPI (72 DPI is default)
            zoom = dpi / 72.0
            matrix = fitz.Matrix(zoom, zoom)

            base64_images = []
            for page_num in range(num_pages):
                print(f"[PDF-SERVICE] Processing page {page_num + 1}/{num_pages}")

                # Get page and render to pixmap
                page = pdf_document[page_num]
                pixmap = page.get_pixmap(matrix=matrix)

                # Convert pixmap to PIL Image
                img = Image.frombytes("RGB", [pixmap.width, pixmap.height], pixmap.samples)

                # Convert PIL Image to base64
                buffered = BytesIO()
                img.save(buffered, format="PNG")
                img_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
                base64_images.append(img_base64)

                print(f"[PDF-SERVICE] Page {page_num + 1}: {len(img_base64)} bytes (base64)")

            pdf_document.close()
            print(f"[PDF-SERVICE] Successfully converted {num_pages} pages to images")
            return base64_images

        except Exception as e:
            print(f"[PDF-SERVICE] Error converting PDF to images with PyMuPDF: {e}")
            raise Exception(f"PDF to image conversion failed (PyMuPDF): {str(e)}")

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
            pdf_reader = PdfReader(BytesIO(pdf_data))
            return {
                "num_pages": len(pdf_reader.pages),
                "metadata": pdf_reader.metadata or {}
            }
        except Exception as e:
            raise Exception(f"Failed to get PDF metadata: {str(e)}")
