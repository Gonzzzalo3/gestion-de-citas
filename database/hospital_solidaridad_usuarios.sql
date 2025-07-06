-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: hospital_solidaridad
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `dni` varchar(20) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `rol` enum('Paciente','Medico','Admin') NOT NULL DEFAULT 'Paciente',
  `estado` enum('Activo','Inactivo') NOT NULL DEFAULT 'Activo',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (17,'Ariana','Torres','ariana.torres@example.com','hashAri123','42719384','1998-06-21','Paciente','Activo','2025-06-23 23:13:59'),(18,'Mateo','Fernández','mateo.fernandez@example.com','hashMateo456','30218765','1981-11-14','Medico','Activo','2025-06-23 23:13:59'),(19,'Elsa','Velarde','elsa.velarde@example.com','hashElsa789','76321109','1975-02-02','Admin','Activo','2025-06-23 23:13:59'),(20,'Renzo','Paredes','renzo.p@example.com','hashRenzo321','51982673','1992-09-09','Paciente','Inactivo','2025-06-23 23:13:59'),(21,'Camila','Sandoval','cami.sandoval@example.com','hashCamila222','60734118','2000-12-30','Paciente','Activo','2025-06-23 23:13:59'),(22,'Joaquín','León','joaquin.leon@example.com','hashJoaq999','33410927','1988-03-05','Medico','Activo','2025-06-23 23:13:59'),(23,'Beatriz','Ramos','bea.ramos@example.com','hashBea007','88192341','1979-08-19','Paciente','Inactivo','2025-06-23 23:13:59'),(24,'Mauricio','Acosta','mauro.acosta@example.com','hashMau111','45027690','1995-05-12','Paciente','Activo','2025-06-23 23:13:59'),(25,'Valeria','Guzmán','valeria.guzman@example.com','hashVal444','29817356','1993-01-28','Medico','Activo','2025-06-23 23:13:59'),(26,'Daniel','Yupanqui','daniel.yupanqui@example.com','hashDan000','69881234','1984-10-03','Admin','Activo','2025-06-23 23:13:59');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-23 23:45:45
