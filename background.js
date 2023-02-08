
function onrequest(req) {
  // This function will be called everytime the browser is about to send out an http or https request.
  // The req variable contains all information about the request.
  // If we return {}  the request will be performed,  without any further changes
  // If we return {cancel:true},  the request will be cancelled.
  // If we return {requestHeaders:req.requestHeaders},  any modifications made to the requestHeaders (see below) are sent.

  // log what file we're going to fetch:
  console.log("Loading: " + req.method +" "+ req.url + " "+ req.type);
  for (x = 0; x< req.requestHeaders.length; x++) {
    
    if(req.requestHeaders[x].name == "User-Agent") {
      req.requestHeaders[x].value = " ";
    }
    else if(req.requestHeaders[x].name == "")
    
    req.requestHeaders[x].Contains
    console.log(req.requestHeaders[x]);
  }
  // let's do something special if an image is loaded:
  if (req.type=="image") {
     console.log("Ooh, it's a picture!");
  }
  else {
  
    console.log(req.requestHeaders[0].value);
    if(req.requestHeaders[0].value.indexOf("google") >= 0) {
      console.log("Request coming from Google");
    return {cancel:true};
    }

    
  }
  // req also contains an array called requestHeaders containing the name and value of each header.
  // You can access the name and value of the i'th header as req.requestHeaders[i].name and req.requestHeaders[i].value ,
  // with i from 0 up to (but not including) req.requestHeaders.length .

  return {};
}


// no need to change the following, it just makes sure that the above function is called whenever the browser wants to fetch a file
browser.webRequest.onBeforeSendHeaders.addListener(
  onrequest,
  {urls: ["<all_urls>"]},
  ["blocking", "requestHeaders"]
);

