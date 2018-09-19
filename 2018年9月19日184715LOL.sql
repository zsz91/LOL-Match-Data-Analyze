/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.7.22-log : Database - lol
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`lol` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `lol`;

/*Table structure for table `area_list` */

CREATE TABLE `area_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '赛事分区',
  `match_id` int(10) DEFAULT NULL,
  `name` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `area_list` */

insert  into `area_list`(`id`,`match_id`,`name`) values (1,1,'东部'),(2,1,'西部');

/*Table structure for table `game_list` */

CREATE TABLE `game_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '每一场比赛的最终结果',
  `date` date DEFAULT '2018-09-16' COMMENT '比赛日期',
  `match` int(11) DEFAULT '1' COMMENT '赛事id',
  `win` int(11) DEFAULT '1' COMMENT '获胜方id',
  `lose` int(11) DEFAULT '1' COMMENT '失败方id',
  `net_score` int(2) DEFAULT '0' COMMENT '净胜分数',
  `type` int(11) DEFAULT NULL COMMENT '赛事类型match_type表',
  `total_score` int(2) DEFAULT NULL COMMENT '两方比分之和',
  `process` int(3) DEFAULT NULL COMMENT '比赛走势,每一局的输赢 process_list表',
  `home` int(11) DEFAULT NULL COMMENT '主场战队id/暂不分析',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `game_list` */

insert  into `game_list`(`id`,`date`,`match`,`win`,`lose`,`net_score`,`type`,`total_score`,`process`,`home`) values (1,'2018-06-11',1,3,5,1,1,3,3,NULL),(2,'2018-06-11',1,8,9,1,1,3,3,NULL),(3,'2018-06-12',1,14,12,1,1,3,3,NULL),(4,'2018-06-12',1,2,10,2,1,2,1,NULL),(5,'2018-06-13',1,3,7,2,1,2,1,NULL),(6,'2018-06-13',1,5,8,1,1,3,2,NULL),(7,'2018-06-15',1,6,9,1,1,3,3,NULL),(8,'2018-06-15',1,12,11,2,1,2,1,NULL),(9,'2018-06-16',1,6,7,2,1,2,1,NULL),(10,'2018-06-16',1,2,14,2,1,2,1,NULL),(11,'2018-06-16',1,10,13,2,1,2,1,NULL),(12,'2018-06-17',1,1,11,1,1,3,3,NULL),(13,'2018-06-17',1,12,13,1,1,3,2,NULL),(14,'2018-06-17',1,5,4,1,1,3,2,NULL),(15,'2018-06-18',1,6,8,2,1,2,1,NULL),(16,'2018-06-18',1,4,7,2,1,2,1,NULL),(17,'2018-06-19',1,11,13,1,1,3,3,NULL),(18,'2018-06-19',1,1,14,2,1,2,1,NULL),(19,'2018-06-20',1,3,9,2,1,2,1,NULL),(20,'2018-06-20',1,4,6,2,1,2,1,NULL),(21,'2018-06-22',1,2,12,2,1,2,1,NULL),(22,'2018-06-22',1,13,14,1,1,3,2,NULL),(23,'2018-06-23',1,9,7,1,1,3,2,NULL),(24,'2018-06-23',1,5,6,1,1,3,3,NULL),(25,'2018-06-23',1,4,8,2,1,2,1,NULL),(26,'2018-06-24',1,14,10,2,1,2,1,NULL),(27,'2018-06-24',1,1,13,2,1,2,1,NULL),(28,'2018-06-24',1,2,11,2,1,2,1,NULL),(29,'2018-06-25',1,5,7,1,1,3,2,NULL),(30,'2018-06-25',1,3,6,1,1,3,3,NULL),(31,'2018-06-26',1,10,11,1,1,3,3,NULL),(32,'2018-06-26',1,12,1,2,1,2,1,NULL),(33,'2018-06-27',1,4,9,2,1,2,1,NULL),(34,'2018-06-27',1,3,8,2,1,2,1,NULL),(35,'2018-06-29',1,1,10,2,1,2,1,NULL),(36,'2018-06-29',1,2,13,2,1,2,1,NULL),(37,'2018-06-30',1,7,8,1,1,3,3,NULL),(38,'2018-06-30',1,5,9,1,1,2,1,NULL),(39,'2018-06-30',1,4,3,1,1,3,2,NULL),(40,'2018-07-01',1,11,14,2,1,2,1,NULL),(41,'2018-07-01',1,10,12,2,1,2,1,NULL),(42,'2018-07-01',1,1,2,2,1,2,1,NULL),(43,'2018-07-13',1,8,10,1,1,3,3,NULL),(44,'2018-07-13',1,4,14,2,1,2,1,NULL),(45,'2018-07-14',1,12,7,2,1,2,1,NULL),(46,'2018-07-14',1,3,11,2,1,2,1,NULL),(47,'2018-07-14',1,2,6,1,1,3,3,NULL),(48,'2018-07-15',1,5,13,1,1,3,3,NULL),(49,'2018-07-15',1,14,9,1,1,3,2,NULL),(50,'2018-07-15',1,4,1,1,1,3,2,NULL),(51,'2018-07-16',1,7,10,1,1,3,2,NULL),(52,'2018-07-16',1,12,8,1,1,3,2,NULL),(53,'2018-07-17',1,1,9,2,1,2,1,NULL),(54,'2018-07-17',1,5,11,1,1,3,2,NULL),(55,'2018-07-18',1,6,14,1,1,3,2,NULL),(56,'2018-07-18',1,3,13,1,1,3,2,NULL),(57,'2018-07-20',1,5,2,1,1,3,3,NULL),(58,'2018-07-20',1,11,4,1,1,3,3,NULL),(59,'2018-07-21',1,3,10,1,1,3,3,NULL),(60,'2018-07-21',1,1,6,2,1,2,1,NULL),(61,'2018-07-22',1,12,9,2,1,2,1,NULL),(62,'2018-07-22',1,7,13,2,1,2,1,NULL),(63,'2018-07-22',1,2,4,2,1,2,1,NULL),(64,'2018-07-23',1,10,5,1,1,3,3,NULL),(65,'2018-07-23',1,8,1,2,1,2,1,NULL),(66,'2018-07-24',1,13,6,2,1,2,1,NULL),(67,'2018-07-24',1,7,14,2,1,2,1,NULL),(68,'2018-07-25',1,3,12,1,1,3,3,NULL),(69,'2018-07-25',1,2,8,1,1,3,3,NULL),(70,'2018-07-27',1,11,9,1,1,3,3,NULL),(71,'2018-07-27',1,4,13,2,1,2,1,NULL),(72,'2018-07-28',1,14,8,2,1,2,1,NULL),(73,'2018-07-28',1,2,7,2,1,2,1,NULL),(74,'2018-07-28',1,3,1,1,1,3,2,NULL),(75,'2018-07-29',1,6,11,2,1,2,1,NULL),(76,'2018-07-29',1,5,12,2,1,2,1,NULL),(77,'2018-07-29',1,4,10,2,1,2,1,NULL),(78,'2018-07-30',1,8,11,2,1,2,1,NULL),(79,'2018-07-30',1,2,9,2,1,2,1,NULL),(80,'2018-07-31',1,6,12,2,1,2,1,NULL),(81,'2018-07-31',1,3,14,1,1,3,2,NULL),(82,'2018-08-01',1,4,7,2,1,2,1,NULL),(83,'2018-08-01',1,10,9,2,1,2,1,NULL),(84,'2018-08-01',1,5,1,1,1,3,3,NULL),(85,'2018-08-02',1,2,1,2,1,2,1,NULL),(86,'2018-08-03',1,7,11,2,1,2,1,NULL),(87,'2018-08-03',1,8,13,1,1,3,2,NULL),(88,'2018-08-04',1,4,12,1,1,3,2,NULL),(89,'2018-08-04',1,10,6,1,1,3,3,NULL),(90,'2018-08-04',1,3,2,1,1,3,3,NULL),(91,'2018-08-05',1,13,9,1,1,3,2,NULL),(92,'2018-08-05',1,7,1,1,1,3,3,NULL),(93,'2018-08-05',1,5,14,2,1,2,1,NULL),(94,'2018-08-06',1,10,13,1,1,3,2,NULL),(95,'2018-08-06',1,11,14,2,1,2,1,NULL),(96,'2018-08-07',1,3,8,2,1,2,1,NULL),(97,'2018-08-07',1,6,4,2,1,2,1,NULL),(98,'2018-08-08',1,10,1,1,1,3,2,NULL),(99,'2018-08-08',1,14,13,1,1,3,2,NULL),(100,'2018-08-10',1,5,8,2,1,2,1,NULL),(101,'2018-08-10',1,4,9,1,1,3,2,NULL),(102,'2018-08-11',1,11,10,2,1,2,1,NULL),(103,'2018-08-11',1,1,13,2,1,2,1,NULL),(104,'2018-08-11',1,2,14,1,1,3,2,NULL),(105,'2018-08-12',1,7,9,2,1,2,1,NULL),(106,'2018-08-12',1,6,5,1,1,3,3,NULL),(107,'2018-08-12',1,3,4,2,1,2,1,NULL),(108,'2018-08-13',1,1,14,2,1,2,1,NULL),(109,'2018-08-13',1,13,11,2,1,2,1,NULL),(110,'2018-08-14',1,4,8,1,1,3,3,NULL),(111,'2018-08-14',1,6,7,2,1,2,1,NULL),(112,'2018-08-15',1,2,10,2,1,2,1,NULL),(113,'2018-08-17',1,5,9,2,1,2,1,NULL),(114,'2018-08-17',1,3,7,1,1,3,2,NULL),(115,'2018-08-18',1,11,12,2,1,2,1,NULL),(116,'2018-08-19',1,3,9,2,1,2,1,NULL),(117,'2018-08-19',1,12,14,1,1,3,3,NULL),(118,'2018-08-21',1,2,12,1,1,3,3,NULL),(119,'2018-08-21',1,8,6,1,1,3,3,NULL),(120,'2018-08-22',1,10,14,2,1,2,1,NULL),(121,'2018-08-24',1,6,9,2,1,2,1,NULL),(122,'2018-08-24',1,3,5,2,1,2,1,NULL),(123,'2018-08-25',1,7,8,2,1,2,1,NULL),(124,'2018-08-25',1,11,2,1,1,3,3,NULL),(125,'2018-08-25',1,10,12,1,1,3,2,NULL),(126,'2018-08-26',1,9,8,1,1,3,3,NULL),(127,'2018-08-26',1,3,6,1,1,3,2,NULL),(128,'2018-08-26',1,7,5,2,1,2,1,NULL),(129,'2018-09-01',1,1,11,1,1,3,3,NULL),(130,'2018-09-01',1,13,12,2,1,2,1,NULL),(131,'2018-09-02',1,1,12,1,1,3,2,NULL),(132,'2018-09-02',1,13,2,1,1,3,2,NULL),(133,'2018-09-02',1,4,5,1,1,3,2,NULL),(134,'2018-09-05',1,10,6,1,2,5,10,NULL),(135,'2018-09-06',1,5,11,2,2,4,5,NULL),(136,'2018-09-07',1,4,10,2,2,4,6,NULL),(138,'2018-09-08',1,5,1,2,2,4,5,NULL),(139,'2018-09-09',1,4,2,2,2,4,7,NULL),(140,'2018-09-10',1,3,5,1,2,5,9,NULL),(141,'2018-09-12',1,5,2,3,2,3,4,NULL),(142,'2018-09-14',1,4,3,1,2,5,8,NULL),(143,'2018-09-15',1,1,5,1,3,5,13,NULL),(144,'2018-09-16',1,1,2,2,3,4,7,NULL);

/*Table structure for table `match_list` */

CREATE TABLE `match_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '赛事列表',
  `name` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `searson_year` int(10) DEFAULT NULL,
  `searson_number` int(10) DEFAULT '2',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `match_list` */

insert  into `match_list`(`id`,`name`,`searson_year`,`searson_number`) values (1,'LPL2018夏季赛',2018,2);

/*Table structure for table `match_team` */

CREATE TABLE `match_team` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '赛事所有战队及分区情况',
  `match_id` int(11) DEFAULT '1' COMMENT 'match_list 表id',
  `team_id` int(11) DEFAULT NULL COMMENT 'team_list 表id',
  `team_area` int(11) DEFAULT '1' COMMENT 'area_list 表id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `match_team` */

insert  into `match_team`(`id`,`match_id`,`team_id`,`team_area`) values (1,1,1,2),(2,1,2,2),(3,1,3,1),(4,1,4,1),(5,1,5,1),(6,1,6,1),(7,1,7,1),(8,1,8,1),(9,1,9,1),(10,1,10,2),(11,1,11,2),(12,1,12,2),(13,1,13,2),(14,1,14,2);

/*Table structure for table `match_type` */

CREATE TABLE `match_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '赛事阶段',
  `match_id` int(11) DEFAULT NULL,
  `bo_number` int(2) DEFAULT NULL COMMENT 'BO 几?',
  `name` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '常规赛?季后赛?冒泡赛',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `match_type` */

insert  into `match_type`(`id`,`match_id`,`bo_number`,`name`) values (1,1,3,'常规赛'),(2,1,5,'季后赛'),(3,1,5,'S8冒泡赛');

/*Table structure for table `process_list` */

CREATE TABLE `process_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '比赛流程枚举',
  `process` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bo_number` int(2) DEFAULT NULL,
  `描述` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total` int(2) DEFAULT '3' COMMENT '局数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `process_list` */

insert  into `process_list`(`id`,`process`,`bo_number`,`描述`,`total`) values (1,'1-1',3,'直落两盘',2),(2,'0-1-1',3,'让一追二',3),(3,'1-0-1',3,'赢一丢一再赢一',3),(4,'1-1-1',5,'直落三盘',3),(5,'1-1-0-1',5,'赢二丢一再赢一',4),(6,'1-0-1-1',5,'赢一丢一再赢二',4),(7,'0-1-1-1',5,'让一追三',4),(8,'1-1-0-0-1',5,'赢二丢二再赢一',5),(9,'1-0-1-0-1',5,'赢一丢一赢一丢一再赢一',5),(10,'1-0-0-1-1',5,'赢一丢二再赢二',5),(11,'0-0-1-1-1',5,'让二追三',5),(12,'0-1-0-1-1',5,'丢一赢一丢一再赢二',5),(13,'0-1-1-0-1',5,'丢一追二丢一再赢一',5),(16,'1',1,'赢',1);

/*Table structure for table `team_list` */

CREATE TABLE `team_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '战队列表',
  `name` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `team_list` */

insert  into `team_list`(`id`,`name`) values (1,'EDG'),(2,'RW'),(3,'IG'),(4,'RNG'),(5,'JDG'),(6,'SNG'),(7,'LGD'),(8,'BLG'),(9,'VG'),(10,'TOP'),(11,'FPX'),(12,'SS'),(13,'WE'),(14,'OMG');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
