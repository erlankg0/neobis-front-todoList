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
}


// загрузка класс через event List
// DOMContentLoaded === useEffect

document.addEventListener("DOMContentLoaded", () => {
    const todo = new ToDo(); // создание экземпряла

    console.log(todo.tasks);
})