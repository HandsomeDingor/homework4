const startBUtton = document.getElementById('start-btn')


startBUtton.addEventListener('click', startGame)

function startGame(){
    console.log('Started')
    startBUtton.classList.add('hide')

}