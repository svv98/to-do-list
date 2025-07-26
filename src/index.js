import "./style.css";

const pages = (function(){
    
    const mainPage = document.querySelector('#mainPage');
    const projectsPage = document.querySelector('#projectsPage');
    const selectedProjectPage = document.querySelector('#selectedProjectPage');

    return {mainPage, projectsPage, selectedProjectPage}
})();
const addTaskEvents = (function(){
    
    const addTaskModal = document.querySelector('#addTaskModal');
    const addTaskForm = document.querySelector('#addTaskForm');
    const addTaskCANCEL = document.querySelector('#addTaskModal button[type="reset"]');

    addTaskForm.addEventListener('submit', function(event){
        event.preventDefault();
        const formData = new FormData(this);

        const title = formData.get('taskTitle');
        const project = formData.get('taskProject');
        const description = formData.get('taskDescription');
        const date = formData.get('taskDueDate');
        const priority = formData.get('taskPriotity');

        let newtask = new NewTask(title, project, description, date, priority);
        newtask.add(Object.assign({}, newtask));
        addTaskModal.close();
    });

    addTaskCANCEL.addEventListener('click', ()=>{
        addTaskModal.close();
    });

    return {addTaskModal}
})();
const addProjectEvents = (function(){
    
    const addProjectModal = document.querySelector('#addProjectModal');
    const addProjectForm = document.querySelector('#addProjectForm');
    const addProjectCANCEL = document.querySelector('#addProjectModal button[type="reset"]');

    addProjectForm.addEventListener('submit', function(event){
        event.preventDefault();
        const formData = new FormData(this);

        const title = formData.get('projectTitle');
        const description = formData.get('projectDescription');
        const date = formData.get('projectDueDate');
        const priority = formData.get('projectPriotity');

        let newproject = new NewProject(title, description, date, priority);
        newproject.add(Object.assign({}, newproject));
        addProjectModal.close();
        addProjectForm.reset();
    });

    addProjectCANCEL.addEventListener('click', ()=>{
        addProjectModal.close();
        addProjectForm.reset();
    });

    return {addProjectModal}
})();
const infoTaskEvents = (function(){
    
    const infoTaskModal = document.querySelector('#infoTaskModal');
    const infoTaskCANCEL = document.querySelector('#infoTaskModal button[type="reset"]');
    const infoTaskSUBMIT = document.querySelector('#infoTaskModal button[type="submit"]');

    return {infoTaskModal, infoTaskCANCEL, infoTaskSUBMIT}
})();
const infoProjectEvents = (function(){

    const infoProjectModal = document.querySelector('#infoProjectModal');
    const infoProjectCANCEL = document.querySelector('#infoProjectModal button[type="reset"]');
    const infoProjectSUBMIT = document.querySelector('#infoProjectModal button[type="submit"]');

    return {infoProjectModal, infoProjectCANCEL, infoProjectSUBMIT}
})();

let tasks = [ ];
let projects = [ ];
let currentPage = 'home';
let sidebarProjectCounter = 0;

class NewTask{
    constructor(title, project, description, date, priority){
        this.id = crypto.randomUUID();
        this.title = title;
        this.project = project;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.status = "todo";
        this.added = false
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
            get total() {
                return this.toDo.length + this.doing.length + this.done.length;
            }
        };
    }
    add(project){
        projects.push(project);
        addToDOM().projectDOM();
    }
}

const sidebar = (function(){
    mainPageEvents();
    const homeButton = document.querySelector(".home");
    const projectsButton = document.querySelector(".sbProjectsButton");
    const sdProjectList = document.querySelector(".sdProjectList");
    const addProjectButton = document.querySelector(".sbAddProject");

    homeButton.addEventListener('click',()=>{
        if(currentPage!=='home'){
            pages.projectsPage.classList.add('hide');
            pages.selectedProjectPage.classList.add('hide');
            pages.mainPage.classList.remove('hide');

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
    addProjectButton.addEventListener('click',()=>{
        addProjectEvents.addProjectModal.showModal();
    });
    sdProjectList.addEventListener('click', (event)=>{
            if(event.target.closest(".projectListItem")){
                let selectedProject = event.target.closest(".projectListItem");
                selectedProjectPage(selectedProject.id);
                console.log(selectedProject.id);
                addToDOM().selectedProjectDOM(selectedProject.id);
            }
    });

    return {sdProjectList}
})();
function mainPageEvents(){
    
    const newTask = document.querySelector('.newTask');
    const allTasks = document.querySelector('main');

    newTask.addEventListener('click', ()=>{
        addTaskEvents.addTaskModal.showModal();
    });
    allTasks.addEventListener('click', (event)=>{
        if(event.target.closest("article")){
            infoTaskEvents.infoTaskModal.showModal();
        }
        infoTaskEvents.infoTaskModal.addEventListener('click', (event)=>{
            if(event.target.closest(".infoContent")){}
            else infoTaskEvents.infoTaskModal.close();
        });
    });
    
};
function projectsPageEvents(){
    
    const newProject = document.querySelector('.newProject');
    const allProjects = document.querySelector('.allProjects');

    newProject.addEventListener('click', ()=>{
        addProjectEvents.addProjectModal.showModal();
    });
    allProjects.addEventListener('click', (event)=>{
            if(event.target.closest(".projectCard")){
                let selectedProject = event.target.closest(".projectCard");
                selectedProjectPage(selectedProject.id);
                addToDOM().selectedProjectDOM();
            }
    });
};
function selectedProjectPageEvents(){
    
    const newProjectTask = document.querySelector('.newProjectTask');
    const projectMain = document.querySelector('#selectedProjectPage>main');
    const projectTitle = document.querySelector('.headerTitle');
    const projectTitleH1 = document.querySelector('.headerTitle>h1');
    const projectProgressBar = document.querySelector('.projectProgressBar');
    const projectDueDate = document.querySelector('.projectDueDate>.date');

    newProjectTask.addEventListener('click', ()=>{
        addTaskEvents.addTaskModal.showModal();
    });
    projectMain.addEventListener('click', (event)=>{
        if(event.target.closest("article")){
            infoTaskEvents.infoTaskModal.showModal();
        }
        infoTaskEvents.infoTaskModal.addEventListener('click', (event)=>{
            if(event.target.closest(".infoContent")){}
            else infoTaskEvents.infoTaskModal.close();
        });
    });
    projectTitle.addEventListener('click', (event)=>{
        infoProjectEvents.infoProjectModal.showModal();
        infoProjectEvents.infoProjectModal.addEventListener('click', (event)=>{
            if(event.target.closest(".infoContent")){}
            else infoProjectEvents.infoProjectModal.close();
        });
    });

    return {projectTitleH1,projectProgressBar,projectDueDate}
};
function selectedProjectPage(id){
    pages.mainPage.classList.add('hide');
    pages.projectsPage.classList.add('hide');
    pages.selectedProjectPage.classList.remove('hide');
    selectedProjectPageEvents()
    currentPage=id;
}

function addToDOM(){
    let taskDOM = ()=>{
        // console.log('taskDOM');
        for(let task of tasks){
            if(task.added === false){
                console.log(task);
                task.added=true;

                // main Page
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

    let projectDOM = ()=>{
        for(let project of projects){
            if(project.added === false){
                console.log(project);
                project.added=true;

                // projects page
                const projectCard = document.createElement("article");
                projectCard.classList.add("projectCard");
                projectCard.id = project.id;

                const projectPriority = document.createElement("div");
                projectPriority.classList.add("projectPriority");
                projectPriority.style = `background-color: ${styleFunctions().priorityColor(project.priority)};`;
                projectCard.appendChild(projectPriority);

                const projectTitle = document.createElement("p");
                projectTitle.classList.add("projectTitle");
                projectTitle.textContent = project.title;
                projectCard.appendChild(projectTitle);

                const progressDIV = document.createElement("p");
                progressDIV.classList.add("progressDIV");
                const progressBar = document.createElement("progress");
                progressBar.classList.add("progressBar");
                progressBar.max=100;
                progressBar.value = (project.tasks.total == 0)? 0 : parseInt(project.tasks.done.length * 100 / project.tasks.total);
                project.progress= progressBar.value;

                progressDIV.appendChild(progressBar);
                projectCard.appendChild(progressDIV);

                let list = document.querySelector('.allProjects');
                list.appendChild(projectCard);

                projectSidebarDOM();
            }
        }
        function  projectSidebarDOM(){
            console.log(projects);
           if(sidebarProjectCounter<5){
                const projectListItem = document.createElement('li');
                projectListItem.id = projects[projects.length-1].id;
                projectListItem.classList.add('projectListItem');
                projectListItem.textContent = projects[projects.length-1].title;

                sidebar.sdProjectList.appendChild(projectListItem);
                sidebarProjectCounter++;
           }
        }
    }

    let selectedProjectDOM = (id)=>{
        let title, progress, date;
        for(let project of projects){
            if(project.id == id){
                title = project.title;
                progress = project.progress;
                date = project.date;
            }
        }
        selectedProjectPageEvents().projectTitleH1.textContent = title;
        selectedProjectPageEvents().projectProgressBar.value = progress;
        selectedProjectPageEvents().projectDueDate.textContent = date;
        if(!(document.querySelector('#selectedProjectPage .todo.list').hasChildNodes())){
            console.log('noChild');
        }
        if(!(document.querySelector('#selectedProjectPage .doing.list').hasChildNodes())){
            console.log('noChild');
        }
        if(!(document.querySelector('#selectedProjectPage .done.list').hasChildNodes())){
            console.log('noChild');
        }
    }

    return {taskDOM, projectDOM, selectedProjectDOM}
}

function styleFunctions(){
    let column = (status)=>{
        let list;
        switch(status){
            case 'todo':
                list = document.querySelector('#mainPage .todo.list');
                break;
            case 'doing':
                list = document.querySelector('#mainPage .doing.list');
                break;
            case 'done':
                list = document.querySelector('#mainPage .done.list');
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

let task1 = new NewTask('task1', undefined, 'task1Description', '2025-08-10', 'low');
task1.add(Object.assign({}, task1));

let task2 = new NewTask('task2', undefined, 'task2Description', '2025-08-11', 'mod');
task2.status='doing';
task2.add(Object.assign({}, task2));

let task3 = new NewTask('task3', undefined, 'task3Description', '2025-05-04', 'imp');
task3.status='done';
task3.add(Object.assign({}, task3));


let project1 = new NewProject('project1', 'project1Description', '2025-08-10', 'imp');
project1.tasks.toDo.push(1);
project1.tasks.done.push(1);
project1.tasks.done.push(1);
project1.add(Object.assign({}, project1));

let project2 = new NewProject('project2', 'project2Description', '2025-08-11', 'mod');
project2.tasks.toDo.push(1);
project2.tasks.toDo.push(1);
project2.tasks.done.push(1);
project2.add(Object.assign({}, project2));

let project3 = new NewProject('project3', 'project3Description', '2025-08-15', 'vim');
project3.add(Object.assign({}, project3));

let project4 = new NewProject('project4', 'project4Description', '2025-08-10', 'imp');
project4.add(Object.assign({}, project4));

let project5 = new NewProject('project5', 'project5Description', '2025-08-10', 'mod');
project5.add(Object.assign({}, project5));

let project6 = new NewProject('project6', 'project6Description', '2025-08-10', 'vim');
project6.add(Object.assign({}, project6));