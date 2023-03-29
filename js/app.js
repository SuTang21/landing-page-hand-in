/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/


/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
var nav = document.getElementById('navbar__list');
var links = document.getElementsByClassName('menu__link');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function setActive(e, className){
    const clearActive = document.getElementsByClassName(className);
    for(a of clearActive){
        a.classList.remove(className);
    }
    e.classList.add(className);
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
// build the nav
function createNav(){
    for(let i = 0; i < sections.length; i++){
        const listItems = document.createElement('li');
        listItems.innerHTML = `<a href='#section${i+1}'>Section ${i+1}</a>`;
        listItems.classList.add('menu__link');
        nav.appendChild(listItems);
    }
}

// Add class 'active' to section when near top of viewport
const sectionIsVisible = (section) => {
    const sectionY = section.getBoundingClientRect().top;
    const sectionPassed = 0 - section.getBoundingClientRect().height;
    if(sectionY < window.innerHeight/2 && sectionY > sectionPassed){
        setActive(section, 'your_active_class');
        for(let i = 0; i < links.length; i++){
            const activeId = links[i].firstChild.getAttribute('href').replace("#", "");
            if(section.getAttribute('id') == activeId){
                setActive(links[i], 'menu__active');
            }
        }
    }
}

window.addEventListener("scroll", () => {
    sections.forEach(e => {
        sectionIsVisible(e);
    });
})

/**
 * End Main Functions
 * Begin Events
 * 
*/
// Build menu 
createNav();


// Scroll to section on link click and set section as active.
for(let i = 0; i < links.length; i++){
    links[i].addEventListener('click', (e)=> {
        e.preventDefault();
        const sectionID = links[i].firstChild.getAttribute('href');
        const target = document.querySelector(sectionID);
        target.scrollIntoView({
            behavior: "smooth"
        });
        setActive(links[i], 'menu__active');
        setActive(target, 'your_active_class');
    });
}
