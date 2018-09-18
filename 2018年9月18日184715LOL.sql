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
  `match_id` int(11) DEFAULT '1' COMMENT '赛事id',
  `winner_team_id` int(11) DEFAULT '1' COMMENT '获胜方id',
  `loser_team_id` int(11) DEFAULT '1' COMMENT '失败方id',
  `winner_team_score` int(2) DEFAULT '1' COMMENT '胜利方赢得比分数',
  `loser_team_score` int(2) DEFAULT '0' COMMENT '失败方赢得比分数',
  `home_team_id` int(11) DEFAULT NULL COMMENT '主场战队id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `game_list` */

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
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '比赛的类型BO几?',
  `match_id` int(11) DEFAULT NULL,
  `bo_number` int(2) DEFAULT NULL COMMENT 'BO 几?',
  `name` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '常规赛?季后赛?冒泡赛',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `match_type` */

insert  into `match_type`(`id`,`match_id`,`bo_number`,`name`) values (1,1,3,'常规赛'),(2,1,5,'季后赛'),(3,1,5,'S8冒泡赛');

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
