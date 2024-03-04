// enum для создание катерогий
enum Category {
    Person,
    Business,
}

interface Task {
    category: Category,
    title: string,
    value: string,
    isFinish: boolean,
    createdAt: Date,
    updatedAt: Date,
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
    isFinish = (done: boolean): Task[] => {
        return this._tasks.filter((task) => task.isFinish == done) // фильтрация по категория сделанных задач
    }
    // фунция для удаления задачи
    deleteTask = (id: number) => {
        this._tasks.filter((task) => task.id === id)
        this.saveTasks(); // сохраняем tasks после удаления
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
        li.classList.add('toDo__item'); // Добавления класса

        // Создание div container card
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

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
}
document.addEventListener("DOMContentLoaded", () => {
    console.log(todo.tasks);
    loadingTasks(); //загрузка все задач
})


// btn проверяем btn
const onSubmitBtn = (event) => {
    event.preventDefault(); // блокировка обновления сайта

    const input = document.getElementById('toDo__input');
    console.log(input);
    loadingTasks(); // загрузка все задач

}

const btn = document.getElementById('btn')

btn.addEventListener('click', (event) => {
    event.preventDefault();

    const input = document.getElementById('toDo__input') as HTMLInputElement; // type input
    const radios = document.getElementsByName('category') as NodeListOf<HTMLInputElement>

    console.log(input.value);
    radios.forEach((radio) => {
        if (radio.checked) {
            console.log(radio.id)
        }
    })

    todo.createTasks({
        title: input.value,
        value: input.value,
        category: Category.Business,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: todo.tasks.length + 1,
        isFinish: false
    })
    console.log(todo.tasks)
    loadingTasks(); //загрузка все задач
})

todo.clear();