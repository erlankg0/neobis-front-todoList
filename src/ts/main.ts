// enum для создание катерогий
enum Category {
    Person,
    Business,
}

// interface данных
interface Task {
    category: Category,
    value: string,
    isFinish: boolean,
    id: number
}


class ToDo {
    private _tasks: Task[] = []; // list tasks
    // конструктор класса для загрузки localStorage
    constructor() {
        // Загрузка данных из localStorage при создании экземпляра ToDo
        this.loadTask();
    }

    // приватная фунция для загрузки localStorage
    private loadTask = (): void => {
        // Загрузка данных их storage
        const taskData = localStorage.getItem('tasks');
        if (taskData) {
            this._tasks = JSON.parse(taskData);
        }
    }

    // приватная фунция для сохранения данных в localStorage
    private saveTasks = (): void => {
        // Сохранения в localStorage
        localStorage.setItem('tasks', JSON.stringify(this._tasks));
        this.loadTask();
    }

    // функция для получения всех задач @GET
    get tasks(): Task[] {
        return this._tasks
    }

    // функция для создание новой задачи
    createTasks = (task: Task) => {
        this._tasks.push(task);
        this.saveTasks(); // сохранем задачу
    }
    // фунция для получения все задач по категория
    getByCategoryTask = (category: Category): Task[] => {
        return this._tasks.filter((task) => task.category == category); // фильтрация задач по категория
    }
    // фунция для получения всех сделалны или несделаных задач
    isFinish = (id: number, done: boolean): void => {
        this._tasks = this._tasks = this.tasks.map((task) => {
            if (task.id == id) {
                task.isFinish = done;
            }
            return task
        })
        this.saveTasks();
    }
    // фунция для удаления задачи
    deleteTask = (id: number) => {
        this._tasks = this._tasks.filter((task): boolean => task.id !== id)
        this.saveTasks(); // сохраняем tasks после удаления
    }
    // фунция для изменения измени задачи
    editTask = (id: number, title: string): void => {
        this._tasks = this.tasks.map((task) => {
            if (task.id == id) {
                task.value = title;
            }
            return task
        })
        this.saveTasks(); // сохраняем tasks после изменения
    }
    clear = () => {
        this._tasks = []; // чистка localstorage
        this.saveTasks();
    }
}

// загрузка класс через event List
// DOMContentLoaded === useEffect

const todo = new ToDo(); // создание экмепляра
localStorage.setItem('tasks', JSON.stringify(todo.tasks));


// фунция для загрузки задач
const loadingTasks = () => {
    const ul = document.getElementById('list');
    ul.innerHTML = '';
    todo.tasks.forEach((task) => {
        const li = document.createElement('li');
        li.classList.add('list__item'); // Добавления класса

        // Создание div container card
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.setAttribute('id', `${task.id}`)

        // Создание левой части card
        const leftSide = document.createElement('div');
        leftSide.classList.add('card__left')

        // Добавление радио кнопки
        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.classList.add('card__radio');
        radioInput.checked = task.isFinish;

        // Добавление текстового поля
        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.classList.add('card__input');
        textInput.value = task.value;
        textInput.setAttribute('readonly', 'readonly')
        if(task.isFinish){
            textInput.classList.add('finished');
        }
        // Добавление радио кнопки и текстового поля в левую часть карточки
        leftSide.appendChild(radioInput);
        leftSide.appendChild(textInput);


        // Создание правой части card
        const rightSide = document.createElement('div');
        rightSide.classList.add('card__right')

        // Добавление кнопок в правую часть карточки
        const editButton = document.createElement('button');
        editButton.classList.add('card__btn', 'purple');
        editButton.textContent = 'Edit';

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('card__btn', 'red');
        deleteButton.textContent = 'Delete';

        rightSide.appendChild(editButton);
        rightSide.appendChild(deleteButton);

        // Добавление левой и правой части карточки в общий контейнер карточки
        cardDiv.appendChild(leftSide);
        cardDiv.appendChild(rightSide);

        li.appendChild(cardDiv);
        ul.appendChild(li);
        console.log('task')
    })
    deleteTask(); // фунция которая добавляет event для каждого btn *red*
    editTask();  // фунция которая добавляет event для каждого btn *purple*
    isFinish(); // фунция которая добавляет event для каждого radio
}
// фунция для удаления зачад
const deleteTask = (): void => {
    const tasksItems = document.querySelectorAll('.card');
    tasksItems.forEach((task): void => {
        const IdCard = task.getAttribute('id');
        const eventTask = task.querySelector('.card__right').querySelector('.red');
        eventTask.addEventListener('click', () => {
            todo.deleteTask(+IdCard);
            loadingTasks(); // перегружаем список
        })
    })
}

// фукция для редактирования имени задачи
const editTask = (): void => {
    const tasksItems = document.querySelectorAll('.card');
    tasksItems.forEach((task): void => {
        const IdCard: string = task.getAttribute('id');
        const eventTask = task.querySelector('.card__right').querySelector('.purple');
        eventTask.addEventListener('click', () => {
            const input = task.querySelector('.card__left').querySelector('.card__input') as HTMLInputElement;
            input.removeAttribute('readonly');
            input.addEventListener('focus', () => {
                input.classList.toggle('focus');
            });
            input.addEventListener('blur', (event) => {
                input.setAttribute('readonly', 'readonly');
                todo.editTask(+IdCard, input.value);
                loadingTasks();
            })
        })


    })
}

// фунция для изменения задачи на выполенено
const isFinish = () => {
    const tasksItems = document.querySelectorAll('.card');
    tasksItems.forEach((task) => {
        const IdCard: string = task.getAttribute('id');
        const radioEvent = task.querySelector('.card__left').querySelector('.card__radio') as HTMLInputElement;
        radioEvent.addEventListener('change', () => {
            const input = task.querySelector('.card__left').querySelector('.card__input');
            if (radioEvent.checked) {
                input.classList.add('finished')
                todo.isFinish(+IdCard, radioEvent.checked);
            }
            input.classList.remove('finished');
            todo.isFinish(+IdCard, radioEvent.checked);
            loadingTasks();
        })

    })
}
// загружаем все зачачи когда будет useEffect
document.addEventListener("DOMContentLoaded", () => {
    console.log(todo.tasks);
    loadingTasks(); //загрузка все задач
})


// btn проверяем btn
const btn = document.getElementById('btn')
// простой валидатор формы
const validationForm = (input: string, checked: boolean): boolean => {
    return input.length > 1 && checked;
}
// по click btn добавляем зачаду
btn.addEventListener('click', (event) => {
    event.preventDefault();

    const input = document.getElementById('toDo__input') as HTMLInputElement; // type input
    const radios = document.getElementsByName('category') as NodeListOf<HTMLInputElement>
    let checked;

    radios.forEach((radio) => {
        if (radio.checked) {
            checked = radio.id;
        }
    })
    console.log(validationForm(input.value, checked));
    if (validationForm(input.value, checked)) {

        todo.createTasks({
            value: input.value,
            category: checked,
            id: todo.tasks.length + 1,
            isFinish: false
        })

        input.value = '';
        radios.forEach((radio) => radio.checked = false);
    }
    loadingTasks(); //загрузка все задач
})

