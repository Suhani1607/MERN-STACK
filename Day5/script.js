const toggleBtn=
document.getElementById('modeToggle');
const card =document.querySelector(".main")
const body=document.body;


toggleBtn.addEventListener('click',()=>{
    card.classList.toggle('bg-secondary')
    card.classList.toggle('text-light')
    card.classList.toggle('bg-light')
    card.classList.toggle('text-dark')


   



    if(toggleBtn.classList.contains('btn-secondary')){
        toggleBtn.classList.remove('btn-secondary')
      toggleBtn.classList.add('btn-light','text-dark')
    }
    else{
        toggleBtn.classList.remove('btn-light')
        toggleBtn.classList.add('btn-secondary','text-light')
    }

        const allParas = document.querySelectorAll('.para');
    allParas.forEach(p => {
        if (card.classList.contains('bg-secondary')) {
            p.classList.add('text-light');
            p.classList.remove('text-dark');
        } else {
            p.classList.add('text-dark');
            p.classList.remove('text-light');
        }
    })

    
})