```mermaid
mindmap
  root((Λειτουργικές 
        Απαιτήσεις))
    [Αυθεντικοποίηση]
      Εγγραφή Χρήστη
      Σύνδεση Χρήστη
      Αποσύνδεση
    [Χρήστες]
      Δημιουργία Χρήστη
      Προβολή Χρηστών
    [Φοιτητές]
      Δημιουργία Προφίλ
      Επεξεργασία Προφίλ
    [Δεξιότητες]
      Προσθήκη Δεξιότητας
      Διαγραφή Δεξιότητας
    [Λέξεις Κλειδιά]
      Προσθήκη Keyword
      Διαγραφή Keyword
    [Βιογραφικό]
      Δημιουργία Βιογραφικού
      Ενημέρωση Βιογραφικού
      Διαγραφή Βιογραφικού
      Προβολή Βιογραφικού
```
<br><br><br><br><br><br>
```mermaid
mindmap
  root((Μη-Λειτουργικές
         Απαιτήσεις))
    [Ασφάλεια]
      Αυθεντικοποίηση
      Εξουσιοδότηση
    [Απόδοση]
      Γρήγορη Απόκριση API
      Αποδοτικά Queries
    [Επεκτασιμότητα]
      Modular Αρχιτεκτονική
      REST API
    [Συντηρησιμότητα]
      Διαχωρισμός Services
      Καθαρή Δομή Κώδικα
    [Ευχρηστία]
      Απλό Bootstrap UI
      Responsive Σχεδίαση
    [Αξιοπιστία]
      Διαχείριση Σφαλμάτων
      Ακεραιότητα Βάσης Δεδομένων
```

<br><br><br><br><br><br>
```mermaid
%% ---
%% title: Διάγραμμα Κλάσεων
%% ---
classDiagram

class AuthManagment{
  +login(email,password)
  +getUsersByKeyword()
  +getUsersBySkill()
}

class Admin{
  +createStudent()
  +deleteStudent()
}

class AdminManagment{
  +createCV(student_id)
  +update_CV(student_id)
  +deleteCV(student_id)
  +addKeyword(student_id,skill_name)
  +removeKeyword(student_id,skill_name)
   +addSkill(student_id,skill_name)
  +removeSkill(student_id,skill_name)
}



class User {
  +id int
  +email String
  +role String
  +logout()
}

class Student {
  +student_id int
  +name String
  +surname String
}

%% class SkillManagment{
%% }

class CV {
  +cv_id int
  +summary String
  +createCV()
  +updateCV()
  +viewCV()
}

%% class student_Skill {
%%   skill_id int
%%   +student_id int
%% }

%% class student_Keyword {
%%   +keyword_id int
%%   +student_id int
%% }

%% class KeywordManagment{
%%   +addKeyword(student_id,skill_name)
%%   +removeKeyword(student_id,skill_name)
%% }

class Skill{
  +skill_id int
  +skill_name String
  +addSkill()
  +deleteSkill()
}

class Keyword{
  +keyword_id int
  +keyword_name String
  +addKeyword()
  +deleteKeyword()
}
AuthManagment --> User

User "1"*--"0..1" Student : has
User "1"*--"0..1" Admin : has

Admin --> AdminManagment
%% Admin --> SkillManagment
%% Admin --> KeywordManagment

AdminManagment --> CV

Student "1" *--> "1" CV :owns
Student "*" *--> "*" Skill 


Student "*" *--> "*" Keyword
%% SkillManagment --> Skill
%% KeywordManagment --> Keyword
```

<br><br><br><br><br><br>
```mermaid
classDiagram

%% class AuthSystem[" a: AuthSystem"] {
%%   login("admin\@email.com","123456")
%% }

class Admin1[" devAdmin : Admin"] {
  admin_id = 1
}

class User["u : User"]  {
  id = 1
  email = "admin\@email.com"
  role = "admin"
}

%% class Student1["John : Student"] {
%%   student_id = 5
%%   name = "John"
%%   surname = "Doe"
%% }

class CV1["cv : CV"] {
  cv_id = 3
  summary = "Backend Developer"
}

class Skill1["s1: Skill"] {
  skill_id = 1
  skill_name = "Node.js"
}

class Skill2 ["s2: Skill"]{
  skill_id = 2
  skill_name = "Express.js"
}

class Keyword1["k1 : Keyword"] {
  keyword_id = 1
  keyword_name = "Backend"
}

class Keyword2["k2 : Keyword"] {
  keyword_id = 2
  keyword_name = "REST API"
}

class AdminManagment1["a : AdminManagment"] {
  student_id =5
  %% createCV(5)
  %% addSkill(5,"Node.js")
  %% addSkill(5,"Express.js")
  %% addKeyword(5,"Backend")
  %% addKeyword(5,"REST API")
}

%% AuthSystem *--> User

User *--> Admin1
AdminManagment1--> CV1
%% AdminManagment1
AdminManagment1--> Skill1
AdminManagment1--> Skill2
%% AdminManagment1
AdminManagment1--> Keyword1
AdminManagment1--> Keyword2

Admin1 --> AdminManagment1
%% AdminManagment1 --> CV1
```
```mermaid
%% ---
%% title: Διάγραμμα ροής Login
%% ---
sequenceDiagram

actor User 
participant Frontend
participant API
participant Service
participant Database

User ->> Frontend : Click login
Frontend ->> API: POST /api/login
API ->> Service: getUserByEmailNPassword()
Service ->> Database: Query user
Database -->> Service : user data 

alt Success
    Service ->> API: RETURNS user OBJECT
    API ->> Frontend: JSON response (success)
    Frontend ->> User: Login Success
else Failure
    Service -->> API: null / error
    API -->> Frontend: 401 Unathorized
    Frontend -->> User: Login Failed message
end


```