-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 16 Lip 2024, 21:54
-- Wersja serwera: 10.4.27-MariaDB
-- Wersja PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `multiplication`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `dane`
--

CREATE TABLE `dane` (
  `id` int(11) NOT NULL,
  `date` text NOT NULL,
  `points` int(11) NOT NULL,
  `category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `dane`
--

INSERT INTO `dane` (`id`, `date`, `points`, `category`) VALUES
(102, '14.07.2024', 3, 0),
(103, '14.07.2024', 5, 0),
(104, '14.07.2024', 7, 0),
(105, '14.07.2024', 8, 0),
(106, '14.07.2024', 7, 0),
(107, '14.07.2024', 9, 0),
(108, '14.07.2024', 11, 0),
(109, '14.07.2024', 7, 0),
(120, '16.07.2024', 0, 0),
(121, '16.07.2024', 1, 0),
(122, '16.07.2024', 0, 0),
(123, '16.07.2024', 1, 0),
(124, '16.07.2024', 1, 0),
(125, '16.07.2024', 0, 0),
(126, '16.07.2024', 1, 0),
(127, '16.07.2024', 1, 0),
(128, '16.07.2024', 0, 1),
(129, '16.07.2024', 0, 0),
(130, '16.07.2024', 1, 1),
(131, '16.07.2024', 0, 2),
(132, '16.07.2024', 1, 2),
(133, '16.07.2024', 0, 2),
(134, '16.07.2024', 0, 2),
(135, '16.07.2024', 0, 2),
(136, '16.07.2024', 0, 0),
(137, '16.07.2024', 0, 0),
(138, '16.07.2024', 0, 0),
(139, '16.07.2024', 13, 0),
(140, '16.07.2024', 2, 0),
(141, '16.07.2024', 4, 0),
(142, '16.07.2024', 11, 0),
(143, '16.07.2024', 21, 0),
(144, '16.07.2024', 15, 0),
(145, '16.07.2024', 18, 0);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `dane`
--
ALTER TABLE `dane`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `dane`
--
ALTER TABLE `dane`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
