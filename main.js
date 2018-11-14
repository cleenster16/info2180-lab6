window.onload = () => {
    const searchbutton = document.getElementById("searchbutton");
    const getdefinitionsbutton = document.getElementById("getAll");
    const result = document.getElementById("result");
    const getOne = document.getElementById("getOne");
    const request = new XMLHttpRequest();
    
    searchbutton.onclick = () => {
        getSingle();
    };
    
    getdefinitionsbutton.addEventListener("click", getAll);

    function getSingle(){
        
        request.onreadystatechange = function(){
            if (request.readyState == XMLHttpRequest.DONE){
                if (request.status == 200){
                    displaySingle(this.responseText);
                }else{
                    alert('There was a problem with the request');
                }
            }
        };
        request.open('GET', `./request.php?q=${getOne.value}`, false);
        request.send();
    }
    
    function getAll(){
        request.onreadystatechange = function(){
            if (request.readyState == XMLHttpRequest.DONE){
                if (request.status == 200){
                    displayMultiple(this.responseXML);
                }else{
                    alert('There was a problem with the request');
                }
            }
        };
        request.open('GET', './request.php?q=&all=true', true);
        request.send();
    }
    
    function displaySingle(response){
        result.innerHTML = response;
    }
    
    function displayMultiple(response){
        
        result.innerHTML = "";
                    
        const definitions = response.getElementsByTagName('definition');
        const orderedList = document.createElement('ol');
        for (let i = 0; i < definitions.length; i++) {
            const listItem = document.createElement('li');
            const word = definitions[i].getAttribute('name');
            const author = definitions[i].getAttribute('author');
            const definition = definitions[i].innerHTML;
            listItem.innerHTML=`<h3>${word}</h3><p>${definition}</p><p>-${author}</p>`;
            orderedList.appendChild(listItem);
        }
        result.appendChild(orderedList);
    }
    }