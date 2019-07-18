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
];
const objOfTasks = tasks.reduce((acc, task) => {
  acc[task._id] = task;
  return acc;
}, {});


// UI Elements
const formHold = document.querySelector('.form-section');
const tasksRow = document.querySelector('.tasks-row');
const tasksList = document.querySelector('.tasks-list-section .list-group');
const form = document.forms['addTask'];
const inputTitle = form.elements['title'];
const inputBody = form.elements['body'];

const msgRow = document.createElement('div');

// Functions
const showMsg = () => {
  if(!tasks.length) {
    msgRow.classList.add(
      'row',
      'msg-row',
      'mt-4',
    );
    
    const msgCol = document.createElement('div');
    msgCol.classList.add(
      'col',
      'col-10',
      'col-lg-6',
      'mx-auto',
    );
    
    const msgHolder = document.createElement('div');
    msgHolder.classList.add('card');
    
    const msgFrame = document.createElement('div');
    msgFrame.classList.add('card-body');
    msgFrame.textContent = 'You have no tasks for now.';
    
    msgRow.appendChild(msgCol);
    msgCol.appendChild(msgHolder);
    msgHolder.appendChild(msgFrame);
    tasksRow.insertAdjacentElement('afterend', msgRow);
  }
}

const removeMsg = () => msgRow.remove();

const renderTasks = () => {
  const fragment = document.createDocumentFragment();
  Object.values(objOfTasks).forEach(task => {
    const li = listItemTemplate(task);
    fragment.appendChild(li);
  });
  tasksList.appendChild(fragment);
}

const listItemTemplate = (task) => {
  const li = document.createElement('li');
  li.classList.add(
    'list-group-item',
    'd-flex',
    'align-items-center',
    'flex-wrap',
  );
  li.setAttribute('data-task-id', task._id);

  const heading = document.createElement('strong');
  heading.textContent = task.title;
  
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');

  const taskDescription = document.createElement('p');
  taskDescription.textContent = task.body;
  taskDescription.classList.add('mt-2', 'w-100');

  li.appendChild(heading);
  li.appendChild(taskDescription);
  li.appendChild(deleteBtn);

  return li;
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
  
  if (target.classList.contains('delete-btn')) {
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


(function(arrOfTasks) {
  showMsg();
  renderTasks();
  form.addEventListener('submit', onFormSubmitHandler);
  tasksList.addEventListener('click', onDeleteHandler);
})(tasks);