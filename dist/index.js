"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
class TaskManager {
    constructor() {
        this.tasks = new Map();
        this.lastId = 0;
    }
    addTask(name, description) {
        const newId = this.lastId + 1;
        const newTask = {
            id: newId,
            name,
            description,
            isCompleted: TaskManager.DEFAULT_IS_COMPLETED
        };
        this.tasks.set(newId, newTask);
        this.lastId = newId;
        return newTask;
    }
    deleteTask(id) {
        if (this.tasks.has(id)) {
            return this.tasks.delete(id);
        }
        return undefined;
    }
    listTasks() {
        return Array.from(this.tasks.values());
    }
    updateTaskStatus(id, isCompleted) {
        const task = this.tasks.get(id);
        if (task) {
            task.isCompleted = isCompleted;
            return task;
        }
        return undefined;
    }
}
TaskManager.DEFAULT_IS_COMPLETED = false;
function askQuestion(question) {
    return new Promise((resolve) => {
        r1.question(question, (answer) => {
            resolve(answer);
        });
    });
}
function showMenu() {
    console.log("\Task Manager");
    console.log("1. Add Task");
    console.log("2. List Tasks");
    console.log("3. Update Tasks Status");
    console.log("4. Delete Task");
    console.log("5. Exit");
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const manager = new TaskManager();
        function handleInput() {
            return __awaiter(this, void 0, void 0, function* () {
                showMenu();
                const option = yield askQuestion('Choose an option: ');
                switch (option.trim()) {
                    case '1':
                        const name = yield askQuestion('Task Name: ');
                        const description = yield askQuestion('Task Description: ');
                        const task = manager.addTask(name, description);
                        console.log('Task added: ', task);
                        break;
                    case '2':
                        const tasks = manager.listTasks();
                        console.log('Tasks: ', tasks);
                        break;
                    case '3':
                        const updateId = yield askQuestion('Task ID: ');
                        const isCompletedAnswer = yield askQuestion('Completed? (y/n): ');
                        const isCompleted = isCompletedAnswer.trim() == 'y' ? true : false;
                        const updateResult = manager.updateTaskStatus(parseInt(updateId.trim(), 10), isCompleted);
                        if (updateResult) {
                            console.log("Task Updated:", updateResult);
                        }
                        else {
                            console.log("Task Not Found");
                        }
                        break;
                    case '4':
                        const deleteId = yield askQuestion('Task ID: ');
                        const deleteResult = manager.deleteTask(parseInt(deleteId.trim(), 10));
                        if (deleteResult) {
                            console.log("Task Deleted");
                        }
                        else {
                            console.log("Task Not Found");
                        }
                        break;
                    case '5':
                        console.log("Goodbye!");
                        r1.close();
                        return;
                    default:
                        console.log("Invalid option. Please try again.");
                        break;
                }
                yield handleInput();
            });
        }
        yield handleInput();
    });
}
main();
