function rpthumbnt(json) {
 document.write('<ul class="rp_plus_img">');
 for (var i = 0; i < numposts; i++) {
  var entry = json.feed.entry[i];
  var posttitle = entry.title.$t;
  var posturl;
  if (i == json.feed.entry.length) break;
  for (var k = 0; k < entry.link.length; k++) {
   if (entry.link[k].rel == 'alternate') {
    posturl = entry.link[k].href;
    break
   }
  }
  var thumburl;
  try {
   thumburl = entry.media$thumbnail.url
  } catch(error) {
   s = entry.content.$t;
   a = s.indexOf("<img");
   b = s.indexOf("src=\"", a);
   c = s.indexOf("\"", b + 5);
   d = s.substr(b + 5, c - b - 5);
   if ((a != -1) && (b != -1) && (c != -1) && (d != "")) {
    thumburl = d
   } else thumburl = 'http://lh3.ggpht.com/_xcD4JK_dIjU/SnamIh0KTCI/AAAAAAAADMA/hLjqmEbdtkw/d/noimagethumb.gif'
  }
  document.write('<li class="news-title clearfix">');
  document.write('<a href="http://www.reedniv.com/" target="_blank"><img src="' + thumburl + '"/></a>');
  document.write('<a href="' + posturl + '" target ="_top">' + posttitle + '</a><br>');
  if ("content" in entry) {
   var postcontent = entry.content.$t
  } else if ("summary" in entry) {
   var postcontent = entry.summary.$t
  } else var postcontent = "";
  var re = /<\S[^>]*>/g;
  postcontent = postcontent.replace(re, "");
  if (postcontent.length < numchars) {
   document.write('<span class="news-text">');
   document.write(postcontent);
   document.write('</span>')
  } else {
   document.write('<span class="news-text">');
   postcontent = postcontent.substring(0, numchars);
   var quoteEnd = postcontent.lastIndexOf(" ");
   postcontent = postcontent.substring(0, quoteEnd);
   document.write(postcontent + '');
   document.write('</span>')
  }
  document.write('</li>')
 }
 document.write('</ul>')
}
function rpnewsticker() {
 last = $('ul#rp_plus_img li:last').hide().remove();
 $('ul#rp_plus_img').prepend(last);
 $('ul#rp_plus_img li:first').slideDown("slow")
}
