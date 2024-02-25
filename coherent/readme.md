working off the example code in https://github.com/coherentgraphics/coherentpdf.js as a starter to hook up to a web page

# NOTES

The strategy:

Turn the JSON file to base64
Shove the base64 string into a single property basically 

--
CURRENTLY
- I can read xml file as xmp metadata and shove it into file, and then inspecting the file with cat shows it in there (though I need to pull out the metadata to make sure it's readable by the library)

---

NEXT STEP: 

Add some function to pull out the metadata and send it back to the original file.  Actually that should be pretty easy...

Then swap out json file for the dummy metadata file: 

Take json file
Read as text
Convert to base64 string
Put into xml in right spot using some kind of string template
Then encode to uint8 https://stackoverflow.com/questions/6965107/converting-between-strings-and-arraybuffers
Then shove into file with existing code.


----

second try for PDF metadata from browser:

- https://stackoverflow.com/questions/73165537/how-to-add-custom-metadata-to-pdf-using-javascript 
- https://www.npmjs.com/package/coherentpdf
- https://www.coherentpdf.com/jscpdf/index.html
- https://github.com/coherentgraphics/coherentpdf.js/blob/master/index.html
- modify with json upload code from here: https://github.com/paultopia/experimental_csl_json_pdf_embed/blob/main/index.html 
