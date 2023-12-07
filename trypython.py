# let's see if chatgpt does any better with python

import json
import PyPDF2

def embed_json_into_pdf(pdf_filename, json_filename):
    # Read the JSON file
    with open(json_filename, 'r') as json_file:
        json_data = json.load(json_file)

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

        # Write the modified content to a new file
        new_pdf_filename = 'modified_' + pdf_filename
        with open(new_pdf_filename, 'wb') as output_pdf:
            pdf_writer.write(output_pdf)

    return new_pdf_filename

# Example usage
#pdf_file = 'example.pdf'
#json_file = 'metadata.json'
#result = embed_json_into_pdf(pdf_file, json_file)
#print(f"Modified PDF saved as: {result}")


def extract_json_from_pdf(pdf_filename):
    # Read the PDF file
    with open(pdf_filename, 'rb') as pdf_file:
        pdf_reader = PyPDF2.PdfReader(pdf_file)

        # Extract metadata
        metadata = pdf_reader.metadata

    # The metadata in PyPDF2 is returned as a dictionary with '/Key' format.
    # We need to reformat it to a standard dictionary format.
    cleaned_metadata = {key.lstrip('/'): value for key, value in metadata.items()}

    # Assuming the JSON is stored under a specific key, for example, 'EmbeddedJSON'.
    # If it's under a different key, you'll need to change the following line accordingly.
    json_data = cleaned_metadata.get('EmbeddedJSON', None)

    # Parse the JSON data if it exists
    if json_data:
        json_data = json.loads(json_data)
        return json_data
    else:
        return "No JSON metadata found."

# Example usage
#pdf_file = 'modified_example.pdf'  # Replace with your PDF file name
#extracted_json = extract_json_from_pdf(pdf_file)
#print(extracted_json)