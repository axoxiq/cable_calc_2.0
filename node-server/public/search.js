let search = $("#livesearch");


var input = document.querySelectorAll('.inp');

document.addEventListener('input',function(e){
	if(e.target.classList.contains('inp') && +input[0].value > 0 && +input[1].value > 0){
		input[2].value = (+input[0].value * +input[1].value)/1000;
	}
});

function showResult(str){
    if(str.length === 0){
        search.addClass("hide")
    }else{
        search.removeClass("hide");
    }

    $.ajax({
        url: "/",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({search: str}),
        success: function(result){
            search.html(result.response);
        	} 
    });
}

let livesearch = document.getElementById('livesearch');
let cableMark = document.getElementById('cableMark');
let cableWeight = document.getElementById('cableWeight');

livesearch.addEventListener('click', function(event){
   cableMark.value = event.target.innerHTML;
   $.ajax({
      url: "/mark",
      method: "POST",     
      contentType: "application/json", 
      data: JSON.stringify({cableType: cableMark.value}),
      success: function(weight){
            cableWeight.value = weight.response;
        	}      
    });
});



  



 