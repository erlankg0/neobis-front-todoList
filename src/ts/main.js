// enum для создание катерогий
var Category;
(function (Category) {
    Category[Category["Person"] = 0] = "Person";
    Category[Category["Business"] = 1] = "Business";
})(Category || (Category = {}));
var ToDo = /** @class */ (function () {
    // конструктор класса для загрузки localStorage
    function ToDo() {
        var _this = this;
        this._tasks = []; // list tasks
        // приватная фунция для загрузки localStorage
        this.loadTask = function () {
            // Загрузка данных их storage
            var taskData = localStorage.getItem('tasks');
            if (taskData) {
                _this._tasks = JSON.parse(taskData);
            }
        };
        // приватная фунция для сохранения данных в localStorage
        this.saveTasks = function () {
            // Сохранения в localStorage
            localStorage.setItem('tasks', JSON.stringify(_this._tasks));
        };
        // функция для создание новой задачи
        this.createTasks = function (task) {
            _this._tasks.push(task);
            _this.saveTasks(); // сохранем задачу
        };
        // фунция для получения все задач по категория
        this.getByCategoryTask = function (category) {
            return _this._tasks.filter(function (task) { return task.category == category; }); // фильтрация задач по категория
        };
        // фунция для получения всех сделалны или несделаных задач
        this.isFinish = function (done) {
            return _this._tasks.filter(function (task) { return task.isFinish == done; }); // фильтрация по категория сделанных задач
        };
        // фунция для удаления задачи
        this.deleteTask = function (id) {
            _this._tasks.filter(function (task) { return task.id === id; });
            _this.saveTasks(); // сохраняем tasks после удаления
        };
        this.clear = function () {
            _this._tasks = []; // чистка localstorage
            _this.saveTasks();
        };
        // Загрузка данных из localStorage при создании экземпляра ToDo
        this.loadTask();
    }
    Object.defineProperty(ToDo.prototype, "tasks", {
        // функция для получения всех задач @GET
        get: function () {
            return this._tasks;
        },
        enumerable: false,
        configurable: true
    });
    return ToDo;
}());
// загрузка класс через event List
// DOMContentLoaded === useEffect
var todo = new ToDo(); // создание экмепляра
localStorage.setItem('tasks', JSON.stringify(todo.tasks));
// фунция для загрузки задач
var loadingTasks = function () {
    var ul = document.getElementById('list');
    ul.innerHTML = '';
    todo.tasks.forEach(function (task) {
        var li = document.createElement('li');
        li.classList.add('toDo__item'); // Добавления класса
        // Создание div container card
        var cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        // Создание левой части card
        var leftSide = document.createElement('div');
        leftSide.classList.add('card__left');
        // Добавление радио кнопки
        var radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.classList.add('card__radio');
        radioInput.checked = task.isFinish;
        // Добавление текстового поля
        var textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.classList.add('card__input');
        textInput.value = task.value;
        // Добавление радио кнопки и текстового поля в левую часть карточки
        leftSide.appendChild(radioInput);
        leftSide.appendChild(textInput);
        // Создание правой части card
        var rightSide = document.createElement('div');
        rightSide.classList.add('card__right');
        // Добавление кнопок в правую часть карточки
        var editButton = document.createElement('button');
        editButton.classList.add('card__btn', 'purple');
        editButton.textContent = 'Edit';
        var deleteButton = document.createElement('button');
        deleteButton.classList.add('card__btn', 'red');
        deleteButton.textContent = 'Delete';
        rightSide.appendChild(editButton);
        rightSide.appendChild(deleteButton);
        // Добавление левой и правой части карточки в общий контейнер карточки
        cardDiv.appendChild(leftSide);
        cardDiv.appendChild(rightSide);
        li.appendChild(cardDiv);
        ul.appendChild(li);
        console.log('task');
    });
};
document.addEventListener("DOMContentLoaded", function () {
    console.log(todo.tasks);
    loadingTasks(); //загрузка все задач
});
// btn проверяем btn
var onSubmitBtn = function (event) {
    event.preventDefault(); // блокировка обновления сайта
    var input = document.getElementById('toDo__input');
    console.log(input);
    loadingTasks(); // загрузка все задач
};
var btn = document.getElementById('btn');
btn.addEventListener('click', function (event) {
    event.preventDefault();
    var input = document.getElementById('toDo__input'); // type input
    var radios = document.getElementsByName('category');
    console.log(input.value);
    radios.forEach(function (radio) {
        if (radio.checked) {
            console.log(radio.id);
        }
    });
    todo.createTasks({
        title: input.value,
        value: input.value,
        category: Category.Business,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: todo.tasks.length + 1,
        isFinish: false
    });
    console.log(todo.tasks);
    loadingTasks(); //загрузка все задач
});
todo.clear();
