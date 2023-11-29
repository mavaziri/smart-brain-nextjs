const userQueries = {
  create: {
    createTable: `CREATE TABLE IF NOT EXISTS smart_users(
            id INT PRIMARY KEY,
            email TEXT,
            name TEXT,
            password TEXT
        );`,
  },
};

export default userQueries;
