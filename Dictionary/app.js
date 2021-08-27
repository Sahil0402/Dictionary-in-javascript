let field = document.getElementById("inputText"); //for input
let btn = document.getElementById("btn"); //to get the meaning
let line = document.getElementById("line"); //To add a skeleton effect
let line2 = document.getElementById("line2"); //To add a skeleton effect
let data = document.getElementById("data"); //to hide the block and to show when fetching the data
let container = document.getElementById("container"); //Is selected to set the width and height runtime

data.style.display = "none";
field.addEventListener('click', ()=>{
    field.removeAttribute('readonly');
})
field.onkeydown = function (event) {


    if (event.keyCode === 13) {
        
        if (field.value != "") {
            let status = 0;

            document.getElementById("word").style.visibility = "visible";
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${field.value}`)
                .then(function (response) {
                    status = response.status;
                    return response.json();
                })
                .then(function (json) {
                    
                    if (status === 404) {
                        swal(json.message, "", "info");
                    }
                    else {
                        line.innerHTML = "";
                        line2.innerHTML = "";
                        document.getElementById("word").innerHTML = "";
                        container.style.width = "350px";
                        container.style.height = "500px";
                        data.style.display = "block";

                        setTimeout(function () {
                            document.getElementById("word").innerHTML = json[0].word;
                            //Meaning fetching code
                            let fetchedMeaning = String(json[0].meanings[0].definitions[0].definition);
                            let li = document.createElement("li");
                            li.appendChild(document.createTextNode(fetchedMeaning));
                            line.appendChild(li);
                            //
                            //examples fecthing code
                            let fetchedExample = String(json[0].meanings[0].definitions[0].example);
                            li = document.createElement("li");
                            li.appendChild(document.createTextNode(fetchedExample));
                            line2.appendChild(li);

                        }, 100);
                        field.setAttribute('readonly',true);
                    }
                })
        }
        else {
            swal("Enter a word", "", "warning")
        }
    }
}


if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
})
}
