# Enoy Travel Technical Task

## Running the project

To run the project simply run

```
npm install
```

Followed by

```
npm run dev
```

This will allow you to access the application on localhost:5173

## Technical decisions

From looking at the specification I wanted to provide an interface for hiring cars and have a basic overview for the user to see all of their current hires. With the idea to further expand this by inspecting individual reservations and editing them if necessary.

As to the project structure, I wanted to showcase how I typically build projects and I find this way of building with React to be highly scalable and collaborative amogst my teams.

For the task here are the most noteable library choices

**Axios** - To make networks calls to the mock backend

**Mirage JS** - For a mock backend

**React Testing Library + Vitest** - To have a test envrionment and a way to mount components to test them

**Tanstack Query** - Provide additional utilities for client server communication

**Chadcn/ui** - Provide minimal form components which are responsive and accessible

**Zod + React hook form** - Provide a way to quickly register form components and validate form data against a schema
