(function(win, doc) {

    win.onload = init;

    var words = [];

    // elements
    var nounList, verbList, adjectiveList;
    var sourceId;


    function init() {

        nounList = doc.getElementById("nouns");
        verbList = doc.getElementById("verbs");
        adjectiveList = doc.getElementById("adjectives");

        // load the words xml file
        var storageData = window.localStorage.getItem("words");
        if (storageData == null) {
            makeRequest("posList.xml");
        }
        else {
            words = JSON.parse(storageData);
            refreshDOM("From LocalStorage");
        }

    }



    // XMLHttpRequest - asynchronous loading of XML data
    var xhr;

    function makeRequest(url) {
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (xhr) {
            xhr.onreadystatechange = loadXMLData;
            xhr.open("GET", url, true);
            xhr.send(null);
        }
        else {
            doc.getElementById("msg").innerHTML =
                "Sorry, couldn't create an XMLHttpRequest";
        }
    }

    // callback function when data is loaded
    function loadXMLData() {

        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                // get all the words elements
                var allWords = xhr.responseXML.getElementsByTagName("word");
                for (var i = 0; i < allWords.length; i++) {
                    var name =
                        allWords[i].getElementsByTagName("term")[0].textContent;
                    var party =
                        allWords[i].getElementsByTagName("pos")[0].textContent;

                    // create a new JSON object for each word
                    var newWord = {
                        "term" : term,
                        "pos" : pos
                    };
                    // add the object to the array
                    words.push(newWord);
                }
                updateStorageData();
                refreshDOM("From AJAX");

            } else {
                doc.getElementById("msg").innerHTML =
                    "There was a problem with the request " + xhr.status;
            }
        }
    }



    function updateStorageData() {
        window.localStorage.setItem("words", JSON.stringify(words));
    }

})(window, document);


