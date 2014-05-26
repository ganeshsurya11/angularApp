-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 26, 2014 at 02:29 PM
-- Server version: 5.5.32
-- PHP Version: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `service`
--
CREATE DATABASE IF NOT EXISTS `service` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `service`;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `phone` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `phone`, `email`, `city`) VALUES
(4, 'Rajesh', 'pattil', 9787, 'raj@sfsafsad.com', 'mumbai,pune'),
(6, 'Vilas', 'Patil', 8464, 'vilkas@sfs.com', 'mumbai'),
(13, 'Ganesh', 'Surya', 1246546, 'ganesh_surya11@yahoo.co.in', 'pune'),
(14, 'Dinesh', '', 0, '', ''),
(15, 'Prabhu', '', 2147483647, '', ''),
(16, 'ganesh', '', 0, '', ''),
(17, 'raj', '', 5646, '', ''),
(18, 'rajesdfads', '', 5646, '', ''),
(19, 'adasdfa', '', 4554, '', ''),
(20, 'Yogesh', '', 944694, '', ''),
(21, 'sds', '', 0, '', ''),
(22, 'sdsd', '', 0, '', ''),
(23, 'Pravin', '', 2147483647, '', '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
