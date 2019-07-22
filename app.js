// 1.
// Если массив с задачами пустой то под формой нужно выводить сообщение об этом, 
// также это же сообщение нужно выводить если вы удалите все задачи.

// 2.
// В каждый элемент li добавить кнопку которая будет делать задачу выполненой. 
// завершенные задачи должны быть подсвечены любым цветом.

// 3.
// Добавить функционал отображения незавершенных задач и всех задач. 
// т.е у вас будет две кнопки над таблицей 1-я "показать все задачи" и 2-я "показать незавершенные задачи", 
// определить завершена задача или нет можно по полю completed в объекте задачи.  
// По умолчанию при загрузке отображаются все задачи. 

// *Задача со звездочкой. 
// При завершении задачи в разделе "незавершенные задачи" она должна от туда пропадать 
// и быть видна в разделе "все задачи" при этом во всех задачах завершенные задачи могут быть востановленны. 
// Также в разделе "все задачи" завершенные задачи должны быть в самом низу после открытых задач.


const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c4e88e0',
    completed: true,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2dc8a93095c4e78c5',
    completed: false,
    body:
      'Lorem Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Set Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2dc8a87095c4e74c5',
    completed: false,
    body:
      'Lorem Aliquip cupidatat ex adipisicing veniam do tempor.\r\n',
    title:
      'Set Deserunt laborum id.',
  },
];

const objOfTasks = tasks.reduce((acc, task) => {
  acc[task._id] = task;
  return acc;
}, {});

const objOfActiveTasks = Object.values(objOfTasks).filter(task => {
  if(task.completed === false) {
    return task;
  }
});

// UI General Elements
const formHold = document.querySelector('.form-section');
const tasksRow = document.querySelector('.tasks-row');
const tasksList = document.querySelector('.tasks-list-section .list-group');
const form = document.forms['addTask'];
const inputTitle = form.elements['title'];
const inputBody = form.elements['body'];

// msg elements
const msgRow = document.createElement('div');
const msgFrame = document.createElement('div');
const msgCol = document.createElement('div');
const msgHolder = document.createElement('div');

// filter elements
const filterBtnsHolder = document.createElement('div');

// Functions
const showMsg = () => {
  msgRow.classList.add(
    'row',
    'msg-row',
    'mt-4',
  );
  
  msgCol.classList.add(
    'col',
    'col-10',
    'col-lg-6',
    'mx-auto',
  );
  
  msgHolder.classList.add('card');

  msgFrame.classList.add('card-body');
  msgFrame.textContent = 'You have no tasks for now.';
  
  msgRow.appendChild(msgCol);
  msgCol.appendChild(msgHolder);
  msgHolder.appendChild(msgFrame);
  tasksRow.insertAdjacentElement('afterend', msgRow);
}

const removeMsg = () => {
  msgCol.remove();
  msgHolder.remove();
  msgRow.remove();
};


const renderTasks = (obj) => {
  const fragment = document.createDocumentFragment();
  Object.values(obj).forEach(task => {
    const li = listItemTemplate(task);
    fragment.appendChild(li);
  });
  tasksList.appendChild(fragment);
  if(!document.body.contains(filterBtnsHolder)) {
    createFilterBtns();
  }
}

const listItemTemplate = (task) => {
  const li = document.createElement('li');
  li.classList.add(
    'list-group-item',
    'd-flex',
    'align-items-center',
  );
  li.setAttribute('data-task-id', task._id);
  
  const descrWrap = document.createElement('div');
  descrWrap.classList.add(
    'description-wrap',
    'd-flex',
    'flex-grow-1',
    'flex-column',
    'flex-wrap',
  );
  
  const btnsWrap = document.createElement('div');
  btnsWrap.classList.add(
    'btns-wrap',
    'd-flex',
    'flex-wrap',
    'flex-grow-0',
    'flex-shrink-0',
    'pl-3',
  );

  const heading = document.createElement('h3');
  heading.classList.add('h5');
  heading.textContent = task.title;

  const taskDescription = document.createElement('p');
  taskDescription.textContent = task.body;
  taskDescription.classList.add('mt-2');
  
  const doneBtn = document.createElement('button');
  doneBtn.textContent = 'Done';
  doneBtn.classList.add(
    'btn',
    'btn-success',
    'btn-done',
    'mb-3',
    'd-block',
    'w-100',
  );
  
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add(
    'btn',
    'btn-danger',
    'btn-delete',
    'd-block',
    'w-100',
  );

  li.appendChild(descrWrap);
  descrWrap.appendChild(heading);
  descrWrap.appendChild(taskDescription);
  
  li.appendChild(btnsWrap);
  btnsWrap.appendChild(doneBtn);
  btnsWrap.appendChild(deleteBtn);

  return li;
}

const createFilterBtns = () => {
  filterBtnsHolder.classList.add(
    'filter-holder',
    'd-flex',
    'mb-3',
    'card',
  );
  
  const filterBody = document.createElement('div');
  filterBody.classList.add(
    'card-body',
  );
  
  const showActiveTasks = document.createElement('button');
  showActiveTasks.classList.add(
    'btn',
    'btn-primary',
    'btn-active-tasks',
    'mr-3',
  );
  showActiveTasks.textContent = 'Show active tasks';
  
  const showAllTasks = document.createElement('button');
  showAllTasks.classList.add(
    'btn',
    'btn-primary',
    'btn-all-tasks',
    'mr-3',
  );
  showAllTasks.textContent = 'Show all tasks';
  
  filterBtnsHolder.appendChild(filterBody);
  filterBody.appendChild(showAllTasks);
  filterBody.appendChild(showActiveTasks);
  tasksList.insertAdjacentElement('beforebegin', filterBtnsHolder);
}

const onFormSubmitHandler = (e) => {
  e.preventDefault();
  const titleValue = inputTitle.value;
  const bodyValue = inputBody.value;

  if (!titleValue || !bodyValue) {
    alert('Please fill title and body fields');
    return;
  }

  const task = createNewTask(titleValue, bodyValue);
  const listItem = listItemTemplate(task);
  tasksList.insertAdjacentElement('afterbegin', listItem);
  form.reset();
  
  if(formHold.contains(msgRow)) {
    msgRow.remove();
  }
}

const createNewTask = (title, body) => {
  const newTask = {
    title,
    body,
    completed: false,
    _id: `task-${Math.random()}`,
  };

  objOfTasks[newTask._id] = newTask;

  return { ...newTask };
}

const onDeleteHandler = (e) => {
  const { target } = e;
  
  if (target.classList.contains('btn-delete')) {
    const parentList = target.closest('.list-group');
    const parent = target.closest('[data-task-id]');
    const id = parent.dataset.taskId;
    parent.remove();
    delete objOfTasks[id];
    if (!parentList.firstChild) {
      showMsg();
    }
    
  }
}

const onDoneHandler = (e) => {
  const { target } = e;
  
  if (target.classList.contains('btn-done')) {
    const parent = target.closest('[data-task-id]');
    const id = parent.dataset.taskId;
    let completed = objOfTasks[id];
    completed = true;
    parent.classList.add('bg-info');
  }
}

const onShowActive = (e) => {
  const { target } = e;
  
  if (target.classList.contains('btn-active-tasks')) {
    removeListContent();
    renderTasks(objOfActiveTasks);
    removeMsg();
  }
}

const onShowAll = (e) => {
  const { target } = e;
  
  if (target.classList.contains('btn-all-tasks')) {
    removeListContent();
    renderTasks(objOfTasks);
    removeMsg();
  }
}

const removeListContent = () => {
  while (tasksList.firstChild) {
      tasksList.firstChild.remove();
  }
}

(function(arrOfTasks) {
  if(!tasks.length) {
    showMsg();
  }
  renderTasks(objOfTasks);
  form.addEventListener('submit', onFormSubmitHandler);
  tasksList.addEventListener('click', onDoneHandler);
  tasksList.addEventListener('click', onDeleteHandler);
  filterBtnsHolder.addEventListener('click', onShowActive);
  filterBtnsHolder.addEventListener('click', onShowAll);
})(tasks);
