
    function getDateMonthDay() {
        var d = new Date();
        var dd = String(d.getDate()).padStart(2, '0');
        var mm = String(d.getMonth() + 1).padStart(2, '0');
        return mm + '.' + dd;
    }

    function getFile(file, callback) {

			var urls = [file];
			xhrDoc = new XMLHttpRequest();
			xhrDoc.open('GET', urls[0], true)
			if (xhrDoc.overrideMimeType)
				xhrDoc.overrideMimeType('text/plain; charset=x-user-defined')
			  xhrDoc.onreadystatechange = function () {
				if (this.readyState == 4) {
					if (this.status == 200) {
						var data = this.response; //Here is a string of the text data
						console.log(data);
						callback(data);
					} else {

					}

				}
			}
			xhrDoc.send() //sending the request
		}

    function getIndexFile(){
      getFile("md/index.md",ParseIndexFile);
    }

    function ParseIndexFile(data){
      var currentDate = getDateMonthDay();
      var candidates = [];
      let splitted = data.split("\n").forEach((item, i) => {
          match = /(\d+\.\d+\s*)\=\s*(.*)/.exec(item)
          if (match && match.length == 3 && currentDate == match[1].trim()){
            candidates = candidates.concat(match[2].split(/\s+/));
          }
        });
        // filter out empty elements
        candidates = candidates.filter(function (e) { return e.length > 0;});

      if (candidates.length > 0){
          // pick random element from candidates
          let entry = candidates[Math.floor(Math.random() * candidates.length)];
          getFile("md/"+entry,GenerateCalendarEntry);

      } else {
        // generate default
      }

    }

		function GenerateCalendarEntry(rawData) {
      let splitted = rawData.split(/\w+\s*\=/);
      date = splitted[1].trim();
      name = splitted[2].trim();
      source = splitted[3].trim();
      description = splitted[4].trim();

			document.getElementById("date").innerText = date;
	    document.getElementById("name").innerText = name;
      document.getElementById("footer").innerText = source;
      document.getElementById("description").innerText = description;


		}


    getIndexFile();
