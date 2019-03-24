# NodeJS Mentoring

## Task 06 - SQL Databases. ORM

### Evaluation Criteria:

1. All required packages installed (​*tasks 1-2*​);
2. Database and related tables created; ​sequelize​ setup (*​tasks 3-5​*);
3. Database created with all required migrations (​*task 6​*);
4. The product data from file was imported to the database (*​task 7*​);
5. All routes respond with the data from database (*task 8*);

#### How to run app

1. npm install;
2. npm run tools:dockerStart;
3. npm run sequelize:migration (for run migration);
3. npm run sequelize:seeders (only first run, for fill db initial data);
4. npm run start;