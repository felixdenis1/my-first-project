//npx felix-crud my-app
//npx felix-backend my-api


//git.Felix300512#;
//CREATE DATABASE Camellia;

//USE Camellia;

//CREATE TABLE Users (
    UserId INT AUTO_INCREMENT PRIMARY KEY,
    UserName VARCHAR(255),
    Password VARCHAR(255)
);

//CREATE TABLE Post (
    PostId INT AUTO_INCREMENT PRIMARY KEY,
    PostName VARCHAR(255)
);

//CREATE TABLE CandidateResult (
    CandidateNationalId VARCHAR(20) PRIMARY KEY,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    Gender VARCHAR(10),
    DateOfBirth DATE,
    PostId INT,
    ExamDate DATE,
    PhoneNumber VARCHAR(20),
    Marks INT,
    FOREIGN KEY (PostId) REFERENCES Post(PostId)
);

//sudo apt update
sudo apt install git
//mkdir my-first-project
cd my-first-project
//echo "# Hello GitHub" > README.md
//git init
//git add .
git commit -m "Initial commit"
//git remote add origin https://github.com/yourusername/my-first-project.git
git branch -M main
git push -u origin main

