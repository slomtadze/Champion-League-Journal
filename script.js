//https://jsonmock.hackerrank.com/api/football_matches?competition=UEFA%20Champions%20League&year=2014&page=1

const submitBtn = document.getElementById('submit')
const yearOfGames = document.getElementById('year')
const numberOfGames = document.getElementById('number')  
const createDiv = (arr) => {
    arr.map(el => {
        let teamsContainer = document.querySelector('.teams-container'); 
        let div = document.createElement('Div');
            teamsContainer.appendChild(div);
            div.textContent = el;
    })
}
const searchConditions = async (year, page, contidion) => {
    let array = []
    const responce = await fetch(`https://jsonmock.hackerrank.com/api/football_matches?competition=UEFA%20Champions%20League&year=${year}&page=${page}`);
    const result = await responce.json();
        result.data.forEach(el => {
            let values = Object.values(el)
                if (contidion == undefined){
                    array.indexOf(el.team1) == -1 ? array.push(el.team1, el.team2) : array = array;
                } else if (values.includes(contidion) == true){
                    array.indexOf(el.team1) == -1 ? array.push(el.team1, el.team2) : array = array;
                } 
            });
    createDiv(array);
}
const lookForTeams = (year, num) => {    
    if (num <= 6){
        for(i=1; i<=5; i++){
            searchConditions(year, i)            
        }
    } else if(num > 6 && num <= 8){
        for(i=10; i<=12; i++){      
            searchConditions(year, i, 'R16')
        }
    } else if(num > 8 && num <= 10){
        for(i=12; i<=13; i++){
            searchConditions(year, i, 'QF')
        }
    } else if(num > 10 && num <= 12){
        for(i=13; i<= 13; i++){
            searchConditions(year, i, 'SF') 
        }
    } else if(num > 12){
        for(i=13; i<=13; i++){
            searchConditions(year, i, 'final') 
        }
    }    
}
const reset = () => {
    let teams = [...document.querySelectorAll('.teams-container div')]
        teams.map(el => el.remove())
}
submitBtn.addEventListener('click', () => {
    reset();
    lookForTeams(parseInt(yearOfGames.value), parseInt(numberOfGames.value));    
});