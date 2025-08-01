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
            addDOM.selectedProjectDOM(newTaskOBJ.project);
        }
        addTaskModal.close();
        addTaskForm.reset();
    });

    addTaskCANCEL.addEventListener('click', ()=>{
        addTaskModal.close();
        addTaskForm.reset();
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

    let modalElements = function(){
        const infoTaskContent = document.querySelector('#infoTaskModal .infoContent');

        const taskInfoTitle = document.querySelector('#infoTaskModal .infoTitle');
        taskInfoTitle.innerHTML='';

        const taskInfoProject = document.querySelector('#infoTaskModal .infoProject');
        taskInfoProject.innerHTML='';

        const taskInfoStatus = document.querySelector('#infoTaskModal .infoStatus');
        taskInfoStatus.innerHTML='';

        const taskInfoDate = document.querySelector('#infoTaskModal .infoDate');
        taskInfoDate.innerHTML='';

        const taskInfoPriority = document.querySelector('#infoTaskModal .infoPriority');
        taskInfoPriority.innerHTML='';

        const taskInfoDescription = document.querySelector('#infoTaskModal .infoDescription');
        taskInfoDescription.innerHTML='';

        const taskInfoNote = document.querySelector('#infoTaskModal .infoNote');
        taskInfoNote.innerHTML='';

        const deleteTaskDIV = document.querySelector('#infoTaskModal .deleteTaskDIV');

        return{infoTaskContent, taskInfoTitle, taskInfoProject, taskInfoStatus, taskInfoDate, taskInfoPriority, taskInfoDescription, taskInfoNote, deleteTaskDIV}
    }

    let taskInfo = (selectedTask)=>{
        let modalElement = modalElements();
        let title, taskOBJ, selectedProject, selectedProjectID, selectedProjectTitle, priorityColor;
        for(let task of tasks){
            if(task.id == selectedTask.getAttribute('id')){
                taskOBJ = task;                                             
                selectedProjectID = task.project;                                            
                priorityColor = styleFuncs.priorityColor(task.priority);
                break;                
            }
        }
        for(let project of projects){
            if(project.id == selectedProjectID){
                selectedProject = project;
                selectedProjectTitle = project.title;
                break;
            }
        }
        
        let editIcon = `<div class="editIcon" title="Click to edit"></div>`;
        
        const taskInfoTitleH1 = document.createElement('h1');
        taskInfoTitleH1.textContent = taskOBJ.title;
        modalElement.taskInfoTitle.appendChild(taskInfoTitleH1);
        modalElement.taskInfoTitle.insertAdjacentHTML('beforeend', editIcon);

        const taskInfoProjectP = document.createElement('p');
        taskInfoProjectP.textContent = selectedProjectTitle;
        modalElement.taskInfoProject.appendChild(taskInfoProjectP);
        if(currentPage !== 'home'){
            modalElement.taskInfoProject.classList.remove('editProjectMain');
            modalElement.taskInfoProject.classList.add('editSelectedProject');
            modalElement.taskInfoProject.insertAdjacentHTML('beforeend', editIcon);
        }
        else if(currentPage == 'home' && !selectedProject){
            modalElement.taskInfoProject.classList.add('editSelectedProject');
            modalElement.taskInfoProject.classList.remove('editProjectMain');
            modalElement.taskInfoProject.insertAdjacentHTML('beforeend', editIcon);
        }
        else if(currentPage == 'home' && selectedProject){
            modalElement.taskInfoProject.classList.add('editProjectMain');
            modalElement.taskInfoProject.classList.remove('editSelectedProject');
        }

        const taskInfoStatusLabel = document.createElement('p');
        taskInfoStatusLabel.textContent="TASK STATUS";
        taskInfoStatusLabel.classList.add('infoLabel');
        const taskInfoStatusData = document.createElement('div');
        taskInfoStatusData.classList.add('infoData');
        taskInfoStatusData.textContent = styleFuncs.statusText(taskOBJ.status);
        taskInfoStatusData.insertAdjacentHTML('beforeend', editIcon);
        modalElement.taskInfoStatus.appendChild(taskInfoStatusLabel);
        modalElement.taskInfoStatus.appendChild(taskInfoStatusData);

        const taskInfoDateLabel = document.createElement('p');
        taskInfoDateLabel.textContent="DUE DATE";
        taskInfoDateLabel.classList.add('infoLabel');
        const taskInfoDateData = document.createElement('div');
        taskInfoDateData.classList.add('infoData');
        taskInfoDateData.textContent = styleFuncs.dateFormat(taskOBJ.date);
        taskInfoDateData.insertAdjacentHTML('beforeend', editIcon);
        modalElement.taskInfoDate.appendChild(taskInfoDateLabel);
        modalElement.taskInfoDate.appendChild(taskInfoDateData);
        
        let prioritySVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> 
                        <path d="M21.7605 15.92L15.3605 4.4C14.5005 2.85 13.3105 2 12.0005 2C10.6905 2 9.50047 2.85 8.64047 4.4L2.24047 15.92C1.43047 17.39 1.34047 18.8 1.99047 19.91C2.64047 21.02 3.92047 21.63 5.60047 21.63H18.4005C20.0805 21.63 21.3605 21.02 22.0105 19.91C22.6605 18.8 22.5705 17.38 21.7605 15.92ZM11.2505 9C11.2505 8.59 11.5905 8.25 12.0005 8.25C12.4105 8.25 12.7505 8.59 12.7505 9V14C12.7505 14.41 12.4105 14.75 12.0005 14.75C11.5905 14.75 11.2505 14.41 11.2505 14V9ZM12.7105 17.71C12.6605 17.75 12.6105 17.79 12.5605 17.83C12.5005 17.87 12.4405 17.9 12.3805 17.92C12.3205 17.95 12.2605 17.97 12.1905 17.98C12.1305 17.99 12.0605 18 12.0005 18C11.9405 18 11.8705 17.99 11.8005 17.98C11.7405 17.97 11.6805 17.95 11.6205 17.92C11.5605 17.9 11.5005 17.87 11.4405 17.83C11.3905 17.79 11.3405 17.75 11.2905 17.71C11.1105 17.52 11.0005 17.26 11.0005 17C11.0005 16.74 11.1105 16.48 11.2905 16.29C11.3405 16.25 11.3905 16.21 11.4405 16.17C11.5005 16.13 11.5605 16.1 11.6205 16.08C11.6805 16.05 11.7405 16.03 11.8005 16.02C11.9305 15.99 12.0705 15.99 12.1905 16.02C12.2605 16.03 12.3205 16.05 12.3805 16.08C12.4405 16.1 12.5005 16.13 12.5605 16.17C12.6105 16.21 12.6605 16.25 12.7105 16.29C12.8905 16.48 13.0005 16.74 13.0005 17C13.0005 17.26 12.8905 17.52 12.7105 17.71Z"></path> 
                    </g>
                </svg>`;
                       
        const taskInfoPriorityData = document.createElement('div');
        taskInfoPriorityData.classList.add('infoData');
        taskInfoPriorityData.textContent = styleFuncs.priorityText(taskOBJ.priority);
        taskInfoPriorityData.style = `text-shadow:
                                        0 0 2px ${priorityColor},
                                        0 0 5px ${priorityColor},
                                        0 0 10px ${priorityColor},
                                        0 0 15px ${priorityColor},
                                        0 0 20px ${priorityColor};`;
        taskInfoPriorityData.insertAdjacentHTML('beforeend', editIcon);
        const taskInfoPriorityLabel = document.createElement('p');
        taskInfoPriorityLabel.textContent="PRIORITY";
        taskInfoPriorityLabel.classList.add('infoLabel');
        modalElement.taskInfoPriority.insertAdjacentHTML('afterbegin', prioritySVG);
        modalElement.taskInfoPriority.appendChild(taskInfoPriorityData);
        modalElement.taskInfoPriority.appendChild(taskInfoPriorityLabel);
        const prioritySVGCOlor = document.querySelector('#infoTaskModal .infoPriority svg');
        prioritySVGCOlor.style=`fill: ${priorityColor};`;
        
        const taskInfoDescriptionLabel = document.createElement('p');
        taskInfoDescriptionLabel.textContent="DESCRIPTION";
        taskInfoDescriptionLabel.classList.add('infoLabel');
        const taskInfoDescriptionData = document.createElement('div');
        taskInfoDescriptionData.classList.add('infoData');
        taskInfoDescriptionData.textContent = taskOBJ.description;
        modalElement.taskInfoDescription.appendChild(taskInfoDescriptionLabel);
        modalElement.taskInfoDescription.insertAdjacentHTML('beforeend', editIcon);
        modalElement.taskInfoDescription.appendChild(taskInfoDescriptionData);
        
        const taskInfoNoteLabel = document.createElement('p');
        taskInfoNoteLabel.textContent="NOTES";
        taskInfoNoteLabel.classList.add('infoLabel');
        const taskInfoNoteData = document.createElement('div');
        taskInfoNoteData.classList.add('infoData');
        taskInfoNoteData.textContent = taskOBJ.notes;
        modalElement.taskInfoNote.appendChild(taskInfoNoteLabel);
        modalElement.taskInfoNote.insertAdjacentHTML('beforeend', editIcon);
        modalElement.taskInfoNote.appendChild(taskInfoNoteData);
        
        modalElement.deleteTaskDIV.onclick = ()=>{
            let confirmAlert = confirm("ARE YOU SURE YOU WANT TO DELETE" + "\n" + `${taskOBJ.title} ?!?!?!`);
            if(confirmAlert){
                infoTaskModal.close();
                // document.getElementById(`${taskOBJ.id}`).remove();

                //Delete from TASKS Array and Main Page
                let taskList= [ ];
                for(let task of tasks){
                    if(task.id!=taskOBJ.id){
                    taskList.push(task);
                    }
                }
                tasks=taskList;
                addDOM.mainTaskDOM();
                addDOM.projectDOM();
                if(selectedProject){
                    if(currentPage==selectedProjectID){
                        addDOM.selectedProjectDOM(selectedProjectID);
                    }
                }
            }
        };

        modalElement.infoTaskContent.onclick = (event)=>{
            event.stopPropagation();
            if(event.target.closest('.infoTitle') && editingFlag==false){
                editTaskInfo('title', modalElement.taskInfoTitle, taskOBJ.title, taskOBJ.id, selectedProjectID, selectedTask);
            }
            else if(event.target.closest('.infoProject.editSelectedProject') && editingFlag==false){
                editTaskInfo('project', modalElement.taskInfoProject, selectedProject, taskOBJ.id, selectedProjectID, selectedTask, taskOBJ);
            }
            else if(event.target.closest('.infoStatus') && editingFlag==false){
                editTaskInfo('status', modalElement.taskInfoStatus, taskOBJ.status, taskOBJ.id, selectedProjectID, selectedTask, selectedProject);
            }
            else if(event.target.closest('.infoDate') && editingFlag==false){
                editTaskInfo('date', modalElement.taskInfoDate, taskOBJ.date, taskOBJ.id, selectedProjectID, selectedTask);
            }
            else if(event.target.closest('.infoPriority') && editingFlag==false){
                editTaskInfo('priority', modalElement.taskInfoPriority, taskOBJ.priority, taskOBJ.id, selectedProjectID, selectedTask, prioritySVG);
            }
            else if(event.target.closest('.infoDescription') && editingFlag==false){
                editTaskInfo('description', modalElement.taskInfoDescription, taskOBJ.description, taskOBJ.id, selectedProjectID, selectedTask);
            }
            else if(event.target.closest('.infoNote') && editingFlag==false){
                editTaskInfo('notes', modalElement.taskInfoNote, taskOBJ.notes, taskOBJ.id, selectedProjectID, selectedTask);
            }
            else if(event.target.closest('.infoProject.editProjectMain')){
                selectedProjectPage(selectedProject.id);
                addDOM.selectedProjectDOM(selectedProject.id);
                infoTaskModal.close();
            }
        }
    };
    let editTaskInfo = (change, element, currentValue, taskID, projectID, taskElement, extraInfo)=>{
        let newValue;
        editingFlag = true;
        element.innerHTML="";
        element.classList.add('editInfo');
        const editForm = document.createElement('form');
        switch(change){
            case 'title':
                const labelTitle = document.createElement('label');
                labelTitle.for='taskTitle';
                labelTitle.classList.add('infoLabel');
                labelTitle.textContent="Title";
                const inputTitle = document.createElement('input');
                inputTitle.type='text';
                inputTitle.id='taskTitle';
                inputTitle.name='taskTitle';
                inputTitle.value=currentValue;
                editForm.appendChild(labelTitle);
                editForm.appendChild(inputTitle);
                element.appendChild(editForm);

                inputTitle.onkeydown = (event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault(); 
                        newValue = inputTitle.value.trim();
                        editTaskandProjectArrays(newValue, taskID, projectID, change, taskElement, currentValue);
                    }
                };
                break;
            case 'project':
                const labelProject = document.createElement('label');
                labelProject.for='taskProject';
                labelProject.classList.add('infoLabel');
                labelProject.textContent="PROJECT";
                const selectProject = document.createElement('select');
                selectProject.id='taskProject';
                selectProject.name='taskProject';
                        
                editForm.appendChild(labelProject);
                editForm.appendChild(selectProject);
                element.appendChild(editForm);
                variousFunctions.taskSelectProject("", true);
                selectProject.value= (projectID)?`${projectID}`: "";

                selectProject.onchange = (event) => {
                    event.preventDefault(); 
                    newValue = selectProject.value;
                    editTaskandProjectArrays(newValue, taskID, projectID, change, taskElement, currentValue);
                    if(projectID) addDOM.selectedProjectDOM(projectID);
                    addDOM.projectDOM();
                };
                break;
            case 'status':
                const labelStatus = document.createElement('label');
                labelStatus.for='taskStatus';
                labelStatus.classList.add('infoLabel');
                labelStatus.textContent="TASK STATUS";
                const selectStatus = document.createElement('select');
                selectStatus.id='taskStatus';
                selectStatus.name='taskStatus';        
                const selectStatusTODO = document.createElement('option');
                selectStatusTODO.value='todo';
                selectStatusTODO.textContent='Pending / To Do';
                const selectStatusDOING = document.createElement('option');
                selectStatusDOING.value='doing';
                selectStatusDOING.textContent='In Progress / Doing';
                const selectStatusDONE = document.createElement('option');
                selectStatusDONE.value='done';
                selectStatusDONE.textContent='Completed / Done';

                selectStatus.appendChild(selectStatusTODO);
                selectStatus.appendChild(selectStatusDOING);
                selectStatus.appendChild(selectStatusDONE);
                editForm.appendChild(labelStatus);
                editForm.appendChild(selectStatus);
                element.appendChild(editForm);
                selectStatus.value=`${currentValue}`;

                selectStatus.onchange = (event) => {
                    event.preventDefault(); 
                    newValue = selectStatus.value;
                    editTaskandProjectArrays(newValue, taskID, projectID, change, taskElement, currentValue);
                    if(projectID) addDOM.selectedProjectDOM(projectID);
                    addDOM.projectDOM();      
                };
                break;
            case 'date':
                const labelDate = document.createElement('label');
                labelDate.for='taskDueDate';
                labelDate.classList.add('infoLabel');
                labelDate.textContent="DUE DATE";
                const inputDate = document.createElement('input');
                inputDate.type='date';
                inputDate.id='taskDueDate';
                inputDate.name='taskDueDate';
                inputDate.min='2020-01-01';
                inputDate.max='2030-12-31';
                inputDate.value=currentValue;
                editForm.appendChild(labelDate);
                editForm.appendChild(inputDate);
                element.appendChild(editForm);

                inputDate.onchange = (event) => {
                    event.preventDefault(); 
                    newValue = inputDate.value;
                    editTaskandProjectArrays(newValue, taskID, projectID, change, taskElement, currentValue);  
                };

                break;
            case 'priority':
                const selectPriority = document.createElement('select');
                selectPriority.id='taskPriority';
                selectPriority.name='taskPriority';
                const selectPriorityLOW = document.createElement('option');
                selectPriorityLOW.value='low';
                selectPriorityLOW.textContent='LOW';
                const selectPriorityMIN = document.createElement('option');
                selectPriorityMIN.value='min';
                selectPriorityMIN.textContent='MINOR';
                const selectPriorityMOD = document.createElement('option');
                selectPriorityMOD.value='mod';
                selectPriorityMOD.textContent='MODERATE';
                const selectPriorityIMP = document.createElement('option');
                selectPriorityIMP.value='imp';
                selectPriorityIMP.textContent='IMPORTANT';
                const selectPriorityVIM = document.createElement('option');
                selectPriorityVIM.value='vim';
                selectPriorityVIM.textContent='VERY IMPORTANT!';

                const labelPriority = document.createElement('p');
                labelPriority.textContent="PRIORITY";
                labelPriority.classList.add('infoLabel');

                selectPriority.appendChild(selectPriorityLOW);
                selectPriority.appendChild(selectPriorityMIN);
                selectPriority.appendChild(selectPriorityMOD);
                selectPriority.appendChild(selectPriorityIMP);
                selectPriority.appendChild(selectPriorityVIM);
                editForm.insertAdjacentHTML('afterbegin', extraInfo);
                editForm.appendChild(selectPriority);
                editForm.appendChild(labelPriority);
                element.appendChild(editForm);
                selectPriority.value=`${currentValue}`;
                const prioritySVGCOlor = document.querySelector('#infoTaskModal .infoPriority svg');
                prioritySVGCOlor.style=`fill: ${styleFuncs.priorityColor(currentValue)};`;

                selectPriority.onchange = (event) => {
                    event.preventDefault(); 
                    newValue = selectPriority.value;
                    editTaskandProjectArrays(newValue, taskID, projectID, change, taskElement, currentValue);
                };
                break;
            case 'description':
                const labelDescription = document.createElement('label');
                labelDescription.for='taskDescription';
                labelDescription.classList.add('infoLabel');
                labelDescription.textContent="DESCRIPTION";
                const textareaDescription = document.createElement('textarea');
                textareaDescription.id='taskDescription';
                textareaDescription.name='taskDescription';
                textareaDescription.maxLength='150';
                textareaDescription.value=currentValue;
                editForm.appendChild(labelDescription);
                editForm.appendChild(textareaDescription);
                element.appendChild(editForm);

                textareaDescription.onkeydown = (event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault(); 
                        newValue = textareaDescription.value.trim();
                        editTaskandProjectArrays(newValue, taskID, projectID, change, taskElement, currentValue);
                    }
                };
                break;
            case 'notes':
                const labelNote = document.createElement('label');
                labelNote.for='taskNote';
                labelNote.classList.add('infoLabel');
                labelNote.textContent="Notes";
                const textareaNote = document.createElement('textarea');
                textareaNote.id='taskNote';
                textareaNote.name='taskNote';
                textareaNote.maxLength='150';
                textareaNote.value=currentValue;
                editForm.appendChild(labelNote);
                editForm.appendChild(textareaNote);
                element.appendChild(editForm);

                textareaNote.onkeydown = (event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault(); 
                        newValue = textareaNote.value.trim();
                        editTaskandProjectArrays(newValue, taskID, projectID, change, taskElement, currentValue);
                    }
                };
                break;
        }

    };
    let editTaskandProjectArrays =  (newValue, taskID, projectID, change, taskElement, currentValue)=>{
        for(let task of tasks){
            if(task.id == taskID){
                task[change]=newValue;
                if(projectID && projectID==currentPage){
                    addDOM.selectedProjectDOM(projectID);
                }
            }
        }
        editingFlag=false;
        addDOM.mainTaskDOM();
        taskInfo(taskElement);
    };

    return {infoTaskModal, taskInfo}
})();
const infoProjectEvents = (function(){

    const infoProjectModal = document.querySelector('#infoProjectModal');

    let modalElements = function(){
        const infoProjectContent = document.querySelector('#infoProjectModal .infoContent');

        const projectInfoTitle = document.querySelector('#infoProjectModal .infoTitle');
        projectInfoTitle.innerHTML='';

        const projectInfoProgress = document.querySelector('#infoProjectModal .infoProgress');
        projectInfoProgress.innerHTML='';

        const projectInfoDate = document.querySelector('#infoProjectModal .infoDate');
        projectInfoDate.innerHTML='';

        const projectInfoPriority = document.querySelector('#infoProjectModal .infoPriority');
        projectInfoPriority.innerHTML='';

        const projectInfoDescription = document.querySelector('#infoProjectModal .infoDescription');
        projectInfoDescription.innerHTML='';

        const projectInfoNote = document.querySelector('#infoProjectModal .infoNote');
        projectInfoNote.innerHTML='';

        const deleteTaskDIV = document.querySelector('#infoProjectModal .deleteProjectDIV');

        return{infoProjectContent, projectInfoTitle, projectInfoProgress, projectInfoDate, projectInfoPriority, projectInfoDescription, projectInfoNote, deleteTaskDIV}    
    }

    let projectInfo = (selectedProjectInfo)=>{
        let modalElement = modalElements();
        let selectedProjectOBJ, priorityColor;
        for(let project of projects){
            if(project.id == selectedProjectInfo.getAttribute('id')){
                selectedProjectOBJ = project; 
                priorityColor = styleFuncs.priorityColor(project.priority);
                break;                
            }
        }

        let editIcon = `<div class="editIcon" title="Click to edit"></div>`;

        const projectInfoTitleH1 = document.createElement('h1');
        projectInfoTitleH1.textContent = selectedProjectOBJ.title;
        modalElement.projectInfoTitle.appendChild(projectInfoTitleH1);
        modalElement.projectInfoTitle.insertAdjacentHTML('beforeend', editIcon);

        const projectInfoProgressBar = document.createElement('progress');
        projectInfoProgressBar.classList.add('infoProgressBar');
        projectInfoProgressBar.max = '100';
        projectInfoProgressBar.value= variousFunctions.projectProgressNumber(selectedProjectOBJ.tasks);
        const projectInfoProgressPercentage = document.createElement('div');
        projectInfoProgressPercentage.classList.add('infoProgressPercentage', 'infoLabel');
        projectInfoProgressPercentage.textContent = `${variousFunctions.projectProgressNumber(selectedProjectOBJ.tasks)}%`;
        const projectInfoTotalTasks = document.createElement('div');
        projectInfoTotalTasks.classList.add('infoTotalTasks');
        const projectInfoTotalTasksLabel = document.createElement('div');
        projectInfoTotalTasksLabel.classList.add('infoLabel');
        projectInfoTotalTasksLabel.textContent="TOTAL TASKS:";
        const projectInfoTotalTasksData = document.createElement('div');
        projectInfoTotalTasksData.classList.add('infoData');
        projectInfoTotalTasksData.textContent = selectedProjectOBJ.tasks.total;
        projectInfoTotalTasks.appendChild(projectInfoTotalTasksLabel);
        projectInfoTotalTasks.appendChild(projectInfoTotalTasksData);
        const projectInfoDoneTasks = document.createElement('div');
        projectInfoDoneTasks.classList.add('infoDoneTasks');
        const projectInfoDoneTasksLabel = document.createElement('div');
        projectInfoDoneTasksLabel.classList.add('infoLabel');
        projectInfoDoneTasksLabel.textContent="TASKS DONE:";
        const projectInfoDoneTasksData = document.createElement('div');
        projectInfoDoneTasksData.classList.add('infoData');
        projectInfoDoneTasksData.textContent = selectedProjectOBJ.tasks.done.length;
        projectInfoDoneTasks.appendChild(projectInfoDoneTasksLabel);
        projectInfoDoneTasks.appendChild(projectInfoDoneTasksData);
        modalElement.projectInfoProgress.appendChild(projectInfoProgressBar);
        modalElement.projectInfoProgress.appendChild(projectInfoProgressPercentage);
        modalElement.projectInfoProgress.appendChild(projectInfoTotalTasks);
        modalElement.projectInfoProgress.appendChild(projectInfoDoneTasks);

        const projectInfoDateLabel = document.createElement('p');
        projectInfoDateLabel.textContent="DUE DATE";
        projectInfoDateLabel.classList.add('infoLabel');
        const projectInfoDateData = document.createElement('div');
        projectInfoDateData.classList.add('infoData');
        projectInfoDateData.textContent = styleFuncs.dateFormat(selectedProjectOBJ.date);
        projectInfoDateData.insertAdjacentHTML('beforeend', editIcon);
        modalElement.projectInfoDate.appendChild(projectInfoDateLabel);
        modalElement.projectInfoDate.appendChild(projectInfoDateData);
        
        let prioritySVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> 
                        <path d="M21.7605 15.92L15.3605 4.4C14.5005 2.85 13.3105 2 12.0005 2C10.6905 2 9.50047 2.85 8.64047 4.4L2.24047 15.92C1.43047 17.39 1.34047 18.8 1.99047 19.91C2.64047 21.02 3.92047 21.63 5.60047 21.63H18.4005C20.0805 21.63 21.3605 21.02 22.0105 19.91C22.6605 18.8 22.5705 17.38 21.7605 15.92ZM11.2505 9C11.2505 8.59 11.5905 8.25 12.0005 8.25C12.4105 8.25 12.7505 8.59 12.7505 9V14C12.7505 14.41 12.4105 14.75 12.0005 14.75C11.5905 14.75 11.2505 14.41 11.2505 14V9ZM12.7105 17.71C12.6605 17.75 12.6105 17.79 12.5605 17.83C12.5005 17.87 12.4405 17.9 12.3805 17.92C12.3205 17.95 12.2605 17.97 12.1905 17.98C12.1305 17.99 12.0605 18 12.0005 18C11.9405 18 11.8705 17.99 11.8005 17.98C11.7405 17.97 11.6805 17.95 11.6205 17.92C11.5605 17.9 11.5005 17.87 11.4405 17.83C11.3905 17.79 11.3405 17.75 11.2905 17.71C11.1105 17.52 11.0005 17.26 11.0005 17C11.0005 16.74 11.1105 16.48 11.2905 16.29C11.3405 16.25 11.3905 16.21 11.4405 16.17C11.5005 16.13 11.5605 16.1 11.6205 16.08C11.6805 16.05 11.7405 16.03 11.8005 16.02C11.9305 15.99 12.0705 15.99 12.1905 16.02C12.2605 16.03 12.3205 16.05 12.3805 16.08C12.4405 16.1 12.5005 16.13 12.5605 16.17C12.6105 16.21 12.6605 16.25 12.7105 16.29C12.8905 16.48 13.0005 16.74 13.0005 17C13.0005 17.26 12.8905 17.52 12.7105 17.71Z"></path> 
                    </g>
                </svg>`;
                       
        const projectInfoPriorityData = document.createElement('p');
        projectInfoPriorityData.classList.add('infoData');
        projectInfoPriorityData.textContent = styleFuncs.priorityText(selectedProjectOBJ.priority);
        projectInfoPriorityData.style = `text-shadow:
                                        0 0 2px ${priorityColor},
                                        0 0 5px ${priorityColor},
                                        0 0 10px ${priorityColor},
                                        0 0 15px ${priorityColor},
                                        0 0 20px ${priorityColor};`;
        const projectInfoPriorityLabel = document.createElement('p');
        projectInfoPriorityLabel.textContent="PRIORITY";
        projectInfoPriorityLabel.classList.add('infoLabel');
        modalElement.projectInfoPriority.insertAdjacentHTML('afterbegin', prioritySVG);
        modalElement.projectInfoPriority.appendChild(projectInfoPriorityData);
        modalElement.projectInfoPriority.insertAdjacentHTML('beforeend', editIcon);
        modalElement.projectInfoPriority.appendChild(projectInfoPriorityLabel);
        const prioritySVGColor = document.querySelector('#infoProjectModal .infoPriority svg');
        prioritySVGColor.style=`fill: ${priorityColor};`;
        
        const projectInfoDescriptionLabel = document.createElement('p');
        projectInfoDescriptionLabel.textContent="DESCRIPTION";
        projectInfoDescriptionLabel.classList.add('infoLabel');
        const projectInfoDescriptionData = document.createElement('div');
        projectInfoDescriptionData.classList.add('infoData');
        projectInfoDescriptionData.textContent = selectedProjectOBJ.description;
        modalElement.projectInfoDescription.appendChild(projectInfoDescriptionLabel);
        modalElement.projectInfoDescription.insertAdjacentHTML('beforeend', editIcon);
        modalElement.projectInfoDescription.appendChild(projectInfoDescriptionData);
        
        const projectInfoNoteLabel = document.createElement('p');
        projectInfoNoteLabel.textContent="NOTES";
        projectInfoNoteLabel.classList.add('infoLabel');
        const projectInfoNoteData = document.createElement('div');
        projectInfoNoteData.classList.add('infoData');
        projectInfoNoteData.textContent = selectedProjectOBJ.notes;
        modalElement.projectInfoNote.appendChild(projectInfoNoteLabel);
        modalElement.projectInfoNote.insertAdjacentHTML('beforeend', editIcon);
        modalElement.projectInfoNote.appendChild(projectInfoNoteData);
        
        modalElement.deleteTaskDIV.onclick = ()=>{
            let confirmAlert = confirm("ARE YOU SURE YOU WANT TO DELETE" + "\n" + `${(selectedProjectOBJ.title).toUpperCase()}` + `\n AND ITS \n ${selectedProjectOBJ.tasks.total} TASKS ?!?!?!`);
            if(confirmAlert){
                //Delete all project tasks from TASKS array and Main Page
                for(let projectTask of selectedProjectOBJ.tasks.all){
                    let projectTaskID = projectTask.id;
                    for(let i=tasks.length-1; i>=0; i--){
                        if(tasks[i].id == projectTaskID){
                            tasks.splice(i,1);
                            break;
                        }
                    }
                }

                //Delete from PROJECTS Array and Projects Page
                let projectList= [ ];
                for(let project of projects){
                    if(project.id!=selectedProjectOBJ.id){
                        projectList.push(project);
                    }
                }
                projects=projectList;


                pages.mainPage.classList.add('hide');
                pages.selectedProjectPage.classList.add('hide');
                pages.projectsPage.classList.remove('hide');
                currentPage='projects';

                addDOM.mainTaskDOM();
                addDOM.projectDOM();

                infoProjectModal.close();
            }
        };

        modalElement.infoProjectContent.onclick = (event)=>{
            event.stopPropagation();
            if(event.target.closest('.infoTitle') && editingFlag==false){
                editTaskInfo('title', modalElement.projectInfoTitle, selectedProjectOBJ.title, selectedProjectOBJ.id, selectedProjectInfo);
            }
            else if(event.target.closest('.infoDate') && editingFlag==false){
                editTaskInfo('date', modalElement.projectInfoDate, selectedProjectOBJ.date, selectedProjectOBJ.id, selectedProjectInfo);
            }
            else if(event.target.closest('.infoPriority') && editingFlag==false){
                editTaskInfo('priority', modalElement.projectInfoPriority, selectedProjectOBJ.priority, selectedProjectOBJ.id, selectedProjectInfo, prioritySVG);
            }
            else if(event.target.closest('.infoDescription') && editingFlag==false){
                editTaskInfo('description', modalElement.projectInfoDescription, selectedProjectOBJ.description, selectedProjectOBJ.id, selectedProjectInfo);
            }
            else if(event.target.closest('.infoNote') && editingFlag==false){
                editTaskInfo('notes', modalElement.projectInfoNote, selectedProjectOBJ.notes, selectedProjectOBJ.id, selectedProjectInfo);
            }
        }
        
    };

    let editTaskInfo = (change, element, currentValue, projectID, projectElement, SVG)=>{
        let newValue;
        editingFlag = true;
        element.innerHTML="";
        element.classList.add('editInfo');
        const editForm = document.createElement('form');
        switch(change){
            case 'title':
                const labelTitle = document.createElement('label');
                labelTitle.for='projectTitle';
                labelTitle.classList.add('infoLabel');
                labelTitle.textContent="TITLE";
                const inputTitle = document.createElement('input');
                inputTitle.type='text';
                inputTitle.id='projectTitle';
                inputTitle.name='projectTitle';
                inputTitle.value=currentValue;
                editForm.appendChild(labelTitle);
                editForm.appendChild(inputTitle);
                element.appendChild(editForm);

                inputTitle.onkeydown = (event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault(); 
                        newValue = inputTitle.value.trim();
                        editProjectArrays(newValue, projectID, change, projectElement);
                    }
                };
                break;
            case 'date':
                const labelDate = document.createElement('label');
                labelDate.for='projectDueDate';
                labelDate.classList.add('infoLabel');
                labelDate.textContent="DUE DATE";
                const inputDate = document.createElement('input');
                inputDate.type='date';
                inputDate.id='projectDueDate';
                inputDate.name='projectDueDate';
                inputDate.min='2020-01-01';
                inputDate.max='2030-12-31';
                inputDate.value=currentValue;
                editForm.appendChild(labelDate);
                editForm.appendChild(inputDate);
                element.appendChild(editForm);

                inputDate.onchange = (event) => {
                    event.preventDefault(); 
                    newValue = inputDate.value;
                    editProjectArrays(newValue, projectID, change, projectElement);  
                };

                break;
            case 'priority':
                const selectPriority = document.createElement('select');
                selectPriority.id='projectPriotity';
                selectPriority.name='projectPriotity';
                const selectPriorityLOW = document.createElement('option');
                selectPriorityLOW.value='low';
                selectPriorityLOW.textContent='LOW';
                const selectPriorityMIN = document.createElement('option');
                selectPriorityMIN.value='min';
                selectPriorityMIN.textContent='MINOR';
                const selectPriorityMOD = document.createElement('option');
                selectPriorityMOD.value='mod';
                selectPriorityMOD.textContent='MODERATE';
                const selectPriorityIMP = document.createElement('option');
                selectPriorityIMP.value='imp';
                selectPriorityIMP.textContent='IMPORTANT';
                const selectPriorityVIM = document.createElement('option');
                selectPriorityVIM.value='vim';
                selectPriorityVIM.textContent='VERY IMPORTANT!';

                const labelPriority = document.createElement('p');
                labelPriority.textContent="PRIORITY";
                labelPriority.classList.add('infoLabel');

                selectPriority.appendChild(selectPriorityLOW);
                selectPriority.appendChild(selectPriorityMIN);
                selectPriority.appendChild(selectPriorityMOD);
                selectPriority.appendChild(selectPriorityIMP);
                selectPriority.appendChild(selectPriorityVIM);
                editForm.insertAdjacentHTML('afterbegin', SVG);
                editForm.appendChild(selectPriority);
                editForm.appendChild(labelPriority);
                element.appendChild(editForm);
                selectPriority.value=`${currentValue}`;
                const prioritySVGCOlor = document.querySelector('#infoProjectModal .infoPriority svg');
                prioritySVGCOlor.style=`fill: ${styleFuncs.priorityColor(currentValue)};`;

                selectPriority.onchange = (event) => {
                    event.preventDefault(); 
                    newValue = selectPriority.value;
                    editProjectArrays(newValue, projectID, change, projectElement);
                };
                break;
            case 'description':
                const labelDescription = document.createElement('label');
                labelDescription.for='projectDescription';
                labelDescription.classList.add('infoLabel');
                labelDescription.textContent="DESCRIPTION";
                const textareaDescription = document.createElement('textarea');
                textareaDescription.id='projectDescription';
                textareaDescription.name='projectDescription';
                textareaDescription.maxLength='150';
                textareaDescription.value=currentValue;
                editForm.appendChild(labelDescription);
                editForm.appendChild(textareaDescription);
                element.appendChild(editForm);

                textareaDescription.onkeydown = (event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault(); 
                        newValue = textareaDescription.value.trim();
                        editProjectArrays(newValue, projectID, change, projectElement);
                    }
                };
                break;
            case 'notes':
                const labelNote = document.createElement('label');
                labelNote.for='projectNote';
                labelNote.classList.add('infoLabel');
                labelNote.textContent="Notes";
                const textareaNote = document.createElement('textarea');
                textareaNote.id='projectNote';
                textareaNote.name='projectNote';
                textareaNote.maxLength='150';
                textareaNote.value=currentValue;
                editForm.appendChild(labelNote);
                editForm.appendChild(textareaNote);
                element.appendChild(editForm);

                textareaNote.onkeydown = (event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault(); 
                        newValue = textareaNote.value.trim();
                        editProjectArrays(newValue, projectID, change, projectElement);
                    }
                };
                break;
        }

    };

    let editProjectArrays =  (newValue, projectID, change, projectElement)=>{
        for(let project of projects){
            if(project.id == projectID){
                project[change]=newValue; 
            }
        }
        editingFlag=false;
        addDOM.selectedProjectDOM(projectID);
        addDOM.projectDOM();
        addDOM.mainTaskDOM();
        projectInfo(projectElement);
    };

    return {infoProjectModal, projectInfo}
})();
let projects = [ ];
let tasks = [ ];
let currentPage = 'home';
let editingFlag = false;
let addDOM = addtoDOM();
let styleFuncs = styleFunctions();

class NewTask{
    constructor(title, project, description, date, priority){
        this.id = crypto.randomUUID();
        this.title = title;
        this.project = project;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.status = "todo";
        this.notes = "Add Notes!";
        this.addedToProject = false;
    }
    add(task){
        tasks.push(task);
        addDOM.mainTaskDOM();
        addDOM.projectDOM();
    }
}
class NewProject{
    constructor(title, description, date, priority){
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.date = date;
        this.tasks = {
            all: [ ],
            done: [ ],
            get total() {return this.all.length}
        };
        this.notes = "Add Notes!";
        this.priority = priority;
    }
    add(project){
        projects.push(project);
        addDOM.projectDOM();
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

            addDOM.mainTaskDOM();
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
                variousFunctions.updateProjectArraySideBar(selectedProject.id);
                selectedProjectPage(selectedProject.id);
                addDOM.selectedProjectDOM(selectedProject.id);
            }
    });

    return {sdProjectList}
})();
const mainPageEvents = (function(){
    
    const newTask = document.querySelector('.newTask');
    const allTasks = document.querySelector('main');

    newTask.addEventListener('click', ()=>{
        addTaskEvents.addTaskModal.showModal();
        variousFunctions.taskSelectProject('mainTask');
    });
    allTasks.addEventListener('click', (event)=>{
        if(event.target.closest("article")){
            infoTaskEvents.infoTaskModal.showModal();
            infoTaskEvents.taskInfo(event.target.closest("article"));
        }
        infoTaskEvents.infoTaskModal.addEventListener('click', (event)=>{
            if(event.target.closest(".infoContent")){}
            else {
                editingFlag=false;
                infoTaskEvents.infoTaskModal.close();
            }
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
                addDOM.selectedProjectDOM(selectedProject.id);
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
        variousFunctions.taskSelectProject('projectTask');
        addTaskEvents.addTaskModal.showModal();
    });
    projectMain.addEventListener('click', (event)=>{
        if(event.target.closest("article")){
            infoTaskEvents.infoTaskModal.showModal();
            infoTaskEvents.taskInfo(event.target.closest("article"));
        }
        infoTaskEvents.infoTaskModal.addEventListener('click', (event)=>{
            if(event.target.closest(".infoContent")){}
            else {
                editingFlag=false;
                infoTaskEvents.infoTaskModal.close();
            }
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
}

function addtoDOM(){
    let mainTaskDOM = ()=>{
        let columns= {
            todo: document.querySelector('#mainPage .todo.list'),
            doing: document.querySelector('#mainPage .doing.list'),
            done: document.querySelector('#mainPage .done.list')
        };
        for(let column in columns){
            columns[column].innerHTML="";
        }
        if(projects){
            for(let project of projects){
                project.tasks.all=[ ];
                project.tasks.done=[ ];
            }
        }
        if(tasks){
            for(let task of tasks){
                // main Page
                const card = variousFunctions.card(task);

                let list = styleFuncs.columnMain(task.status);
                list.appendChild(card);

                //Add task to Project OBJ
                if(task.project){
                    variousFunctions.addTaskToProjectOBJ(task);
                }
            }
        }
    }

    let projectDOM = ()=>{
        document.querySelector('.allProjects').innerHTML="";
        for(let project of projects){
            // projects page
            const projectCard = document.createElement("article");
            projectCard.classList.add("projectCard");
            projectCard.id = project.id;

            const projectPriority = document.createElement("div");
            projectPriority.classList.add("projectPriority");
            projectPriority.style = `background-color: ${styleFuncs.priorityColor(project.priority)};`;
            
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
        }
        projectSidebarDOM();
    }
    let projectSidebarDOM = ()=>{
        document.querySelector('.sdProjectList').innerHTML="";
        let sidebarProjectCounter = 0;
        for(let i=projects.length-1; i>=0; i--){
            if(sidebarProjectCounter<5){
                    const projectListItem = document.createElement('li');
                    projectListItem.id = projects[i].id;
                    projectListItem.classList.add('projectListItem');
                    projectListItem.textContent = projects[i].title;

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
                break;
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

    return {mainTaskDOM, projectDOM, projectSidebarDOM, selectedProjectDOM}
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
        const rawDate = new Date(year, month - 1, day);

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
        cardPriority.style = `background-color: ${styleFuncs.priorityColor(task.priority)};`;
        taskCard.appendChild(cardPriority);

        const cardTitle = document.createElement("p");
        cardTitle.classList.add("cardTitle");
        cardTitle.textContent = task.title;
        taskCard.appendChild(cardTitle);

        return taskCard
    }

    let taskSelectProject = (page, editing)=>{
        let taskProject;
        if(editing==true){
            taskProject = document.querySelector('.editInfo #taskProject');
        }
        else{
            taskProject = document.querySelector('#taskProject');
        }

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
        for(let project of projects){
            if(task.project==project.id){
                project.tasks.all.push(task);
                if(task.status == "done"){
                    project.tasks.done.push(task);
                } 
                break;
            }
        }
    }

    let projectProgressNumber = (task)=>{
        return (task.total == 0)? 0 : parseInt(task.done.length * 100 / task.total);
    }

    let updateProjectArraySideBar = (pID)=>{
        for(let i=0; i<projects.length; i++){
            if(projects[i].id == pID){
                let clickedP = projects[i];
                projects.splice(i, 1);
                projects.push(clickedP);
                addDOM.projectSidebarDOM();
            }
        }
    }

    return{taskSelectProject, addTaskToProjectOBJ, card, projectProgressNumber, updateProjectArraySideBar}
})();
addDOM.mainTaskDOM();


