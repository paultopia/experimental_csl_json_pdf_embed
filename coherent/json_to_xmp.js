// functionality to turn a JSON string (loaded from disk in the main page) to XMP UInt8array

// TESTING DATA TO BE READ ON NODE
const testJson = `
[
  {"id":"acemogluColonialOriginsComparative2001","abstract":"We exploit differences in European mortality rates to estimate the effect of institutions on economic performance. Europeans adopted very different colonization policies in different colonies, with different associated institutions. In places where Europeans faced high mortality rates, they could not settle and were more likely to set up extractive institutions. These institutions persisted to the present. Exploiting differences in European mortality rates as an instrument for current institutions, we estimate large effects of institutions on income per capita. Once the effect of institutions is controlled for, countries in Africa or those closer to the equator do not have lower incomes.","accessed":{"date-parts":[[2020,11,9]]},"author":[{"family":"Acemoglu","given":"Daron"},{"family":"Johnson","given":"Simon"},{"family":"Robinson","given":"James A."}],"citation-key":"acemogluColonialOriginsComparative2001","container-title":"American Economic Review","DOI":"10.1257/aer.91.5.1369","ISSN":"0002-8282","issue":"5","issued":{"date-parts":[[2001,12]]},"language":"en","page":"1369-1401","source":"www.aeaweb.org","title":"The Colonial Origins of Comparative Development: An Empirical Investigation","title-short":"The Colonial Origins of Comparative Development","type":"article-journal","URL":"https://www.aeaweb.org/articles?id=10.1257/aer.91.5.1369","volume":"91"},
  {"id":"tylerProceduralFairnessCompliance1997","abstract":"My goal is to discuss the findings of recent research exploring why people obey the law. I am a psychologist and will focus directly on microlevel issues concerning the psychology of the person. In particular, I will explore research examining naturally occurring attitudes, values, and behaviors. I will do so by considering studies based upon interviews with citizens. I want to make four basic points. The first is that it is difficult to enforce the law using only the ...","author":[{"family":"Tyler","given":"Tom R."}],"citation-key":"tylerProceduralFairnessCompliance1997","container-title":"Swiss Journal of Economics and Statistics","issue":"2","issued":{"date-parts":[[1997]]},"page":"219-240","title":"Procedural fairness and compliance with the law","title-short":"Procedural fairness and compliance with the law","type":"article-journal","URL":"https://www.researchgate.net/profile/Tom_Tyler/publication/24051246_Procedural_Fairness_and_Compliance_with_Law/links/0046352822d117f30f000000.pdf","volume":"133"},
  {"id":"ubbelohdeViceAdmiraltyCourtsAmerican1960","author":[{"family":"Ubbelohde","given":"Carl"}],"citation-key":"ubbelohdeViceAdmiraltyCourtsAmerican1960","event-place":"Chapel Hill","issued":{"date-parts":[[1960]]},"publisher":"University of North Carolina Press","publisher-place":"Chapel Hill","title":"The Vice-Admiralty Courts and the American Revolution","type":"book"}
]
`

// I probably should pad this to a length divisible by 4?  I dunno.  a bit confused by some of the docs saying it'll throw if not divisible by 4, but maybe that's only on base64 strings themselves?

// also not sure if this is fragile with some unicode characters??  see http://devdoc.net/web/developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding.html#Solution_2_–_rewrite_the_DOMs_atob()_and_btoa()_using_JavaScript's_TypedArrays_and_UTF-8  and http://devdoc.net/web/developer.mozilla.org/en-US/docs/Web/API/Window/btoa.html


function makeXMP(jsonString){
    // FOR BROWSER VS NODE base64 functionality
    if (typeof window !== 'undefined'){ //we're in a browser
	var b64Json = window.btoa(testJson);
    } else {
	var b64Json = Buffer.from(jsonString).toString('base64');
    }  

    var xmpString =`<x:xmpmeta xmlns:x="adobe:ns:meta/">

  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
	   xmlns:xmp="http://ns.adobe.com/xap/1.0/">

<rdf:Description rdf:about="">

<xmp:CSL>${b64Json}</xmp:CSL> </rdf:Description>

</rdf:RDF> </x:xmpmeta>`;

    return xmpString;
};


// console.log(makeXMP(testJson));

function extractJsonFromXMP(xmpString){
    // first use regex to get the base64 out of the xmp string
    const pattern = /<xmp:CSL>(.*)<\/xmp:CSL>/;
    const b64 = xmpString.match(pattern)[1];
    var json = atob(b64);
    // window doesn't exist in wbe worker, not sure how to test
//    if (typeof window !== 'undefined'){ // we're in a browser
//	var json = window.atob(b64);
//    } else {
//	var json = Buffer.from(b64, 'base64').toString('utf8');
//    } 
    return json;
};

//foo = makeXMP(testJson);
//bar = extractJsonFromXMP(foo);
//console.log(bar);
