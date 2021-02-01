SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `logs` (
  `log_id` int(11) NOT NULL,
  `website_id` int(11) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(11) NOT NULL COMMENT 'http response',
  `response_time` float NOT NULL COMMENT 'response time in second'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `plan` int(11) NOT NULL,
  `isActive` int(11) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `websites` (
  `website_id` int(11) NOT NULL,
  `website_name` varchar(255) NOT NULL,
  `tags` varchar(255) NOT NULL,
  `link` varchar(250) NOT NULL,
  `interval` int(2) NOT NULL,
  `user_id` int(11) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp(),
  `isActive` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `logs`
  ADD PRIMARY KEY (`log_id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

ALTER TABLE `websites`
  ADD PRIMARY KEY (`website_id`);

ALTER TABLE `logs`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `websites`
  MODIFY `website_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;