import * as readline from 'readline'

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

interface Task {
  id: number
  name: string,
  description: string,
  isCompleted: boolean
}

class TaskManager {
  private tasks: Map<number, Task> = new Map()
  private lastId:number = 0

  static readonly DEFAULT_IS_COMPLETED = false

  addTask(name: string, description: string): Task {
    const newId = this.lastId + 1
    const newTask:Task = {
      id: newId,
      name,
      description,
      isCompleted: TaskManager.DEFAULT_IS_COMPLETED
    }

    this.tasks.set(newId, newTask)
    this.lastId = newId

    return newTask
  }

  deleteTask(id: number): boolean | undefined {
    if (this.tasks.has(id)) {
      return this.tasks.delete(id)
    }
    
    return undefined
  }

  listTasks(): Task[] {
    return Array.from(this.tasks.values())
  }

  updateTaskStatus(id: number, isCompleted: boolean): Task | undefined {
    const task = this.tasks.get(id)

    if (task) {
      task.isCompleted = isCompleted
      return task
    }

    return undefined
  }
}

function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    r1.question(question, (answer) => {
      resolve(answer)
    })
    
  })
}

function showMenu(): void {
  console.log("\Task Manager")
  console.log("1. Add Task")
  console.log("2. List Tasks")
  console.log("3. Update Tasks Status")
  console.log("4. Delete Task")
  console.log("5. Exit")
}

async function main() {
  const manager = new TaskManager()

  async function handleInput() {
    showMenu()

    const option = await askQuestion('Choose an option: ')

    switch (option.trim()) {
      case '1':
        const name = await askQuestion('Task Name: ')
        const description = await askQuestion('Task Description: ')
        const task = manager.addTask(name, description)
        console.log('Task added: ', task)

        break
      case '2':
        const tasks = manager.listTasks()
        console.log('Tasks: ', tasks)

        break
      case '3':
        const updateId = await askQuestion('Task ID: ')
        const isCompletedAnswer = await askQuestion('Completed? (y/n): ')
        const isCompleted = isCompletedAnswer.trim() == 'y' ? true : false
        const updateResult = manager.updateTaskStatus(parseInt(updateId.trim(), 10), isCompleted)

        if (updateResult) {
          console.log("Task Updated:", updateResult)
        } else {
          console.log("Task Not Found")
        }
        
        break
      case '4':
        const deleteId = await askQuestion('Task ID: ')
        const deleteResult = manager.deleteTask(parseInt(deleteId.trim(), 10))
        if (deleteResult) {
          console.log("Task Deleted")
        } else {
          console.log("Task Not Found")
        }

        break
      case '5':
        console.log("Goodbye!")
        r1.close()

        return
      default:
        console.log("Invalid option. Please try again.")
        break
    }

    await handleInput()
  }

  await handleInput()
}

main()