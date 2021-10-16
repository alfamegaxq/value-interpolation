CREATE TABLE `balances` (
     `id` INT NOT NULL,
     `prev_balance` INT NULL,
     `next_balance` INT NULL,
     `updated_at` DATETIME NULL,
     PRIMARY KEY (`id`));

INSERT INTO `blances` (`id`, `prev_balance`, `next_balance`, `updated_at`) VALUES ('1', '0', '0', '2000-01-01 00:00:00');
