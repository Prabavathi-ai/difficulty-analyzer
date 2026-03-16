function analyze(){

let question = document.getElementById("question").value.toLowerCase();
let result = document.getElementById("result");

if(question.includes("+") || 
   question.includes("-") || 
   question.includes("*") || 
   question.includes("/") || 
   question.includes("addition") || 
   question.includes("subtraction")){

result.innerHTML = "<span style='color:green'>Difficulty Level: EASY</span>";
}

else if(question.includes("define") || 
        question.includes("explain") || 
        question.includes("example") || 
        question.includes("function")){

result.innerHTML = "<span style='color:orange'>Difficulty Level: MEDIUM</span>";
}

else if(question.includes("algorithm") || 
        question.includes("complexity") || 
        question.includes("analysis") || 
        question.includes("optimization") || 
        question.includes("time complexity")){

result.innerHTML = "<span style='color:red'>Difficulty Level: HARD</span>";
}

else{

result.innerHTML = "<span style='color:orange'>Difficulty Level: MEDIUM</span>";
}

        }
