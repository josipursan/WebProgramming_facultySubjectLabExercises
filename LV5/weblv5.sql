-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2020 at 03:56 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `weblv5`
--

-- --------------------------------------------------------

--
-- Table structure for table `catfighters`
--

CREATE TABLE `catfighters` (
  `catID` int(11) NOT NULL,
  `catName` varchar(50) DEFAULT NULL,
  `catAge` int(11) DEFAULT NULL,
  `catInfo` varchar(250) DEFAULT NULL,
  `catWin` int(11) DEFAULT NULL,
  `catLoss` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `catfighters`
--

INSERT INTO `catfighters` (`catID`, `catName`, `catAge`, `catInfo`, `catWin`, `catLoss`) VALUES
(1, 'Pero', 25, '', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `catfighters`
--
ALTER TABLE `catfighters`
  ADD PRIMARY KEY (`catID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `catfighters`
--
ALTER TABLE `catfighters`
  MODIFY `catID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
