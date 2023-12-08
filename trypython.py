# let's see if chatgpt does any better with python

import json
import PyPDF2

def embed_json_into_pdf(pdf_filename, json_filename):
    # Read the JSON file
    with open(json_filename, 'r') as json_file:
        json_data = {'/citations': json_file.read()}

    # Read the PDF file
    with open(pdf_filename, 'rb') as pdf_file:
        pdf_reader = PyPDF2.PdfReader(pdf_file)

        # Create a PDF writer object
        pdf_writer = PyPDF2.PdfWriter()

        # Copy the pages from the reader to the writer
        for page in pdf_reader.pages:
            pdf_writer.add_page(page)

        # Add the JSON data as metadata
        pdf_writer.add_metadata(json_data)
        print("added metadata")

        # Write the modified content to a new file
        new_pdf_filename = 'modified_' + pdf_filename
        with open(new_pdf_filename, 'wb') as output_pdf:
            pdf_writer.write(output_pdf)

    return new_pdf_filename

def extract_json_from_pdf(pdf_filename):
    # Read the PDF file
    with open(pdf_filename, 'rb') as pdf_file:
        pdf_reader = PyPDF2.PdfReader(pdf_file)

        # Extract metadata
        metadata = pdf_reader.metadata
    return metadata.get('/citations')

def test():
    newname = embed_json_into_pdf('dummy.pdf', 'dummy.json')
    print(newname)
    extracted = extract_json_from_pdf(newname)
    print(extracted)

if __name__ == '__main__':
    test()
