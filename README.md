# experimental_csl_json_pdf_embed

## Update: cleaner code in new repository: 

go here: https://github.com/paultopia/embed_metadata_in_pdf 

## old readme

experimental repo to embed CSL-JSON metadata into pdf files to make article references machine readable

The code that actually works and is usable is in the extremely poorly named "clean_working" directory.  Everything else is garbage.  

(The original version of this involved me trying to get chatgpt to write some javascript for me.  that didn't work.  It could write some python for me.  but then I decided I'd actually do the work and do it in JS so I could stick it in front end web.)

HEre's the readme from the directory with actually useful code: 

in conjunction with my War on the Bluebook, I've made a prototype of a demonstration project proving that you can just embed machine-readable citation files directly into a PDF

This is a messy but working prototype version (ignore the fact that the name of the directory includes the word "clean" because it ain't.).  You can run it from a local server, like the one bundled with python. in conjunction with my War on the Bluebook, I've made a prototype of a demonstration project proving that you can just embed machine-readable citation files directly into a PDF.

This repo also contains two dependencies for this project, [Coherent PDF](https://github.com/coherentgraphics/coherentpdf.js/) and [a Base64 library by Dan Kogai](https://github.com/dankogai/js-base64).  The former is under the AGPL-3.0 license, and the latter is under the BSD 3-Clause license. Please see the above links for license details, source code, etc. 

