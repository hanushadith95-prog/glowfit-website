

// Menu
        const btn = document.getElementById('menuBtn');
        const menu = document.getElementById('menu');
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
            menu.classList.toggle('flex');
        });
        // Bar chart
        let mychart=document.getElementById('mychart').getContext('2d')
        let barchart=new Chart(mychart,{
            type:'bar',
            data:{
                labels:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
                datasets:[{
                    label:'Weekly Report',
                    data:[0,0,0,0,0,0,0],
                    backgroundColor:'#F97316',
                    borderWidth:1,
                    borderColor:'#304332'
                }]
            },
            options:{
                scales:{
                    y:{
                        min:0,
                        max:100,
                        ticks:{
                            stepSize:10
                        }
                    }
                }
            }
        })
    // linechart
    let mychart1=document.getElementById('mychart1').getContext('2d')
        let linechart=new Chart(mychart1,{
            type:'line',
            data:{
                labels:['Week-1','Week-2','Week-3','Week-4'],
                datasets:[{
                    label:'Monthly Report',
                    data:[
                        0,0,0,0
                    ],
            
                    borderWidth:3,
                    borderColor:'#F97316',
                    pointBackgroundColor:'#304332', // The inside fill color of the dot
  pointBorderColor: '#F97316',             // The outer border color of the dot
  pointBorderWidth: 1,                     // Thickness of the dot's border
  pointRadius: 4
                    
                }]
            },
            options:{
                scales:{
                    y:{
                        min:30,
                        max:150,
                        ticks:{
                            stepSize:10
                        }
                    }
                }
            }
        })
   
    //  To-do list weight
    document.getElementById('submit1').addEventListener('click', function() {
    const week = document.getElementById('weightweek').value

      
      const weightnum = Number(document.getElementById('weightnum').value)
      if (!Number.isInteger(weightnum) || weightnum<=0){
            document.getElementById('weightresult').textContent="Enter a valid Weight"
        }

     const tbody = document.getElementById('weightbody')
      const newRow = document.createElement('tr')

      newRow.innerHTML = 
      `
        <td>${week}</td>
        <td>${weightnum}</td>
        <td><button class="del1">Delete</button></td>
        `
      tbody.appendChild(newRow)
      const del=newRow.querySelector(".del1")
      del.addEventListener("click",function(){
        newRow.remove()
        const weekMapping={
        'Week-1':0,
        'Week-2':1,
        'Week-3':2,
        'Week-4':3,
        }
       const weekIndex=weekMapping[week]
      if(weekIndex!==undefined && typeof linechart!=='undefined'){
        linechart.data.datasets[0].data[weekIndex]=0
        linechart.update()
      }         
      })
      const weekMapping={
        'Week-1':0,
        'Week-2':1,
        'Week-3':2,
        'Week-4':3,
        }
       const weekIndex=weekMapping[week]
      if(weekIndex!==undefined && typeof linechart!=='undefined'){
        linechart.data.datasets[0].data[weekIndex]=weightnum
        linechart.update()
      }    

      
    })
    
      //  To-do list
    document.getElementById('submit').addEventListener('click', function() {
    const day = document.getElementById('day').value
      const workoutInput =Number(document.getElementById('workout').value)
      const mealsInput = Number(document.getElementById('meals').value) 
      const quizInput = Number(document.getElementById('quiz').value)
      const workoutPct = (workoutInput / 20) * 100;
      const mealsPct = (mealsInput / 3) * 100;
      const quizPct = quizInput
      const avgPct = (workoutPct + mealsPct + quizPct) / 3
 const tbody = document.getElementById('tablebody')
      const newRow = document.createElement('tr')

      newRow.innerHTML = 
      `
        <td>${day}</td>
        <td>${workoutPct.toFixed(1)}%</td>
        <td>${mealsPct.toFixed(1)}%</td>
        <td>${quizPct.toFixed(1)}%</td>
        <td><strong>${avgPct.toFixed(1)}%</strong></td>
        <td><button class="del">Delete</button></td>
        `
      tbody.appendChild(newRow)
      const del=newRow.querySelector(".del")
      del.addEventListener("click",function(){
        newRow.remove()
        const dayMapping={
        'Sunday':0,
        'Monday':1,
        'Tueday':2,
        'Wednesday':3,
        'Thursday':4,
        'Friday':5,
        'Saturday':6,

      }
      
      const dayIndex=dayMapping[day]
      if(dayIndex!==undefined && typeof barchart!=='undefined'){
        barchart.data.datasets[0].data[dayIndex]=0
        barchart.update()
      }         
      })
      const dayMapping={
        'Sunday':0,
        'Monday':1,
        'Tueday':2,
        'Wednesday':3,
        'Thursday':4,
        'Friday':5,
        'Saturday':6,

      }

      const dayIndex=dayMapping[day]
     
      if(dayIndex!==undefined && typeof barchart!=='undefined'){
        

        barchart.data.datasets[0].data[dayIndex]=Number(avgPct.toFixed(1))
        barchart.update()
      }

      
    })
    //Week  Display
    let week=document.getElementById("week")
    week.addEventListener("click",function(){
        let update=document.getElementById("update")
        let body=document.querySelector("body")
        update.style.display="block"
         document.body.style.backgroundColor="#fdf3e5"
        
    })
    let close=document.getElementById("close")
    close.addEventListener("click",function(){
        let update=document.getElementById("update")
        let body=document.querySelector("body")
        update.style.display="none"
       
    })
    // weight dispay
     //Week  Display
    let weight=document.getElementById("weight")
    weight.addEventListener("click",function(){
        let weightupdate=document.getElementById("weightupdate")
        let body=document.querySelector("body")
        weightupdate.style.display="block"
         document.body.style.backgroundColor="#fdf3e5"
        
    })
    let close1=document.getElementById("close1")
    close1.addEventListener("click",function(){
        let weightupdate=document.getElementById("weightupdate")
        let body=document.querySelector("body")
        weightupdate.style.display="none"
       
    })