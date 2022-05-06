
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const data = require('./weights.json');
const marks = Object.keys(data);
let sizeList = Object.values(data);			

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());

sizeList.forEach((element, i, sizeListFlatten) => {
			element = Object.keys(element);
			sizeListFlatten[i] = element;
					});  	
sizeList = sizeList.flat();
sizeList = sizeList.filter(function (el) {
    return (el != null && el != "" || el === 0);
});
  
app.use(cors())

app.route('/')
.get((req, res)=> {
    res.render("search");
})
.post((req, res, next)=> {
    //Declare variables
    let hint = [];
    let response = "";
    let searchQ = req.body.search.toLowerCase(); 
    let filterNum = 1;
	if(searchQ.length > 2){		
		console.log(searchQ);
		marks.forEach(function compare(sResult){
                if(sResult.toLowerCase().indexOf(searchQ) !== -1){
                    if(hint === []){
                        hint=[sResult];
                    }else if(filterNum < 30){
                        hint.push(sResult);
                        filterNum++;
                    }
                }
    })
       // }
       console.log(3, hint.length)
        if(hint.length == 0){         
            response = ["нет в базе"]
        }else{
            response = hint
			}
        }
         else {response = ["3 letter of more"]}
		
        res.send({response: response});
    next()

});

app.route('/mark')
.post((req, res)=> {
    let cableType = req.body.cableType;
    cableTypeQ = cableType.split(' ');
    let cableTypeS = data[cableTypeQ[0]]; 
    cableTypeS[String(cableType)][0]['value'];
    let marksList = cableTypeS[String(cableType)][0]['value'];
    console.log(cableTypeS)
    /*let sizeList = Object.values(data);
    			sizeList.forEach((element, i, sizeListFlatten) => {
			element = Object.keys(element);
			sizeListFlatten[i] = element;
					});  */	


/*for(let i = 0; i < cableTypeS.length; i++){	
		marksList = marksList + "<li>" + cableTypeS[i] + "</li>";
	   };
    console.log(marksList);*/
    res.send({response: marksList});
});


app.listen(process.env.PORT || 3000);


//
