
function onrequest(req) {
  // This function will be called everytime the browser is about to send out an http or https request.
  // The req variable contains all information about the request.
  // If we return {}  the request will be performed,  without any further changes
  // If we return {cancel:true},  the request will be cancelled.
  // If we return {requestHeaders:req.requestHeaders},  any modifications made to the requestHeaders (see below) are sent.

  // log what file we're going to fetch:
  console.log("Loading: " + req.method + " " + req.url + " " + req.type);

  // Check if the destination address of the request contains a tracking service
  // If thats the case cancel this request
  if (req.requestHeaders[0].value.indexOf("googlesyndication.com") >= 0 ||
      req.requestHeaders[0].value.indexOf("doubleclick.net.com") >= 0 ||
      req.requestHeaders[0].value.indexOf("googletagmanager.com") >= 0 ||
      req.requestHeaders[0].value.indexOf("google-analytics.com") >= 0 ||
      req.requestHeaders[0].value.indexOf("googleadservices.com") >= 0 ||
      req.requestHeaders[0].value.indexOf("scorecardresearch.com") >= 0 ||
      req.requestHeaders[0].value.indexOf("googletagservices.com") >= 0 ||
      req.requestHeaders[0].value.indexOf("2mdn.net") >= 0 )
  {
    console.log("Cancelled tracking request");
    return {cancel: true};
  }

  //Always show Mozilla as user agent, en-Us as a language and don't send cookie
  for (x = 0; x < req.requestHeaders.length; x++) {
    if (req.requestHeaders[x].name == "User-Agent") {
      req.requestHeaders[x].value = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/102.0";
    } else if (req.requestHeaders[x].name == "Accept-Language") {
      req.requestHeaders[x].value = "en-US";
    } else if (req.requestHeaders[x].name == "Cookie") {
      req.requestHeaders[x].value = "";
    }
  }

  for (x = 0; x < req.requestHeaders.length; x++) {
    console.log(req.requestHeaders[x]);
  }

  // let's do something special if an image is loaded:
  if (req.type == "image") {
    console.log("Ooh, it's a picture!");
  }

  return {requestHeaders: req.requestHeaders};


  // req also contains an array called requestHeaders containing the name and value of each header.
  // You can access the name and value of the i'th header as req.requestHeaders[i].name and req.requestHeaders[i].value ,
  // with i from 0 up to (but not including) req.requestHeaders.length .


}

// no need to change the following, it just makes sure that the above function is called whenever the browser wants to fetch a file
browser.webRequest.onBeforeSendHeaders.addListener(
  onrequest,
  {urls: ["<all_urls>"]},
  ["blocking", "requestHeaders"]
);

