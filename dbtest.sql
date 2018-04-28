-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2018 at 09:31 PM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbtest`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `userName` varchar(30) NOT NULL,
  `userEmail` varchar(60) NOT NULL,
  `userPass` varchar(255) NOT NULL,
  `confirmed` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `Icon` int(11) NOT NULL,
  `tier` text NOT NULL,
  `rank` text NOT NULL,
  `leagueName` text NOT NULL,
  `wins` int(11) NOT NULL,
  `losses` int(11) NOT NULL,
  `lp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `userName`, `userEmail`, `userPass`, `confirmed`, `level`, `Icon`, `tier`, `rank`, `leagueName`, `wins`, `losses`, `lp`) VALUES
(5, 'test', 'austinnguyen01@gmail.com', 'c7c1319276e936c8d64f1d5ed80cd8a0cf54e6dea7b0125533eb4163e03a2c11', 0, 0, 0, '', '', '', 0, 0, 0),
(22, 'kyneticderpcake', 'austinblade@gmail.com', 'c7c1319276e936c8d64f1d5ed80cd8a0cf54e6dea7b0125533eb4163e03a2c11', 0, 52, 6, 'SILVER', 'IV', 'Karthus s Dragoons', 520, 516, 54);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `userEmail` (`userEmail`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
