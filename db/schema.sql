CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`email` text NOT NULL UNIQUE,
	`password` text,
	`role` text NOT NULL
);
CREATE TABLE `students` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`user_id` integer NOT NULL,
	`name` text NOT NULL,
	`surname` text NOT NULL,
	`degree` text,
	`university` text,
	CONSTRAINT `fk_students_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);
CREATE TABLE `cv` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`student_id` integer NOT NULL,
	`summary` text,
	`experience` text,
	`education` text,
	CONSTRAINT `fk_cv_student_id_students_id_fk` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`)
);
CREATE TABLE `skills` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL UNIQUE
);
CREATE TABLE `student_skills` (
	`student_id` integer NOT NULL,
	`skill_id` integer NOT NULL,
	CONSTRAINT `student_skills_pk` PRIMARY KEY(`student_id`, `skill_id`),
	CONSTRAINT `fk_student_skills_skill_id_skills_id_fk` FOREIGN KEY (`skill_id`) REFERENCES `skills`(`id`),
	CONSTRAINT `fk_student_skills_student_id_students_id_fk` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`)
);
CREATE TABLE `keywords` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL UNIQUE
);
CREATE TABLE `student_keywords` (
	`student_id` integer NOT NULL,
	`keyword_id` integer NOT NULL,
	CONSTRAINT `student_keywords_pk` PRIMARY KEY(`student_id`, `keyword_id`),
	CONSTRAINT `fk_student_keywords_keyword_id_keywords_id_fk` FOREIGN KEY (`keyword_id`) REFERENCES `keywords`(`id`),
	CONSTRAINT `fk_student_keywords_student_id_students_id_fk` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`)
);