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
            _this.loadTask();
        };
        // функция для создание новой задачи
        this.createTasks = function (task) {
            _this._tasks.push(task);
            _this.saveTasks(); // сохранем задачу
        };
        // фунция для получения всех сделалны или несделаных задач
        this.isFinish = function (id, done) {
            _this._tasks = _this._tasks = _this.tasks.map(function (task) {
                if (task.id == id) {
                    task.isFinish = done;
                }
                return task;
            });
            _this.saveTasks();
        };
        // фунция для удаления задачи
        this.deleteTask = function (id) {
            _this._tasks = _this._tasks.filter(function (task) { return task.id !== id; });
            _this.saveTasks(); // сохраняем tasks после удаления
        };
        // фунция для изменения измени задачи
        this.editTask = function (id, title) {
            _this._tasks = _this.tasks.map(function (task) {
                if (task.id == id) {
                    task.value = title;
                }
                return task;
            });
            _this.saveTasks(); // сохраняем tasks после изменения
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
// event Listener для input[type='radio']
var personRadio = document.getElementById('person');
personRadio.addEventListener('change', function () {
    addDeleteClass('person_label', 'person');
});
var businessRadio = document.getElementById('business');
businessRadio.addEventListener('change', function () {
    addDeleteClass('business__label', 'business');
});
// фунция для загрузки задач
var loadingTasks = function () {
    var ul = document.getElementById('list');
    ul.innerHTML = '';
    todo.tasks.forEach(function (task) {
        var li = document.createElement('li');
        li.classList.add('list__item'); // Добавления класса
        // Создание div container card
        var cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.setAttribute('id', "".concat(task.id));
        // Создание левой части card
        var leftSide = document.createElement('div');
        leftSide.classList.add('card__left');
        // Добавление радио кнопки
        var radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.classList.add('card__radio');
        radioInput.checked = task.isFinish;
        if ("".concat(task.category) == 'person') {
            radioInput.classList.add('personBox');
            if (task.isFinish) {
                radioInput.classList.add('person');
            }
        }
        else if ("".concat(task.category) == 'business') {
            radioInput.classList.add('businessBox');
            if (task.isFinish) {
                radioInput.classList.add('business');
            }
        }
        radioInput.setAttribute('category', "".concat(task.category));
        // Добавление текстового поля
        var textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.classList.add('card__input');
        textInput.value = task.value;
        textInput.setAttribute('readonly', 'readonly');
        if (task.isFinish) {
            textInput.classList.add('finished');
        }
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
    deleteTask(); // фунция которая добавляет event для каждого btn *red*
    editTask(); // фунция которая добавляет event для каждого btn *purple*
    isFinish(); // фунция которая добавляет event для каждого radio
};
// фунция для удаления зачад
var deleteTask = function () {
    var tasksItems = document.querySelectorAll('.card');
    tasksItems.forEach(function (task) {
        var IdCard = task.getAttribute('id');
        var eventTask = task.querySelector('.card__right').querySelector('.red');
        eventTask.addEventListener('click', function () {
            todo.deleteTask(+IdCard);
            loadingTasks(); // перегружаем список
        });
    });
};
// фукция для редактирования имени задачи
var editTask = function () {
    var tasksItems = document.querySelectorAll('.card');
    tasksItems.forEach(function (task) {
        var IdCard = task.getAttribute('id');
        var eventTask = task.querySelector('.card__right').querySelector('.purple');
        eventTask.addEventListener('click', function () {
            var input = task.querySelector('.card__left').querySelector('.card__input');
            input.removeAttribute('readonly');
            input.addEventListener('focus', function () {
                input.classList.toggle('focus');
            });
            input.addEventListener('blur', function () {
                input.setAttribute('readonly', 'readonly');
                todo.editTask(+IdCard, input.value);
                loadingTasks();
            });
        });
    });
};
// фунция для изменения задачи на выполенено
var isFinish = function () {
    var tasksItems = document.querySelectorAll('.card');
    tasksItems.forEach(function (task) {
        var IdCard = task.getAttribute('id');
        var radioEvent = task.querySelector('.card__left').querySelector('.card__radio');
        radioEvent.addEventListener('change', function () {
            var input = task.querySelector('.card__left').querySelector('.card__input');
            if (radioEvent.checked) {
                input.classList.add('finished');
                todo.isFinish(+IdCard, radioEvent.checked);
            }
            input.classList.remove('finished');
            todo.isFinish(+IdCard, radioEvent.checked);
            loadingTasks();
        });
    });
};
// загружаем все зачачи когда будет useEffect
document.addEventListener("DOMContentLoaded", function () {
    console.log(todo.tasks);
    loadingTasks(); //загрузка все задач
});
// btn проверяем btn
var btn = document.getElementById('btn');
// простой валидатор формы
var validationForm = function (input, checked) {
    return input.length > 1 && checked;
};
// по click btn добавляем зачаду
btn.addEventListener('click', function (event) {
    event.preventDefault();
    var input = document.getElementById('toDo__input'); // type input
    var radios = document.getElementsByName('category');
    var checked;
    radios.forEach(function (radio) {
        if (radio.checked) {
            checked = radio.id;
        }
    });
    console.log(validationForm(input.value, checked));
    if (validationForm(input.value, checked)) {
        todo.createTasks({
            value: input.value,
            category: checked,
            id: todo.tasks.length + 1,
            isFinish: false
        });
        input.value = '';
        radios.forEach(function (radio) { return radio.checked = false; });
    }
    loadingTasks(); //загрузка все задач
});
// фунция для кастомизации radio - label
var handleRadioClick = function (selected) {
    var personLabel = document.getElementById('person_label');
    var businessLabel = document.getElementById('business__label');
    if (selected == 'person') {
        personLabel.classList.add('person');
        businessLabel.classList.remove('business');
    }
    else if (selected == 'business') {
        personLabel.classList.remove('person');
        businessLabel.classList.add('business');
    }
};
// фунция удаления добавления класса
var addDeleteClass = function (labelID, className) {
    var label = document.getElementById(labelID);
    label.classList.toggle(className);
    handleRadioClick(className);
};
