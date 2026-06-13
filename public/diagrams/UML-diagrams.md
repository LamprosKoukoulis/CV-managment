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
  +login(email: String,password: String): User
  +getUsersByKeyword(keyword:String): List~User~
  +getUsersBySkill(skill: String): List~User~
}

class Admin{
  +createStudent(student_id: int): Student
  +deleteStudent(student_id: int): Student
}

class AdminManagment{
  +createCV(student_id: int)
  +update_CV(student_id: int)
  +deleteCV(student_id: int)
  +addKeyword(student_id: int,skill_name: String)
  +removeKeyword(student_id: int, skill_name: String)
  +addSkill(student_id: int, skill_name: String)
  +removeSkill(student_id: int, skill_name: String)
}



class User {
  +id: int
  +email: String
  +role: String
  +logout(): Bool
}

class Student {
  +student_id: int
  +name: String
  +surname: String
}

%% class SkillManagment{
%% }

class CV {
  +cv_id: int
  +summary: String
  +createCV(student_id: int, data: Array~String~): int
  +updateCV(student_id: int, data: Array~String~) : int
  +getCV(student_id: int): String
}

%% class student_Skill {
%%   skill_id int
%%   +student_id int
%% }

%% class student_Keyword {
%%   +keyword_id: int
%%   +student_id: int
%% }

%% class KeywordManagment{
%%   +addKeyword(student_id,skill_name): int
%%   +removeKeyword(student_id,skill_name): int
%% }

class Skill{
  +skill_id: int
  +skill_name: String
  +addSkill(student_id: int, skill_name: String): Bool
  +deleteSkill(student_id: int, skill_name: String): Bool
}

class Keyword{
  +keyword_id: int
  +keyword_name: String
  +addKeyword(student_id: int, keyword_name: String): Bool
  +deleteKeyword(student_id: int, keyword_name: String): Bool
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
    Frontend ->> : Login Success
    
else Failure
    Service -->> API: null / error
    API -->> Frontend: 401 Unathorized
    Frontend -->> User: Login Failed message
end


```
```mermaid
sequenceDiagram

%% ---------------- LOGIN FLOW ----------------

%% Student ->> Frontend : Εισαγωγή email/password
%% Frontend ->> API : POST /api/login
%% API ->> AuthService : login(email,password)
%% AuthService ->> Database : Query user
%% Database -->> AuthService : user data

%% alt Student Login
%%     AuthService -->> API : role = student
%%     API -->> Frontend : Redirect /student/dashboard
%%     Frontend -->> Student : Προβολή Student Dashboard

%% else Admin Login
%%     AuthService -->> API : role = admin
%%     API -->> Frontend : Redirect /admin/dashboard
%%     Frontend -->> Admin : Προβολή Admin Dashboard

%% else Invalid Credentials
%%     AuthService -->> API : null
%%     API -->> Frontend : 401 Unauthorized
%%     Frontend -->> Student : Μήνυμα αποτυχίας σύνδεσης
%% end

%% actor Guest as Πανεπιστήμιο / Γραφείο Εύρεσης Εργασίας
%% actor Student
actor Admin

participant Frontend
participant API
%% participant AuthService
participant AdminManagment
participant Database

%% ---------------- ADMIN MANAGEMENT ----------------

Admin ->> Frontend : Δημιουργία Φοιτητή
Frontend ->> API : POST /api/students
API ->> AdminManagment : createStudent()
AdminManagment ->> Database : INSERT student
alt  Valid student data
Database -->> AdminManagment : student created
AdminManagment -->> API : success
API -->> Frontend : JSON Response
else Missing required fields
Database -->> AdminManagment : request denied
AdminManagment -->> API : validation error
API -->> Frontend : Error Message
end

%% Admin ->> Frontend : Δημιουργία / Ενημέρωση CV
%% Frontend ->> API : POST /api/cv
%% API ->> AdminManagment : createCV()
%% AdminManagment ->> Database : INSERT/UPDATE CV
%% Database -->> AdminManagment : success
%% AdminManagment -->> API : success
%% API -->> Frontend : JSON Response

%% Admin ->> Frontend : Προσθήκη Skills / Keywords
%% Frontend ->> API : POST /api/skills
%% API ->> AdminManagment : addSkill()
%% AdminManagment ->> Database : INSERT skill
%% Database -->> AdminManagment : success

%% Frontend ->> API : POST /api/keywords
%% API ->> AdminManagment : addKeyword()
%% AdminManagment ->> Database : INSERT keyword
%% Database -->> AdminManagment : success

%% ---------------- STUDENT ACTIONS ----------------

%% Student ->> Frontend : Προβολή Βιογραφικού
%% Frontend ->> API : GET /api/cv/:id
%% API ->> Database : SELECT CV
%% Database -->> API : CV data
%% API -->> Frontend : JSON CV
%% Frontend -->> Student : Προβολή CV

%% Student ->> Frontend : Επεξεργασία Προφίλ
%% Frontend ->> API : PUT /api/student
%% API ->> Database : UPDATE student
%% Database -->> API : success
%% API -->> Frontend : Updated Profile

%% %% ---------------- GUEST SEARCH FLOW ----------------

%% Guest ->> Frontend : Αναζήτηση με keyword/skill
%% Frontend ->> API : GET /api/search

%% API ->> Database : Search by keyword/skill
%% Database -->> API : matching students

%% API -->> Frontend : Candidate Results
%% Frontend -->> Guest : Προβολή αποτελεσμάτων
```