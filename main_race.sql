-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 16, 2023 at 07:11 PM
-- Server version: 5.7.39
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `main_race`
--

-- --------------------------------------------------------

--
-- Table structure for table `couriers`
--

CREATE TABLE `couriers` (
  `courierId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `courierNumber` smallint(3) NOT NULL,
  `courierName` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(4) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `courierPoints` smallint(4) DEFAULT '0',
  `courierPenalties` smallint(4) DEFAULT '0',
  `sum` smallint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `couriers_jobs`
--

CREATE TABLE `couriers_jobs` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `courierNumber` smallint(3) NOT NULL,
  `jobNumber` smallint(5) NOT NULL,
  `pickup` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dropoff` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `finishedA` bit(1) NOT NULL DEFAULT b'0',
  `finishedB` bit(1) NOT NULL DEFAULT b'0',
  `finishedC` bit(1) NOT NULL DEFAULT b'0',
  `jobPenalties` smallint(3) DEFAULT '20',
  `finishedJob` smallint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `jobId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jobNumber` smallint(5) NOT NULL,
  `cp_a_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cp_a_code` smallint(4) NOT NULL,
  `cp_b_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cp_b_code` smallint(4) NOT NULL,
  `cp_c_name` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cp_c_code` smallint(4) DEFAULT NULL,
  `jobPoints` smallint(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `couriers`
--
ALTER TABLE `couriers`
  ADD PRIMARY KEY (`courierId`),
  ADD KEY `courierNumber` (`courierNumber`);

--
-- Indexes for table `couriers_jobs`
--
ALTER TABLE `couriers_jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courierNumber` (`courierNumber`),
  ADD KEY `jobNumber` (`jobNumber`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`jobId`) USING BTREE,
  ADD KEY `number` (`jobNumber`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `jobNumber` smallint(5) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `couriers_jobs`
--
ALTER TABLE `couriers_jobs`
  ADD CONSTRAINT `couriers_jobs_ibfk_1` FOREIGN KEY (`courierNumber`) REFERENCES `couriers` (`courierNumber`),
  ADD CONSTRAINT `couriers_jobs_ibfk_2` FOREIGN KEY (`jobNumber`) REFERENCES `jobs` (`jobNumber`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
