describe('To-Do App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080'); // Replace with your app's URL
    });

    it('should add a new task', () => {
        const task = 'Buy groceries';
        cy.get('#todo-input').type(task); // Type the task
        cy.get('#add-todo').click();      // Click the "Add" button
        cy.get('#todo-list').should('contain', task); // Verify the task is added
    });

    it('should delete a task', () => {
        const task = 'Clean the house';

        // Add a task
        cy.get('#todo-input').type(task);
        cy.get('#add-todo').click();
        cy.get('#todo-list').should('contain', task);

        // Delete the task
        cy.contains(task).parent().find('.delete-todo').click();

        // Verify the task is removed
        cy.get('#todo-list').should('not.contain', task);
    });

    it('should handle multiple tasks and delete one', () => {
        const tasks = ['Task 1', 'Task 2', 'Task 3'];

        // Add multiple tasks
        tasks.forEach(task => {
            cy.get('#todo-input').type(task);
            cy.get('#add-todo').click();
        });

        // Verify all tasks are added
        cy.get('#todo-list li').should('have.length', tasks.length);

        // Delete the second task
        cy.contains('Task 2').parent().find('.delete-todo').click();

        // Verify Task 2 is deleted
        cy.get('#todo-list').should('not.contain', 'Task 2');

        // Verify the other tasks are still present
        cy.get('#todo-list').should('contain', 'Task 1');
        cy.get('#todo-list').should('contain', 'Task 3');
    });
});
