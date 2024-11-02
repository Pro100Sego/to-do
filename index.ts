import * as readline from 'readline';
import {
    createCatalog, deleteCatalog, renameCatalog,
    addTaskToCatalog, deleteTaskFromCatalog, moveTaskToAnotherCatalog,
    markTaskCompleted, listCatalogs as listCatalogs, listTasksInCatalog as listTasksInCatalog
} from './taskManager';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mainMenu() {
    console.log('\nМенеджер задач');
    console.log('1. Создать каталог');
    console.log('2. Удалить каталог');
    console.log('3. Переименовать каталог');
    console.log('4. Добавить задачу в каталог');
    console.log('5. Удалить задачу из каталога');
    console.log('6. Переместить задачу в другой каталог');
    console.log('7. Отметить задачу как завершённую');
    console.log('8. Показать все каталоги');
    console.log('9. Показать задачи в каталоге');
    console.log('10. Выйти');
    rl.question('Выберите опцию: ', answer => {
        switch (answer) {
            case '1':
                rl.question('Введите название каталога: ', name => {
                    rl.question('Введите описание каталога: ', description => {
                        const catalog = createCatalog(name, description);
                        console.log(`Каталог создан: ${catalog.name}`);
                        mainMenu();
                    });
                });
                break;
            case '2':
                rl.question('Введите ID каталога для удаления: ', id => {
                    const success = deleteCatalog(Number(id));
                    console.log(success ? 'Каталог удалён' : 'Каталог не найден');
                    mainMenu();
                });
                break;
            case '3':
                rl.question('Введите ID каталога для переименования: ', id => {
                    rl.question('Введите новое имя: ', newName => {
                        const catalog = renameCatalog(Number(id), newName);
                        console.log(catalog ? `Каталог переименован в: ${catalog.name}` : 'Каталог не найден');
                        mainMenu();
                    });
                });
                break;
            case '4':
                rl.question('Введите ID каталога для добавления задачи: ', catalogId => {
                    rl.question('Введите название задачи: ', title => {
                        rl.question('Введите время начала задачи (ГГГГ-ММ-ДД ЧЧ:мм): ', startTimeStr => {
                            const startTime = new Date(startTimeStr);
                            rl.question('Введите время завершения задачи (ГГГГ-ММ-ДД ЧЧ:мм, опционально): ', endTimeStr => {
                                const endTime = endTimeStr ? new Date(endTimeStr) : undefined;
                                const task = addTaskToCatalog(Number(catalogId), title, startTime, endTime);
                                console.log(task ? `Задача добавлена: ${task.title}` : 'Каталог не найден');
                                mainMenu();
                            });
                        });
                    });
                });
                break;
            case '5':
                rl.question('Введите ID каталога: ', catalogId => {
                    rl.question('Введите ID задачи для удаления: ', taskId => {
                        const success = deleteTaskFromCatalog(Number(catalogId), Number(taskId));
                        console.log(success ? 'Задача удалена' : 'Задача не найдена');
                        mainMenu();
                    });
                });
                break;
            case '6':
                rl.question('Введите ID исходного каталога: ', fromCatalogId => {
                    rl.question('Введите ID целевого каталога: ', toCatalogId => {
                        rl.question('Введите ID задачи для перемещения: ', taskId => {
                            const success = moveTaskToAnotherCatalog(Number(taskId), Number(fromCatalogId), Number(toCatalogId));
                            console.log(success ? 'Задача перемещена' : 'Задача или каталог не найдены');
                            mainMenu();
                        });
                    });
                });
                break;
            case '7':
                rl.question('Введите ID каталога: ', catalogId => {
                    rl.question('Введите ID задачи для отметки как завершённой: ', taskId => {
                        const task = markTaskCompleted(Number(catalogId), Number(taskId));
                        console.log(task ? `Задача отмечена как завершённая: ${task.title}` : 'Задача не найдена');
                        mainMenu();
                    });
                });
                break;
            case '8':
                const catalogs = listCatalogs();
                console.log('Каталоги:', catalogs.length ? catalogs : 'Каталоги отсутствуют');
                mainMenu();
                break;
            case '9':
                rl.question('Введите ID каталога для просмотра задач: ', catalogId => {
                    const tasks = listTasksInCatalog(Number(catalogId));
                    console.log('Задачи:', tasks?.length ? tasks : 'Задачи в каталоге отсутствуют');
                    mainMenu();
                });
                break;
            case '10':
                rl.close();
                break;
            default:
                console.log('Неверная опция');
                mainMenu();
                break;
        }
    });
}

mainMenu();