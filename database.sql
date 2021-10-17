CREATE TABLE `values` (
     `id` INT NOT NULL,
     `prev_value` INT NULL,
     `next_value` INT NULL,
     `updated_at` DATETIME NULL,
     PRIMARY KEY (`id`));

INSERT INTO `values` (`id`, `prev_value`, `next_value`, `updated_at`) VALUES ('1', '0', '0', '2000-01-01 00:00:00');
