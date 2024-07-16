'use strict'

let pkt=0;

const levels = document.querySelectorAll('.lvl');
let dificulty;
for (const lvl of levels){
    lvl.addEventListener('click',function(){
        const lvlChoice=this.id;
        switch(lvlChoice){
            case'easy':
                dificulty=0;
                startExam(dificulty);
            break;
            case'medium':
                dificulty=1;
                startExam(dificulty);
            break;
            case 'hard':
                dificulty=2;
                startExam(dificulty);
            break;
            default:
                console.log("error")
        }
        console.log(dificulty)
    })
}

function startExam(dificulty){
    prepareTemlateHTML()
    prepareExamHTML(dificulty);
    startTimer();
}

function prepareTemlateHTML(){
    document.querySelector("main").innerHTML=`
        <h2 id="timer">60</h2>
       <div class="questionFrame">
        </div>
    `
}

function prepareExamHTML(dificulty){
    const [a,b,correctAnswer]=renderQuestion(dificulty);

    document.querySelector(".questionFrame").innerHTML=`
  
    <h3 class="question">${a}*${b}</h3>
    <input type="text" class="answerField">
    <button id="show">Sprawdź</button>
      <p class="points">${pkt}</p>
    `

    document.getElementById("show").addEventListener('click', function() {
        checkAnswer(correctAnswer);
    });
    let answerField = document.querySelector(".answerField");
    answerField.focus();
    answerField.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            checkAnswer(correctAnswer);
        }
    });

}

function renderQuestion(dificulty){
        let a;
        let b;
        console.log(dificulty)

    if(dificulty==0)
        {
          a=Math.floor(Math.random()*(9-2+1))+2;
          b=Math.floor(Math.random()*(9-2+1))+2;
        }
    else if(dificulty==1){
          a=Math.floor(Math.random()*(19-11+1))+11;
          b=Math.floor(Math.random()*(9-2+1))+2;
    }
    else {
         a=Math.floor(Math.random()*(19-11+1))+11;
         b=Math.floor(Math.random()*(19-11+1))+11;
    }
    let correctAnswer=a*b;
   return [a,b,correctAnswer];
}

function checkAnswer(correctAnswer){
    const questionFrame=document.querySelector(".questionFrame")
    const answerField = document.querySelector(".answerField");
    const answer = answerField.value;
    console.log(answer);

    if (correctAnswer === parseInt(answer))
     { 
        questionFrame.style.color="green";
        questionFrame.style.fontSize=2+"rem";
         questionFrame.textContent="Brawo!"
         pkt++;
         setTimeout(()=>{
            prepareExamHTML(dificulty);
         },1000);
     }
     else {
         console.log("false")
         questionFrame.style.color="red";
         questionFrame.style.fontSize=2+"rem";
         questionFrame.textContent=`Bład! poprawna odpowiedź to ${correctAnswer}`
         setTimeout(()=>{
            prepareExamHTML(dificulty);
         },2000);
     }
 }

 function startTimer(){
    let totalTime=60;
    const timerElement=document.getElementById("timer");
    const timer=setInterval(updateTimer,1000);
    function updateTimer(){
        timerElement.innerHTML=`00:${totalTime}`
        if (totalTime == 0) {
            clearInterval(timer);
            summary();
        }
        totalTime--;
    }
}

function summary(){
    document.querySelector("main").innerHTML=`
    <div id="summarySection" class="summarySection">
        <h1>koniec czasu</h1>
        <h6 class="summaryInfo">Uzbierano punktów:${pkt} </h6>
    </div>
    <div class="summaryDataDisplay">
             <div id="resultsTable"></div>
             <div class="chart">  
                <canvas id="myChart"></canvas>
             </div>
    </div>
    `;

   sendData();
   fetchData(dificulty)
   .then(data=>{
    generateChart(data);
   });
}

function sendData(){
    let date = getCurrentDate();
    let formData = new FormData();
    formData.append('points', pkt);
    formData.append('date', date);
    formData.append('category', dificulty); 

    let url = "dbh.php";
    let options = {
        method: 'POST',
        body: formData
    };

    fetch(url, options)
    .then(response => response.text())
    .catch(error => console.log('error: ', error));
}

function fetchData(dificulty){
    return fetch(`dbh.php?category=${dificulty}`)
    .then(response => response.json())
    .then(data => {
     

        let tableHtml = '<table class="contentTable">';
        tableHtml += '<tr><th>Punkty</th><th>Data</th></tr>';

        const latestRecordNumber = 10;
        const displayRecords = data.slice(-latestRecordNumber);

        displayRecords.forEach(result => {
            tableHtml += `<tr><td>${result.points}</td><td>${result.date}</td></tr>`;
        });

        tableHtml += '</table>';
        document.getElementById('resultsTable').innerHTML = tableHtml;
        return data;
    })
    .catch(error => console.error('fetching error:', error));
}

function getCurrentDate(){
    const date=new Date();
    const day=padNumber(date.getDate());
    const month=padNumber(date.getMonth()+1);
    const year=date.getFullYear();

    function padNumber(num){
        return num.toString().padStart(2,'0');
    }

    return `${day}.${month}.${year}`
}

function generateChart(data) {
    const dates = data.slice(-10).map(entry => entry.date);
    const points = data.slice(-10).map(entry => entry.points);

    const colors = [];
    let previousPoint = points[0];

    for (let i = 1; i < points.length; i++) {
        const currentPoint = points[i];
        let color;

        if (currentPoint > previousPoint) {
            color = 'green';
        } else if (currentPoint < previousPoint) {
            color = 'red';
        } else {
            color = 'yellow';
        }

        colors.push(color);
        previousPoint = currentPoint;
    }

    const ctx = document.getElementById('myChart').getContext('2d');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'score history',
                data: points,
                fill: false,
                borderColor: context => {
                    const index = context.dataIndex;
                    return index > 0 ? colors[index - 1] : colors[0];
                },
                segment: {
                    borderColor: ctx => {
                        const index = ctx.p0DataIndex;
                        return colors[index] || 'black';
                    }
                }
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false,

                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}