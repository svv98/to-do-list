import "./style.css";

const pages = (function(){
    
    const mainPage = document.querySelector('#mainPage');
    const projectsPage = document.querySelector('#projectsPage');
    const selectedProjectPage = document.querySelector('#selectedProjectPage');

    return {mainPage, projectsPage, selectedProjectPage}
})();
const addTaskVariables = (function(){
    
    const addTaskModal = document.querySelector('#addTaskModal');
    const addTaskCANCEL = document.querySelector('#addTaskModal button[type="reset"]');
    const addTaskSUBMIT = document.querySelector('#addTaskModal button[type="submit"]');

    return {addTaskModal, addTaskCANCEL, addTaskSUBMIT}
})();
const addProjectVariables = (function(){
    
    const addProjectModal = document.querySelector('#addProjectModal');
    const addProjectCANCEL = document.querySelector('#addProjectModal button[type="reset"]');
    const addProjectSUBMIT = document.querySelector('#addProjectModal button[type="submit"]');

    return {addProjectModal, addProjectCANCEL, addProjectSUBMIT}
})();
const infoTaskVariables = (function(){
    
    const infoTaskModal = document.querySelector('#infoTaskModal');
    const infoTaskCANCEL = document.querySelector('#infoTaskModal button[type="reset"]');
    const infoTaskSUBMIT = document.querySelector('#infoTaskModal button[type="submit"]');

    return {infoTaskModal, infoTaskCANCEL, infoTaskSUBMIT}
})();
const infoProjectVariables = (function(){

    const infoProjectModal = document.querySelector('#infoProjectModal');
    const infoProjectCANCEL = document.querySelector('#infoProjectModal button[type="reset"]');
    const infoProjectSUBMIT = document.querySelector('#infoProjectModal button[type="submit"]');

    return {infoProjectModal, infoProjectCANCEL, infoProjectSUBMIT}
})();

let tasks = [ ];
let projects = [ ];
let currentPage = 'home';

class NewTask{
    constructor(title, project, description, date, priority){
        this.id = crypto.randomUUID();
        this.title = title;
        this.project = project;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.status = "todo";
        this.added = false;
    }
    add(task){
        tasks.push(task);
        addToDOM().taskDOM();
    }
}
class NewProject{
    constructor(title, description, date, priority){
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.added = false;
        this.tasks = {
            toDo: [ ],
            doing: [ ],
            done: [ ],
        };
    }
    add(project){
        projects.push(project);
        // addToDOM().taskDOM();
    }
}

let task1 = new NewTask('task1', undefined, 'task1Description', '2025-08-10', 'low');
task1.add(Object.assign({}, task1));

let task2 = new NewTask('task2', undefined, 'task2Description', '2025-08-10', 'low');
task2.add(Object.assign({}, task2));

// let project1 = new NewProject('project1', 'project1Description', '2025-08-10', 'imp');
// project1.add(Object.assign({}, project1));
// console.log(project1);

const sidebar = (function(){
    mainPageEvents();
    const homeButton = document.querySelector(".home");
    const projectsButton = document.querySelector(".sbProjects");
    const addProjectButton = document.querySelector(".sbAddProject");

    homeButton.addEventListener('click',()=>{
        if(currentPage!=='home'){
            pages.projectsPage.classList.add('hide');
            pages.selectedProjectPage.classList.add('hide');
            pages.mainPage.classList.remove('hide');

            for(let task of tasks){
                task.added=false;
            }
            addToDOM().taskDOM();
            currentPage='home';
        }
    });
    projectsButton.addEventListener('click',()=>{
        pages.mainPage.classList.add('hide');
        pages.selectedProjectPage.classList.add('hide');
        pages.projectsPage.classList.remove('hide');
        projectsPageEvents();
        currentPage='projects';
    });
})();
function mainPageEvents(){
    
    const newTask = document.querySelector('.newTask');
    const allTasks = document.querySelector('main');

    newTask.addEventListener('click', ()=>{
        addTaskVariables.addTaskModal.showModal();
    });
    addTaskVariables.addTaskCANCEL.addEventListener('click', ()=>{
        addTaskVariables.addTaskModal.close();
    });
    allTasks.addEventListener('click', (event)=>{
        if(event.target.closest("article")){
            infoTaskVariables.infoTaskModal.showModal();
        }
        infoTaskVariables.infoTaskModal.addEventListener('click', (event)=>{
            if(event.target.closest(".infoContent")){}
            else infoTaskVariables.infoTaskModal.close();
        });
    });
    
};
function projectsPageEvents(){
    
    const newProject = document.querySelector('.newProject');
    const allProjects = document.querySelector('.allProjects');

    newProject.addEventListener('click', ()=>{
        addProjectVariables.addProjectModal.showModal();
    });
    addProjectVariables.addProjectCANCEL.addEventListener('click', ()=>{
        addProjectVariables.addProjectModal.close();
    });
    allProjects.addEventListener('click', (event)=>{
            if(event.target.closest(".projectCard")){
                console.log('hola');
            }
    });
};
function selectedProjectPageEvents(){
    
    const newProjectTask = document.querySelector('.newProjectTask');
    const projectMain = document.querySelector('#selectedProjectPage>main');
    const projectTitle = document.querySelector('.headerTitle');

    newProjectTask.addEventListener('click', ()=>{
        addTaskVariables.addTaskModal.showModal();
    });
    addTaskVariables.addTaskCANCEL.addEventListener('click', ()=>{
        addTaskVariables.addTaskModal.close();
    });
    projectMain.addEventListener('click', (event)=>{
        if(event.target.closest("article")){
            infoTaskVariables.infoTaskModal.showModal();
        }
        infoTaskVariables.infoTaskModal.addEventListener('click', (event)=>{
            if(event.target.closest(".infoContent")){}
            else infoTaskVariables.infoTaskModal.close();
        });
    });
    projectTitle.addEventListener('click', (event)=>{
        infoProjectVariables.infoProjectModal.showModal();
        infoProjectVariables.infoProjectModal.addEventListener('click', (event)=>{
            if(event.target.closest(".infoContent")){}
            else infoProjectVariables.infoProjectModal.close();
        });
    });
};

function addToDOM(){
    let taskDOM = ()=>{
        console.log('taskDOM');
        for(let task of tasks){
            if(task.added === false){
                console.log(task);
                task.added=true;
                const card = document.createElement("article");
                card.id = task.id;
                card.classList.add("card");

                const cardPriority = document.createElement("div");
                cardPriority.classList.add("cardPriority");
                cardPriority.style = `background-color: ${styleFunctions().priorityColor(task.priority)};`;
                card.appendChild(cardPriority);

                const cardTitle = document.createElement("p");
                cardTitle.classList.add("cardTitle");
                cardTitle.textContent = task.title;
                card.appendChild(cardTitle);

                let list = styleFunctions().column(task.status);
                list.appendChild(card);
            }
        }
    }


    return {taskDOM}
}

function styleFunctions(){
    let column = (status)=>{
        let list;
        switch(status){
            case 'todo':
                list = document.querySelector('.todo.list');
                break;
            case 'doing':
                list = document.querySelector('.doing.list');
                break;
            case 'done':
                list = document.querySelector('.done.list');
                break;
        }
        return list
    };
    let priorityColor = (priority)=>{
        let color;
        switch(priority){
            case 'low':
                color= 'green';
                break;
            case 'min':
                color= 'yellowgreen';
                break;
            case 'mod':
                color= 'yellow';
                break;
            case 'imp':
                color= 'orangered';
                break;
            case 'vim':
                color= 'red';
                break;
        }
        return color
    };
    return{priorityColor, column}
}
selectedProjectPageEvents();