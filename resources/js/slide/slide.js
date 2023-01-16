// (()=>{

// let slideIdx = 0;

// slide.style.width = `${$('.slide>li').length * 100}%`;


// let moveSlide = () => {
//     let move = -$('.slide>li')[slideIdx].offsetLeft;
//     $('#slide').style.transform = `translateX(${move}px)`;
// }

// leftArrow.addEventListener('click', ev =>{
//     // slide가 이동해야하는 거리
//     slideIdx++;
//     if(slideIdx >=  $('.slide>li').length) slideIdx = 0;
//     moveSlide();
// })

// rightArrow.addEventListener('click', ev =>{
//     slideIdx--;
//     if(slideIdx <0) slideIdx = $('.slide>li').length-1;
//     moveSlide();
// })

// $('.btn_nav').forEach(e =>{
//     e.addEventListener('mouseover', ev =>{
//         e.style.backgroundColor='lightcoral';
//     });

//     e.addEventListener('mouseout', ev =>{
//         e.style.backgroundColor='white';
//     });

//     e.addEventListener('click', ev =>{
//         slideIdx = getElementIndex(ev.target);
//         moveSlide();
//     })
// })


// })();






(() => {
    let slideIdx = 0;

    slide.style.width = `${$('.slide>li').length * 100}%`;

    let moveSlide = () => {
        let move = -$('.slide>li')[slideIdx].offsetLeft;
        $('#slide').style.transform = `translateX(${move}px)`;
    }

    leftArrow.addEventListener('click', ev => {
        // slide가 이동해야하는 거리
        // offsetLeft
        slideIdx++;
        if(slideIdx >= $('.slide>li').length) slideIdx = 0;
        moveSlide();
    })

    rightArrow.addEventListener('click', ev => {
        // slide가 이동해야하는 거리
        // offsetLeft
        slideIdx--;
        if(slideIdx < 0) slideIdx = $('.slide>li').length-1;
        moveSlide();
    })

    $('.btn_nav').forEach(e =>{
        e.addEventListener('mouseover', ev => {
            e.style.backgroundColor='lightcoral';
        });
        
        e.addEventListener('mouseout', ev => {
            e.style.backgroundColor='white';
        });

        e.addEventListener('click', ev => {
            slideIdx = getElementIndex(ev.target);
            moveSlide();
        })
    })
})();