importScripts('dist/coherentpdf.browser.js')

self.onmessage = function(e) {
   switch (e.data.mtype)
   {
     case 'pdf':
       //Load the PDF from the array of bytes handed to us by index.html
       var pdf = coherentpdf.fromMemory(e.data.bytes, "");
       var metadata = e.data.metadata;
       coherentpdf.setFast();
       self.postMessage({mtype: 'progress', message: '(1/5) PDF loaded successfully from file ...'});
       //Send some metadata back to index.html
       self.postMessage({mtype: 'pages', x: coherentpdf.pages(pdf)});
       self.postMessage({mtype: 'creator', x: coherentpdf.getCreator(pdf)});
       self.postMessage({mtype: 'producer', x: coherentpdf.getProducer(pdf)});
       //If the PDF is encrypted with blank owner password, decrypt it.
       coherentpdf.decryptPdf(pdf, "");
       self.postMessage({mtype: 'progress', message: '(2/5) File decrypted if necessary...'});
       //Rotate the contents of each page by 10 degrees
       coherentpdf.rotateContents(pdf, coherentpdf.all(pdf), 10);
       self.postMessage({mtype: 'progress', message: '(3/5) File rotated....'});
       //Add metadata
       coherentpdf.setMetadataFromByteArray(pdf, metadata);
       self.postMessage({mtype: 'progress', message: '(4/5) Metadata Added....'});
       //Write the result to a PDF file as an array of bytes
       var mem = coherentpdf.toMemory(pdf, false, false);
       self.postMessage({mtype: 'progress', message: '(5/5) File serialized to memory...'});
       var extractedMetadata = coherentpdf.getMetadata(pdf);
       var decoder = new TextDecoder("utf-8");
       var decodedMetadata = decoder.decode(extractedMetadata);
       console.log("about to print metadata");
       console.log(decodedMetadata);
       //Send the file back to index.html
       self.postMessage({mtype: 'pdfout', bytes: mem});
       //This worker will be terminated by index.html, so no need to call coherentpdf.deletePdf
       break;
   }
}
