// enum для создание катерогий
var Category;
(function (Category) {
    Category[Category["Person"] = 0] = "Person";
    Category[Category["Business"] = 1] = "Business";
})(Category || (Category = {}));
var ToDo = /** @class */ (function () {
    // конструктор класса для загрузки localStorage
    function ToDo() {
        // Загрузка данных из localStorage при создании экземпляра ToDo
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
document.addEventListener("DOMContentLoaded", function () {
    var todo = new ToDo(); // создание экземпряла
    console.log(todo.tasks);
});
