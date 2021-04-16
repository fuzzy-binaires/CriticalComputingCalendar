
		// SCRIPT TO GET DATA AND FILL IN THE TAGS
		// getEphemerisFile(); // ARGUMENT = dateFile.md


		function getEphemerisFile() {

			var urls = ["md/alan_turing.md"];
			xhrDoc = new XMLHttpRequest();
			xhrDoc.open('GET', urls[0], true)
			if (xhrDoc.overrideMimeType)
				xhrDoc.overrideMimeType('text/plain; charset=x-user-defined')
			xhrDoc.onreadystatechange = function () {
				if (this.readyState == 4) {
					if (this.status == 200) {
						var data = this.response; //Here is a string of the text data
						console.log(data);
						processRawData(data);
					} else {

					}

				}
			}
			xhrDoc.send() //sending the request
		}

		function processRawData(rawData) {
      let splitted = rawData.split(/\w+\s*\=/)
      date = splitted[1].trim();
      name = splitted[2].trim();
      source = splitted[3].trim();
      description = splitted[4].trim();

			document.getElementById("date").innerText = date;
	    document.getElementById("name").innerText = name;
      document.getElementById("footer").innerText = source;
      document.getElementById("description").innerText = description;


		}


    getEphemerisFile();
