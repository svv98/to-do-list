import "./style.css";

// let dragged;

// /* events fired on the draggable target */
// const source = document.querySelector(".card1");
// source.addEventListener("drag", (event) => {
//   console.log("dragging");
// });

// source.addEventListener("dragstart", (event) => {
//   // store a ref. on the dragged elem
//   dragged = event.target;
//   // make it half transparent
//   event.target.classList.add("dragging");
// });

// source.addEventListener("dragend", (event) => {
//   // reset the transparency
//   event.target.classList.remove("dragging");
// });

// /* events fired on the drop targets */
// const target = document.querySelector(".doing");
// target.addEventListener(
//   "dragover",
//   (event) => {
//     // prevent default to allow drop
//     event.preventDefault();
//   },
//   false,
// );

// target.addEventListener("dragenter", (event) => {
//   // highlight potential drop target when the draggable element enters it
//   if (event.target.classList.contains("dropzone")) {
//     event.target.classList.add("dragover");
//   }
// });

// target.addEventListener("dragleave", (event) => {
//   // reset background of potential drop target when the draggable element leaves it
//   if (event.target.classList.contains("dropzone")) {
//     event.target.classList.remove("dragover");
//   }
// });

// target.addEventListener("drop", (event) => {
//   // prevent default action (open as link for some elements)
//   event.preventDefault();
//   // move dragged element to the selected drop target
//   if (event.target.classList.contains("dropzone")) {
//     event.target.classList.remove("dragover");
//     event.target.appendChild(dragged);
//   }
// });

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


/* const mainPageVariables = (function(){
    
    const newTask = document.querySelector('.newTask');
    const allTasks = document.querySelector('main');

    return {newTask, allTasks}
})();

mainPageVariables.newTask.addEventListener('click', ()=>{
    addTaskVariables.addTaskModal.showModal();
});
addTaskVariables.addTaskCANCEL.addEventListener('click', ()=>{
    addTaskVariables.addTaskModal.close();
});

mainPageVariables.allTasks.addEventListener('click', (event)=>{
    if(event.target.closest("article")){
        infoTaskVariables.infoTaskModal.showModal();
    }
    infoTaskVariables.infoTaskModal.addEventListener('click', (event)=>{
        if(event.target.closest(".infoContent")){}
        else infoTaskVariables.infoTaskModal.close();
    });
}); */

/* const projectsPageVariables = (function(){
    
    const newProject = document.querySelector('.newProject');
    const allProjects = document.querySelector('.allProjects');

    return {newProject, allProjects}
})();

projectsPageVariables.newProject.addEventListener('click', ()=>{
    addProjectVariables.addProjectModal.showModal();
});
addProjectVariables.addProjectCANCEL.addEventListener('click', ()=>{
    addProjectVariables.addProjectModal.close();
});

projectsPageVariables.allProjects.addEventListener('click', (event)=>{
        if(event.target.closest(".projectCard")){
            console.log('hola');
        }
}); */

const selectedProjectPageVariables = (function(){
    
    const newProjectTask = document.querySelector('.newProjectTask');
    const projectMain = document.querySelector('#selectedProjectPage>main');
    const projectTitle = document.querySelector('.headerTitle');

    return {newProjectTask, projectMain, projectTitle}
})();

selectedProjectPageVariables.newProjectTask.addEventListener('click', ()=>{
    addTaskVariables.addTaskModal.showModal();
});
addTaskVariables.addTaskCANCEL.addEventListener('click', ()=>{
    addTaskVariables.addTaskModal.close();
});

selectedProjectPageVariables.projectMain.addEventListener('click', (event)=>{
    if(event.target.closest("article")){
        infoTaskVariables.infoTaskModal.showModal();
    }
    infoTaskVariables.infoTaskModal.addEventListener('click', (event)=>{
        if(event.target.closest(".infoContent")){}
        else infoTaskVariables.infoTaskModal.close();
    });
});

selectedProjectPageVariables.projectTitle.addEventListener('click', (event)=>{
    infoProjectVariables.infoProjectModal.showModal();
    infoProjectVariables.infoProjectModal.addEventListener('click', (event)=>{
        if(event.target.closest(".infoContent")){}
        else infoProjectVariables.infoProjectModal.close();
    });
});