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
        let newTaskOBJ = Object.assign({}, newtask);
        newtask.add(newTaskOBJ);
        if(currentPage==newTaskOBJ.project){
            addToDOM().selectedProjectDOM(newTaskOBJ.project);
        }
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

    let taskInfo = (selectedTask)=>{
        
        let title, selectedProject, status, date, priority, priorityColor, description, notes;
        for(let task of tasks){
            if(task.id == selectedTask.getAttribute('id')){
                title = task.title;                                                
                selectedProject = task.project;                                            
                status = task.status;                                            
                date = task.date;                                            
                priority = task.priority;                    
                description = task.description;
                notes = task.notes;
                priorityColor = styleFunctions().priorityColor(priority);
                break;                
            }
        }
        for(let project of projects){
            if(project.id == selectedProject){
                selectedProject = project.title;
                break;
            }
        }

        const taskInfoTitle = document.querySelector('#infoTaskModal .infoTitle h1');
        taskInfoTitle.textContent = title;

        const taskInfoProject = document.querySelector('#infoTaskModal .infoProject p');
        taskInfoProject.textContent = selectedProject;

        const taskInfoStatus = document.querySelector('#infoTaskModal .infoStatus .infoData');
        taskInfoStatus.textContent = styleFunctions().statusText(status);

        const taskInfoDate = document.querySelector('#infoTaskModal .infoDate .infoData');
        taskInfoDate.textContent = styleFunctions().dateFormat(date);
        
        const taskInfoPriorityText = document.querySelector('#infoTaskModal .infoPriority .infoData');
        taskInfoPriorityText.textContent = styleFunctions().priorityText(priority);
        taskInfoPriorityText.style = `text-shadow:
                                        0 0 2px ${priorityColor},
                                        0 0 5px ${priorityColor},
                                        0 0 10px ${priorityColor},
                                        0 0 15px ${priorityColor},
                                        0 0 20px ${priorityColor};`;
        const taskInfoPriority = document.querySelector('#infoTaskModal .infoPriority svg');
        taskInfoPriority.style=`fill: ${priorityColor};`;
        
        const taskInfoDescription = document.querySelector('#infoTaskModal .infoDescription .infoData');
        taskInfoDescription.textContent = description;
        
        const taskInfoNote = document.querySelector('#infoTaskModal .infoNote .infoData');
        taskInfoNote.textContent = notes;
        
        const deleteTaskDIV = document.querySelector('#infoTaskModal .deleteTaskDIV');

    };

    return {infoTaskModal, taskInfo}
})();
const infoProjectEvents = (function(){

    const infoProjectModal = document.querySelector('#infoProjectModal');
    
    let projectInfo = (selectedProjectInfo)=>{
        
        let title, date, priority, priorityColor, description, notes, projectTasks;
        for(let project of projects){
            if(project.id == selectedProjectInfo.getAttribute('id')){
                title = project.title;                                                                                                                           
                date = project.date;                                            
                priority = project.priority;                    
                description = project.description;
                notes = project.notes;
                priorityColor = styleFunctions().priorityColor(priority);
                projectTasks = project.tasks;
                break;                
            }
        }

        const projectInfoTitle = document.querySelector('#infoProjectModal .infoTitle h1');
        projectInfoTitle.textContent = title;

        const projectInfoProgressBar = document.querySelector('#infoProjectModal .infoProgressBar');
        projectInfoProgressBar.value = variousFunctions.projectProgressNumber(projectTasks);
        const projectInfoProgressPercentage = document.querySelector('#infoProjectModal .infoProgressPercentage');
        projectInfoProgressPercentage.textContent = `${variousFunctions.projectProgressNumber(projectTasks)}%`;
        const projectInfoTotalTasks = document.querySelector('#infoProjectModal .infoTotalTasks .infoData');
        projectInfoTotalTasks.textContent = projectTasks.total;
        const projectInfoDoneTasks = document.querySelector('#infoProjectModal .infoDoneTasks .infoData');
        projectInfoDoneTasks.textContent = projectTasks.done.length;


        const projectInfoDate = document.querySelector('#infoProjectModal .infoDate .infoData');
        projectInfoDate.textContent = styleFunctions().dateFormat(date);
        
        const projectInfoPriorityText = document.querySelector('#infoProjectModal .infoPriority .infoData');
        projectInfoPriorityText.textContent = styleFunctions().priorityText(priority);
        projectInfoPriorityText.style = `text-shadow:
                                        0 0 2px ${priorityColor},
                                        0 0 5px ${priorityColor},
                                        0 0 10px ${priorityColor},
                                        0 0 15px ${priorityColor},
                                        0 0 20px ${priorityColor};`;
        const projectInfoPriority = document.querySelector('#infoProjectModal .infoPriority svg');
        projectInfoPriority.style=`fill: ${priorityColor};`;
        
        const projectInfoDescription = document.querySelector('#infoProjectModal .infoDescription .infoData');
        projectInfoDescription.textContent = description;
        
        const projectInfoNote = document.querySelector('#infoProjectModal .infoNote .infoData');
        projectInfoNote.textContent = notes;
        
        const deleteTaskDIV = document.querySelector('#infoProjectModal .deleteTaskDIV');

    };

    return {infoProjectModal, projectInfo}
})();
let projects = [ 
    { id: "1", 
      title: "P1", 
      description: "project1Description", 
      date: "2025-08-10", 
      priority: "imp", 
      added: true, 
      tasks: {
        all: [ ],
        done: [ ],
        get total() {
            return this.all.length;
        }},
      added: false,
      notes: "Add Notes!"
    }
];
let tasks = [ 
    { id: "36691a9b-c200-4d90-8c7d-af744c51406c", 
    title: "T1", 
    project: '1', 
    description: "task2Description", 
    date: "2025-07-29", 
    priority: "vim", 
    status: "doing", 
    added: false,
    notes: "Add Notes!"},
    { id: "36691a9b-c200-4d90-8c7d-af744c51406a", 
    title: "T2", 
    project: '1', 
    description: "task2Description", 
    date: "2025-08-11", 
    priority: "low", 
    status: "done", 
    added: false,
    notes: "Add Notes!"},
    { id: "36691a9b-c200-4d90-8c7d-af744c514069", 
    title: "T3", 
    project: '1', 
    description: "task2Description", 
    date: "2025-08-11", 
    priority: "mod", 
    status: "todo", 
    added: false ,
    notes: "Add Notes!"}
];
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
        this.added = false,
        this.notes = "Add Notes!"
    }
    add(task){
        tasks.push(task);
        addToDOM().mainTaskDOM();
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
            all: [ ],
            done: [ ],
            get total() {
                return this.all.length;
            }
        },
        this.notes = " "
    }
    add(project){
        projects.push(project);
        addToDOM().projectDOM();
    }
}

const sidebar = (function(){
    const homeButton = document.querySelector(".home");
    const projectsButton = document.querySelector(".sbProjectsButton");
    const sdProjectList = document.querySelector(".sdProjectList");
    const addProjectButton = document.querySelector(".sbAddProject");

    homeButton.addEventListener('click',()=>{
        if(currentPage!=='home'){
            pages.projectsPage.classList.add('hide');
            pages.selectedProjectPage.classList.add('hide');
            pages.mainPage.classList.remove('hide');

            addToDOM().mainTaskDOM();
            currentPage='home';
        }
    });
    projectsButton.addEventListener('click',()=>{
        pages.mainPage.classList.add('hide');
        pages.selectedProjectPage.classList.add('hide');
        pages.projectsPage.classList.remove('hide');
        currentPage='projects';
    });
    addProjectButton.addEventListener('click',()=>{
        addProjectEvents.addProjectModal.showModal();
    });
    sdProjectList.addEventListener('click', (event)=>{
            if(event.target.closest(".projectListItem")){
                let selectedProject = event.target.closest(".projectListItem");
                selectedProjectPage(selectedProject.id);
            }
    });

    return {sdProjectList}
})();
const mainPageEvents = (function(){
    
    const newTask = document.querySelector('.newTask');
    const allTasks = document.querySelector('main');

    newTask.addEventListener('click', ()=>{
        addTaskEvents.addTaskModal.showModal();
        variousFunctions.addTaskSelectProject('mainTask');
    });
    allTasks.addEventListener('click', (event)=>{
        if(event.target.closest("article")){
            infoTaskEvents.infoTaskModal.showModal();
            infoTaskEvents.taskInfo(event.target.closest("article"));
        }
        infoTaskEvents.infoTaskModal.addEventListener('click', (event)=>{
            if(event.target.closest(".infoContent")){}
            else infoTaskEvents.infoTaskModal.close();
        });
    });
    
})();
const projectsPageEvents = (function(){
    
    const newProject = document.querySelector('.newProject');
    const allProjects = document.querySelector('.allProjects');

    newProject.addEventListener('click', ()=>{
        addProjectEvents.addProjectModal.showModal();
    });
    allProjects.addEventListener('click', (event)=>{
            if(event.target.closest(".projectCard")){
                let selectedProject = event.target.closest(".projectCard");
                selectedProjectPage(selectedProject.id);
            }
    });
})();
const selectedProjectPageEvents = (function(){
    
    const newProjectTask = document.querySelector('.newProjectTask');
    const projectMain = document.querySelector('#selectedProjectPage>main');
    const projectTitle = document.querySelector('.headerTitle');
    const projectTitleH1 = document.querySelector('.headerTitle>h1');
    const projectProgressBar = document.querySelector('.projectProgressBar');
    const projectDueDate = document.querySelector('.projectDueDate>.date');

    newProjectTask.addEventListener('mousedown', ()=>{
        variousFunctions.addTaskSelectProject('projectTask');
        addTaskEvents.addTaskModal.showModal();
    });
    projectMain.addEventListener('click', (event)=>{
        if(event.target.closest("article")){
            infoTaskEvents.infoTaskModal.showModal();
            infoTaskEvents.taskInfo(event.target.closest("article"));
        }
        infoTaskEvents.infoTaskModal.addEventListener('click', (event)=>{
            if(event.target.closest(".infoContent")){}
            else infoTaskEvents.infoTaskModal.close();
        });
    });
    projectTitle.addEventListener('click', (event)=>{
        infoProjectEvents.infoProjectModal.showModal();
        infoProjectEvents.projectInfo(event.target.closest('.headerTitle'));
        infoProjectEvents.infoProjectModal.addEventListener('click', (event)=>{
            if(event.target.closest(".infoContent")){}
            else infoProjectEvents.infoProjectModal.close();
        });
    });

    return {projectTitle, projectTitleH1,projectProgressBar,projectDueDate}
})();
function selectedProjectPage(id){
    currentPage=id;
    pages.mainPage.classList.add('hide');
    pages.projectsPage.classList.add('hide');
    pages.selectedProjectPage.classList.remove('hide');
    addToDOM().selectedProjectDOM(id);
}

function addToDOM(){
    let mainTaskDOM = ()=>{
        for(let task of tasks){
            if(task.added === false){
                task.added=true;

                // main Page
                const card = variousFunctions.card(task);

                let list = styleFunctions().columnMain(task.status);
                list.appendChild(card);

                //Add task to Project OBJ
                variousFunctions.addTaskToProjectOBJ(task);
            }
        }
    }

    let projectDOM = ()=>{
        for(let project of projects){
            if(project.added === false){
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
                progressBar.value = variousFunctions.projectProgressNumber(project.tasks);

                progressDIV.appendChild(progressBar);
                projectCard.appendChild(progressDIV);

                let list = document.querySelector('.allProjects');
                list.appendChild(projectCard);

                projectSidebarDOM();
            }
        }
        function  projectSidebarDOM(){
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
        let title, date, projectTasks;
        for(let project of projects){
            if(project.id == id){
                title = project.title;
                date = project.date;
                projectTasks = project.tasks;
            }
        }
        selectedProjectPageEvents.projectTitleH1.textContent = title;
        selectedProjectPageEvents.projectTitle.id=id;
        selectedProjectPageEvents.projectProgressBar.value = variousFunctions.projectProgressNumber(projectTasks);
        selectedProjectPageEvents.projectDueDate.textContent = date;

        let columns= {
            todo: document.querySelector('#selectedProjectPage .todo.list'),
            doing: document.querySelector('#selectedProjectPage .doing.list'),
            done: document.querySelector('#selectedProjectPage .done.list')
        };
        for(let column in columns){
            columns[column].innerHTML="";
        }

        for(let task of projectTasks.all){
            let taskCard = variousFunctions.card(task);
            switch(task.status){
                case 'todo':
                    columns.todo.appendChild(taskCard);
                    break;
                case 'doing':
                    columns.doing.appendChild(taskCard);
                    break;
                case 'done':
                    columns.done.appendChild(taskCard);
                    break;
            }
        }

    }

    return {mainTaskDOM, projectDOM, selectedProjectDOM}
}

function styleFunctions(){
    let columnMain = (status)=>{
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
    let priorityText = (priority)=>{
        let text;
        switch(priority){
            case 'low':
                text= 'LOW';
                break;
            case 'min':
                text= 'MINOR';
                break;
            case 'mod':
                text= 'MODERATE';
                break;
            case 'imp':
                text= 'IMPORTANT';
                break;
            case 'vim':
                text= 'VERY IMPORTANT!';
                break;
        }
        return text
    };
    let statusText = (status)=>{
        let text;
        switch(status){
            case 'todo':
                text= 'Pending';
                break;
            case 'doing':
                text= 'In Progress';
                break;
            case 'done':
                text= 'Completed';
                break;
        }
        return text
    };
    let dateFormat = (date)=>{
        const [year, month, day] = date.split('-');
        const rawDate = new Date(year, month - 1, day); // Safe way!

        const weekday = rawDate.toLocaleDateString('en-US', { weekday: 'long' });
        const monthShort = rawDate.toLocaleDateString('en-US', { month: 'short' });

        return `${weekday} ${day}/${monthShort}/${year}`
    };

    return{priorityColor, columnMain, priorityText, statusText, dateFormat}
}

const variousFunctions = (function(){
    let card = (task)=>{
        let taskCard = document.createElement("article");
        taskCard.id = task.id;
        taskCard.classList.add("card");

        const cardPriority = document.createElement("div");
        cardPriority.classList.add("cardPriority");
        cardPriority.style = `background-color: ${styleFunctions().priorityColor(task.priority)};`;
        taskCard.appendChild(cardPriority);

        const cardTitle = document.createElement("p");
        cardTitle.classList.add("cardTitle");
        cardTitle.textContent = task.title;
        taskCard.appendChild(cardTitle);

        return taskCard
    }

    let addTaskSelectProject = (page)=>{
        const taskProject = document.querySelector('#taskProject');
        taskProject.innerHTML='<option></option>';
        if(projects.length>0){
            for(let project of projects){
                const projectOption = document.createElement('option');
                projectOption.textContent=project.title;
                projectOption.value = project.id;
                taskProject.appendChild(projectOption);

                if(page=='projectTask'){
                    if(currentPage==project.id){
                        taskProject.value=currentPage;
                    }
                }
            }
        }
    };

    let addTaskToProjectOBJ = (task)=>{
        if(task.project){
            for(let project of projects){
                if(task.project==project.id){
                    project.tasks.all.push(task);
                }
            }
        }
    }

    let projectProgressNumber = (task)=>{
        return (task.total == 0)? 0 : parseInt(task.done.length * 100 / task.total);
    }

    return{addTaskSelectProject, addTaskToProjectOBJ, card, projectProgressNumber}
})();

let task1 = new NewTask('task1', undefined, 'task1Description', '2025-08-10', 'min');
task1.add(Object.assign({}, task1));

let task2 = new NewTask('task2', undefined, 'task2Description', '2025-08-11', 'mod');
task2.status='doing';
task2.add(Object.assign({}, task2));

let task3 = new NewTask('task3', undefined, 'task3Description', '2025-05-04', 'imp');
task3.status='done';
task3.add(Object.assign({}, task3));


let project1 = new NewProject('project1', 'project1Description', '2025-08-10', 'imp');
project1.add(Object.assign({}, project1));

let project2 = new NewProject('project2', 'project2Description', '2025-08-11', 'mod');
project2.add(Object.assign({}, project2));

let project3 = new NewProject('project3', 'project3Description', '2025-08-15', 'vim');
project3.add(Object.assign({}, project3));

let project4 = new NewProject('project4', 'project4Description', '2025-08-10', 'imp');
project4.add(Object.assign({}, project4));
