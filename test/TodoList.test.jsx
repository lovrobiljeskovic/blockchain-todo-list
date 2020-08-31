const TodoList = artifacts.require("TodoList");

contract('TodoList', (accounts) => {
  before(async () => {
    this.todoList = await TodoList.deployed()
  })

  it('deploys successfully', async () => {
    const address = await this.todoList.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it('lists tasks', async () => {
    const itemIds = await this.todoList.getItemids()
    let tasks;
    for (let i = 0; i < itemIds.length; i++) {
        tasks = await this.todoList.items(itemIds[i]);
        assert.equal(tasks.id.toNumber(), itemIds[i]);
    }
  })

  it('creates tasks', async () => {
    const result = await this.todoList.createTask('A new task')
    const taskCount = await this.todoList.itemCount();
    console.log('task count here', taskCount);
    assert.equal(taskCount, 3)
    const event = result.logs[0].args;
    console.log('event', event[0].id);
    assert.equal(event[0].id, '3');
    assert.equal(event[0].text, 'A new task')
  })

})