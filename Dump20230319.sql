-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: hmapp.c0eaujif5vqw.eu-central-1.rds.amazonaws.com    Database: hm
-- ------------------------------------------------------
-- Server version	8.0.28

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `isHouse` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `sort_number` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES ('39c39b37-88cc-4fa3-9364-48d76c500350','Side Costs','',1,'2022-04-24 20:44:59','2022-04-24 20:44:59',1),('600b72c2-16d3-4679-a6e9-b7961555c6b0','Renovation',NULL,1,'2022-05-22 20:40:12','2022-05-22 20:40:12',0),('9b404466-4839-41e4-a5d4-4b83b2613d69','House Costs','',1,'2022-04-24 20:40:01','2022-04-24 20:40:01',2),('ba729fd2-3f86-4615-85c7-f3644bee1cfa','General Costs','',0,'2022-04-24 20:40:12','2022-04-24 20:40:12',0),('d5t45fd2-3z98-5515-85c7-f3648ari1z96','Insurances',NULL,1,'2022-05-22 20:40:12','2022-05-22 20:40:12',3);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expenses`
--

DROP TABLE IF EXISTS `expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expenses` (
  `id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `date` date DEFAULT NULL,
  `firm` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `documentLink` varchar(255) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `isPaid` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `categoryId` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `objectId` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `object_idx` (`objectId`),
  KEY `category_idx` (`categoryId`),
  CONSTRAINT `category` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`),
  CONSTRAINT `object` FOREIGN KEY (`objectId`) REFERENCES `sub_objects` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenses`
--

LOCK TABLES `expenses` WRITE;
/*!40000 ALTER TABLE `expenses` DISABLE KEYS */;
INSERT INTO `expenses` VALUES ('0065b9de-67c9-4736-9f0c-250c3f4152c4','2022-04-12','Karsten Runge','Unterlagenscreening','https://www.dropbox.com/s/j82a5vuzb9066ue/12.04.2022%20-%20Karsten%20Runge.pdf?dl=0',1675.8,0,'2022-06-21 09:41:26','2022-08-20 17:01:36','ba729fd2-3f86-4615-85c7-f3644bee1cfa','80917245-bd61-4deb-a522-735a8ec8a545'),('01617795-d3ef-48af-b905-de384d5d9ef1','2022-07-22','Tdytex','Spannbettlaken','https://www.dropbox.com/s/cfkapjengt79f7a/22.07.2022%20-%20Tdytex.pdf?dl=0',22.99,1,'2022-09-10 15:10:28','2022-09-10 15:10:28','ba729fd2-3f86-4615-85c7-f3644bee1cfa','54ebfd1e-7411-4a01-8363-9b02698792ad'),('0223a226-96b3-402b-a194-9c777319bc93','2022-01-05','Casa39','Renovierungsmaterial','https://www.dropbox.com/s/ffn5m6buka6lycu/05.01.2022 - Casa39.pdf?dl=0',1813,1,'2022-06-21 10:37:01','2022-06-21 10:37:01','9b404466-4839-41e4-a5d4-4b83b2613d69','2a2a53c8-4044-4825-8a36-5511f0ecf410'),('05184b73-603f-4f57-87a7-5cfef6c8c381','2022-08-17','Maler Hauck','Malerarbeiten','https://www.dropbox.com/s/dyshjyhhqxm8h2p/17.08.2022%20-%20Maler%20Hauck.pdf?dl=0',904.4,1,'2022-09-17 17:38:11','2022-09-17 17:38:11','600b72c2-16d3-4679-a6e9-b7961555c6b0','2a2a53c8-4044-4825-8a36-5511f0ecf410'),('05c76e93-5b6e-4d3f-a0ee-19ea53e30410','2022-01-12','BMA Plankstadt','Grundsteuer Berliner Str. 1','https://www.dropbox.com/s/mgvhnslejrioltc/12.01.2022%20-%20BMA%20Plankstadt%281%29.pdf?dl=0',359.49,1,'2022-05-22 00:13:27','2022-05-22 00:13:27','ba729fd2-3f86-4615-85c7-f3644bee1cfa','54ebfd1e-7411-4a01-8363-9b02698792ad'),('0640b937-cd45-4933-a072-804bc77e6098','2022-06-01','A. Jelin','Montage Dusche/Badewanne','https://www.dropbox.com/s/8pshc9lqr0wnf6k/01.06.2022-A.Jelin.pdf?dl=0',434.47,1,'2022-11-19 19:41:53','2022-11-19 19:41:53','600b72c2-16d3-4679-a6e9-b7961555c6b0','2a2a53c8-4044-4825-8a36-5511f0ecf410'),('06dc0b2a-7ab0-4afb-b6f3-21a58f66c384','2022-10-13','A. Jelin','Austausch Heizungspumpe','https://www.dropbox.com/s/2cbnnkulxsjijbe/13.10.2022-A.Jelin.pdf?dl=0',1004.15,1,'2022-11-19 19:39:38','2022-11-19 19:39:38','39c39b37-88cc-4fa3-9364-48d76c500350','9c054022-d385-46a7-ac11-7177656eae85'),('0928d7e5-d7f8-4d85-bc35-7e0c129817c2','2022-07-28','Techem','Abrechnung 2021 Kosten','https://www.dropbox.com/s/gaw2hmdzkglidbx/28.07.2022%20-%20Techem%20Rechnung.pdf?dl=0',262.75,1,'2022-08-20 15:47:35','2022-10-23 12:27:47','39c39b37-88cc-4fa3-9364-48d76c500350','29179778-95e3-43f8-95d1-001d0865973d'),('09fb7791-11e6-4a51-b58c-725e82dc8a44','2022-03-21','Zimmergalerie','Holzrahmen','https://www.dropbox.com/s/ow4o7v5s9f369cw/21.03.2022 - Zimmergalerie.pdf?dl=0',747,1,'2022-06-21 09:57:32','2022-06-21 09:57:32','ba729fd2-3f86-4615-85c7-f3644bee1cfa','3d49341d-9139-4371-93cb-c8d905283cf1'),('0b067ef0-b3c9-4ee7-8b68-eae6ed453d66','2022-05-05','test','asdgasdgasd','asfouuhsadkjf',255,1,'2022-11-20 19:52:16','2022-11-20 19:52:16','9b404466-4839-41e4-a5d4-4b83b2613d69','41cffaec-d246-4f4c-b7bc-3468f0de8354'),('0bc18fab-1e78-4c0e-8afc-c52aec27ddbf','2022-07-06','A.Jelin','Endmontage','https://www.dropbox.com/s/sw7ay3pheacddyj/06.07.2022%20-%20A.Jelin.pdf?dl=0',1233.57,1,'2022-07-30 17:10:24','2022-07-30 17:10:24','600b72c2-16d3-4679-a6e9-b7961555c6b0','2a2a53c8-4044-4825-8a36-5511f0ecf410'),('10287057-136a-4764-b053-0b640fff2776','2022-03-03','32e','23423','423423',3423,1,'2022-11-20 19:54:56','2022-11-20 19:54:56','39c39b37-88cc-4fa3-9364-48d76c500350','3d49341d-9139-4371-93cb-c8d905283cf1'),('104b3f62-a50c-4f59-91be-37fde4f2ae59','2022-05-05','sdflkjasdflkjn','dsöfljasdnf','kljasnfaikjsn ',255,1,'2022-11-20 20:25:12','2022-11-20 20:25:12','39c39b37-88cc-4fa3-9364-48d76c500350','3d49341d-9139-4371-93cb-c8d905283cf1'),('1564550d-8fac-4976-9ab5-8ecefa50ff66','2022-11-10','UPS','Lieferung Gebühr','https://www.dropbox.com/s/9fj00xm3kwo2nxf/12.11.2022-UPS.pdf?dl=0',29.75,1,'2022-11-19 19:25:16','2022-11-19 19:25:16','ba729fd2-3f86-4615-85c7-f3644bee1cfa','54ebfd1e-7411-4a01-8363-9b02698792ad'),('1936885e-49d2-495a-b6c1-bc1b7ca1dc7f','2022-01-27','Sonono','WC Reparatur','https://www.dropbox.com/s/s8tbof7v2oyyqox/27.01.2022 - Sonono.pdf?dl=0',344.6,1,'2022-09-10 15:06:46','2022-09-10 15:06:46','ba729fd2-3f86-4615-85c7-f3644bee1cfa','54ebfd1e-7411-4a01-8363-9b02698792ad'),('1aac14f2-8fd2-49f2-b034-542d75eddab6','2022-03-30','A. Jelin','Renovierungsarbeiten','https://www.dropbox.com/s/8nlzhu0th0mkpgy/30.03.2022 - A.Jelin.pdf?dl=0',3444.09,1,'2022-06-21 10:40:11','2022-06-21 10:40:11','9b404466-4839-41e4-a5d4-4b83b2613d69','2a2a53c8-4044-4825-8a36-5511f0ecf410'),('1c60add5-1c56-4257-81aa-90fae7201d2a','2022-05-05','dfgsdfgsdfg','dsagdgfsd','gsdfgsdfg',255,1,'2022-11-20 20:06:52','2022-11-20 20:06:52','39c39b37-88cc-4fa3-9364-48d76c500350','3d49341d-9139-4371-93cb-c8d905283cf1'),('1d5bf797-b2a2-4b7c-9d30-85764f90b6e5','2022-03-03','Conrad','Smartes Heizverteiler','undefined',779.96,1,'2022-05-22 00:20:00','2022-06-13 19:46:22','ba729fd2-3f86-4615-85c7-f3644bee1cfa','54ebfd1e-7411-4a01-8363-9b02698792ad'),('1e68bd2a-aecc-4367-ab0c-dd9474803fc2','2022-01-05','Stadtwerke Schwetzingen','Wasser / Abwasser Kosten (12.2020 - 12.2021)','https://www.dropbox.com/s/y2q9oqga1ks97iq/05.01.2022%20-%20Stadtwerke%20Schwetzingen.pdf?dl=0',1205.09,1,'2022-08-20 16:45:12','2022-08-20 16:45:45','39c39b37-88cc-4fa3-9364-48d76c500350','2a2a53c8-4044-4825-8a36-5511f0ecf410'),('21430e21-8cbe-4918-8a2a-a409902e607f','2022-08-19','Roland Drkosch','Gartenpflege','https://www.dropbox.com/s/ofn2bhtforpfjzg/18.09.2022%20-%20Roland%20Drkosch.pdf?dl=0',481.36,1,'2022-10-23 13:06:49','2022-10-23 13:06:49','9b404466-4839-41e4-a5d4-4b83b2613d69','9c054022-d385-46a7-ac11-7177656eae85'),('234a17f4-e993-4594-b7e3-d7856f801a79','2022-12-31','Vodafone','Internet','https://www.dropbox.com/s/xoeyjvcd17pirae/UnityMedia_3.Floor.pdf?dl=0',699.4,1,'2022-05-28 14:13:55','2022-10-30 12:51:22','9b404466-4839-41e4-a5d4-4b83b2613d69','29179778-95e3-43f8-95d1-001d0865973d'),('24be282f-904d-4dae-8222-4e343009bd1d','2022-07-20','Total Energies','Öl Lieferung (Gaisbergstr.)','https://www.dropbox.com/s/zrbnq0yzfyn9am8/20.07.2022%20-%20Total.PDF?dl=0',4339.34,1,'2022-07-30 16:39:34','2022-10-23 13:48:21','39c39b37-88cc-4fa3-9364-48d76c500350','41cffaec-d246-4f4c-b7bc-3468f0de8354'),('2746e877-5d02-4244-86a5-676016946a92','2022-05-05','dsgsdfgsdfgsd','sdfasfdsda','asdfasdf',255,1,'2022-11-20 20:26:34','2022-11-20 20:26:34','39c39b37-88cc-4fa3-9364-48d76c500350','3d49341d-9139-4371-93cb-c8d905283cf1'),('27a6b2a8-ce1a-4413-ab6a-6907c267cb29','2022-11-17','Andreas Eller','Heizungswartung','https://www.dropbox.com/s/t9zovmwnm6tuqtg/17.11.2022-AndreasEller.pdf?dl=0',297.5,1,'2022-11-19 19:21:40','2022-11-19 19:21:40','39c39b37-88cc-4fa3-9364-48d76c500350','9c054022-d385-46a7-ac11-7177656eae85'),('2b7d9133-216d-482d-97e4-18bf172d60e1','2022-02-17','Maler Hauck','Malerarbeiten','https://www.dropbox.com/s/l0n4gg0zwdn64e9/17.02.2022%20-%20Maler%20Hauck.pdf?dl=0',683.3,1,'2022-05-22 00:26:39','2022-05-30 07:45:30','9b404466-4839-41e4-a5d4-4b83b2613d69','eb84d300-4ab3-459c-8848-55d192c8b0d2'),('30b93998-9a6c-4a32-96e2-88cf28a96e24','2022-03-16','Deubner & Kirchberg','Anwaltskosten','https://www.dropbox.com/s/xpwtk5nfontdl54/16.03.2022 - Deubner%26Kirchberg.pdf?dl=0',915.31,0,'2022-06-21 09:40:06','2022-08-20 17:01:43','ba729fd2-3f86-4615-85c7-f3644bee1cfa','80917245-bd61-4deb-a522-735a8ec8a545'),('3167aa22-d875-4cac-9f37-abd45c78ae5e','2022-02-01','Microsoft','Microsoft Office Yearly Subscription','https://www.dropbox.com/s/0ztgm4dyk6h674n/01.02.2022%20-%20Microsoft.pdf?dl=0',99,1,'2022-05-22 00:17:43','2022-05-22 00:17:43','ba729fd2-3f86-4615-85c7-f3644bee1cfa','54ebfd1e-7411-4a01-8363-9b02698792ad'),('32396145-d143-4945-bcec-d3da5a8429b3','2022-03-18','A Hauck KG','Öl Lieferung','https://www.dropbox.com/s/dc7yjldzyyv8aeg/18.03.2022 - AHauckKG.pdf?dl=0',1516.54,1,'2022-06-21 10:40:52','2022-06-21 10:40:52','39c39b37-88cc-4fa3-9364-48d76c500350','2a2a53c8-4044-4825-8a36-5511f0ecf410'),('32396f53-c7bc-4584-89e3-58c4bf5adb8e','2022-12-25','lkjnsdflkjnasf','sadgijhdsnglkajndg','adlksjnaksjdn',255,1,'2022-11-20 19:59:28','2022-11-20 19:59:28','39c39b37-88cc-4fa3-9364-48d76c500350','3d49341d-9139-4371-93cb-c8d905283cf1'),('33d78fbc-ab25-4358-9d0b-6468855ea6f7','2022-01-12','BMA Plankstadt','Grundsteuer Objekt 14 - 17','https://www.dropbox.com/s/100bwe3yf36g2lh/12.01.2022%20-%20BMA%20Plankstadt%283%29.pdf?dl=0',197.96,1,'2022-05-22 00:12:43','2022-05-22 00:12:43','ba729fd2-3f86-4615-85c7-f3644bee1cfa','54ebfd1e-7411-4a01-8363-9b02698792ad'),('33f56e5b-b863-4200-a8e7-df036feea7a6','2022-07-01','XXL Deals','Miele Einbau Kochmodule','https://www.dropbox.com/s/a9vuwc5dwoywygm/01.07.2022%20-%20XXLDeals.pdf?dl=0',390,1,'2022-08-20 18:14:57','2022-08-20 18:14:57','9b404466-4839-41e4-a5d4-4b83b2613d69','29179778-95e3-43f8-95d1-001d0865973d'),('347d009e-1835-4850-a34e-36a3e4e6320f','2022-08-23','Ikea','Möbel / Home Dekor','https://www.dropbox.com/s/gohfba2ylgum240/23.08.2022 - Ikea.pdf?dl=0',298,1,'2022-09-10 15:57:31','2022-09-10 15:57:31','9b404466-4839-41e4-a5d4-4b83b2613d69','bc9102ad-caa9-4cb5-9674-efcacf3411ce\n\n'),('377d57d0-bef6-4f6a-8c2a-b7da59ee6177','2022-12-31','Allianz','Öltank / AS-1455734223','',80.18,1,'2022-06-06 13:35:38','2022-06-06 13:35:38','d5t45fd2-3z98-5515-85c7-f3648ari1z96','41cffaec-d246-4f4c-b7bc-3468f0de8354'),('38110bc2-96de-47c8-9bb5-ebadd55610b8','2022-03-17','Sonono','Renovierung','https://www.dropbox.com/s/lf14vspk7x001vp/17.03.2022 - Sonono.pdf?dl=0',1995.67,1,'2022-06-21 10:38:47','2022-06-21 10:38:47','9b404466-4839-41e4-a5d4-4b83b2613d69','2a2a53c8-4044-4825-8a36-5511f0ecf410'),('3a38e7a9-38af-44e4-9a89-d8d2d9d8d784','2022-12-31','Allianz','Hausrat / AS-9466218628','',182.74,1,'2022-05-22 00:28:46','2022-05-22 00:28:46','d5t45fd2-3z98-5515-85c7-f3648ari1z96','eb84d300-4ab3-459c-8848-55d192c8b0d2'),('3b7502ff-4414-478d-b342-d0a86e2524cf','2022-05-16','Le Peintre','Neuanstrich der Wände','https://www.dropbox.com/s/iqee0wskqkhqxmw/16.05.2022%20-%20LePeintre.pdf?dl=0',1428,0,'2022-05-28 14:11:57','2022-06-11 00:13:47','9b404466-4839-41e4-a5d4-4b83b2613d69','29179778-95e3-43f8-95d1-001d0865973d'),('3e968638-be0c-4d55-893a-4168d33d35a4','2022-09-22','Schneider Hausverwaltung','Neue Schlüsseln','https://www.dropbox.com/s/euj6j7i428rgxx9/22.09.2022%20-%20SchneiderImmobilien.pdf?dl=0',200,1,'2022-10-22 16:42:28','2022-10-22 16:42:28','9b404466-4839-41e4-a5d4-4b83b2613d69','41cffaec-d246-4f4c-b7bc-3468f0de8354'),('3f7a282a-4c03-4fb4-a65c-c9e2b7eb71a6','2022-04-12','Minol','Wärmezähler Mieter','https://www.dropbox.com/s/ooyowsvbsukf7ry/12.04.2022 - Minol.pdf?dl=0',68.9,1,'2022-06-21 10:41:22','2022-06-21 10:41:22','39c39b37-88cc-4fa3-9364-48d76c500350','2a2a53c8-4044-4825-8a36-5511f0ecf410'),('3fb66f54-59c8-488f-b609-68d77a2b5856','2022-06-21','Dachdeckermeisterbetrieb','Dachfenster Wechsel','https://www.dropbox.com/s/l8z1pmkegn2g26z/21.06.2022%20-%20Dachdeckermeister.pdf?dl=0',3861.65,0,'2022-07-02 11:47:30','2022-07-02 11:47:30','ba729fd2-3f86-4615-85c7-f3644bee1cfa','54ebfd1e-7411-4a01-8363-9b02698792ad'),('401e27e4-7231-42eb-8ed7-d505819bbdf1','2022-03-08','Amazon','Thermostatkopf','https://www.dropbox.com/s/5etacec6j8blz9a/08.03.2022%20-%20Amazon.pdf?dl=0',24.99,1,'2022-09-10 15:00:50','2022-09-10 15:00:50','ba729fd2-3f86-4615-85c7-f3644bee1cfa','54ebfd1e-7411-4a01-8363-9b02698792ad'),('41ebeee4-3712-4c15-8942-bebeb401673b','2022-10-16','A. Jelin','Heizkörper','https://www.dropbox.com/s/c0p9wm9mptyc2fd/16.10.2022%20-%20A.Jelin.pdf?dl=0',960.33,1,'2022-11-19 19:44:07','2022-11-19 19:44:07','600b72c2-16d3-4679-a6e9-b7961555c6b0','29179778-95e3-43f8-95d1-001d0865973d'),('45dd4098-6435-4ccd-98ab-c69bcdd64199','2022-03-02','Roland Drkosch','Gartenpflege','https://www.dropbox.com/s/w3ammo9kzzh3sy4/02.03.2022 - RolandDrkosch.pdf?dl=0',1380.1,1,'2022-06-06 13:34:34','2022-07-01 22:50:18','9b404466-4839-41e4-a5d4-4b83b2613d69','41cffaec-d246-4f4c-b7bc-3468f0de8354'),('4a3b06dd-86d1-48f1-9c20-940cecc9ebd1','2022-06-30','Dennis Fehringer','Schornsteinfeger','https://www.dropbox.com/s/iy5kv58qmzd4cx1/30.06.2022%20-%20DennisFehringer.pdf?dl=0',81.37,0,'2022-08-20 16:31:21','2022-08-20 16:31:21','ba729fd2-3f86-4615-85c7-f3644bee1cfa','54ebfd1e-7411-4a01-8363-9b02698792ad'),('51f05aa6-bd52-463f-8405-b1c1ad612bb7','2022-09-27','A. Jelin','Kellergeschoss Sanierung','https://www.dropbox.com/s/xvp8k1h3d4du53k/27.09.2022-A.Jelin.pdf?dl=0',736.36,1,'2022-11-19 19:47:25','2022-11-19 19:47:25','600b72c2-16d3-4679-a6e9-b7961555c6b0','bc9102ad-caa9-4cb5-9674-efcacf3411ce\n\n'),('53bcdf41-a730-40fd-b96d-5e55cc6fdc42','2022-05-05','Test','test','test',250,1,'2022-11-20 19:15:17','2022-11-20 19:15:17','ba729fd2-3f86-4615-85c7-f3644bee1cfa','3d49341d-9139-4371-93cb-c8d905283cf1'),('5469e4dd-0e11-4b2a-a8f6-eff93bd8af8c','2022-01-12','BMA Plankstadt','Grundsteuer Objekt 1 ','https://www.dropbox.com/s/xn10ykgyyre1qlo/12.01.2022%20-%20BMA%20Plankstadt%282%29.pdf?dl=0',20.61,1,'2022-05-22 00:14:35','2022-05-22 00:14:35','ba729fd2-3f86-4615-85c7-f3644bee1cfa','54ebfd1e-7411-4a01-8363-9b02698792ad'),('552b95ef-20af-42c7-9ad7-226ded8ae629','2022-10-13','A. Jelin','Lieferung und Anfertigung Heizungsschutz','https://www.dropbox.com/s/2cbnnkulxsjijbe/13.10.2022-A.Jelin.pdf?dl=0',352.03,1,'2022-11-19 19:38:57','2022-11-19 19:38:57','39c39b37-88cc-4fa3-9364-48d76c500350','f3e82d5e-a664-49d2-a890-6a440247df1f'),('5a72fde0-f87b-47b3-ae51-58262b6e90df','2022-05-05','test vendor','test desc','sdölkjagkjn',255,1,'2022-11-20 21:15:00','2022-11-20 21:15:00','39c39b37-88cc-4fa3-9364-48d76c500350','3d49341d-9139-4371-93cb-c8d905283cf1'),('6222d4d1-4545-49f8-ad71-1b5e59fc00fb','2022-07-20','Meine Stadt Energie','Stromkosten (14.06.2021 - 30.06.2022)','https://www.dropbox.com/s/yijycnegd5dy4dr/20.07.2022%20-%20Meine%20Stadt%20Energie.pdf?dl=0',2182.33,1,'2022-07-30 17:29:10','2022-07-30 17:29:10','ba729fd2-3f86-4615-85c7-f3644bee1cfa','54ebfd1e-7411-4a01-8363-9b02698792ad'),('66437c0b-311b-4127-b548-fcf208d1474e','2022-05-05','alkdjnfasd','laksjfaspjkdn','ökjsandfönjsadf',255,1,'2022-11-20 20:20:45','2022-11-20 20:20:45','39c39b37-88cc-4fa3-9364-48d76c500350','3d49341d-9139-4371-93cb-c8d905283cf1'),('6eeba8e7-5e6b-4639-9aed-926c799c2723','2022-05-05','sdfasdfasdf','sadfasdf','safdasdf',255,1,'2022-11-20 21:16:36','2022-11-20 21:16:36','600b72c2-16d3-4679-a6e9-b7961555c6b0','e902001c-5ab8-4524-8235-eacc182110f9'),('714c667e-1360-4b08-88e5-e868134b96af','2022-02-25','Vollrath & Schwab','Anwaltkosten','https://www.dropbox.com/s/dgs93ue3kc9skgt/28.02.2022%20-%20Vollrath%20%26%20Schwab.pdf?dl=0',119,1,'2022-05-22 00:18:24','2022-05-29 22:30:27','ba729fd2-3f86-4615-85c7-f3644bee1cfa','54ebfd1e-7411-4a01-8363-9b02698792ad'),('71bc2c08-abcc-41e8-86c9-7de3a847e906','2022-12-31','UnityMedia','Internet','https://www.dropbox.com/s/t6csyxvg42rvfw8/UnityMedia_EG.pdf?dl=0',529.6,1,'2022-10-30 12:52:03','2022-10-30 12:52:03','9b404466-4839-41e4-a5d4-4b83b2613d69','eb84d300-4ab3-459c-8848-55d192c8b0d2'),('7452fb15-9261-4077-9a83-cf525c8dbb7d','2022-08-15','Fritz Wahr Energie','Öl Lieferung','https://www.dropbox.com/s/lvw2myu9e4vz4s0/15.08.2022%20-%20FritzWahrEnergie.pdf?dl=0',4311.13,1,'2022-08-28 12:25:06','2022-08-28 12:25:06','39c39b37-88cc-4fa3-9364-48d76c500350','2a2a53c8-4044-4825-8a36-5511f0ecf410'),('760f9e10-905b-45f9-a90f-f4cf2ef65a36','2022-06-29','Dining','Tisch Dekor','https://www.dropbox.com/s/520dgg1bqorex9b/29.06.2022%20-%20Dining.pdf?dl=0',18.88,1,'2022-09-10 14:54:19','2022-09-10 14:54:19','ba729fd2-3f86-4615-85c7-f3644bee1cfa','54ebfd1e-7411-4a01-8363-9b02698792ad'),('77783924-6f88-4770-9160-ab0727c7bf99','2022-11-17','Andreas Eller','Heizungswartung','https://www.dropbox.com/s/t9zovmwnm6tuqtg/17.11.2022-AndreasEller.pdf?dl=0',297.5,1,'2022-11-19 19:23:19','2022-11-19 19:23:19','39c39b37-88cc-4fa3-9364-48d76c500350','f3e82d5e-a664-49d2-a890-6a440247df1f'),('77dfaf40-3fbc-4592-8eb7-aae8a58cbf7d','2022-01-27','Genesis','Gartenpflege','https://www.dropbox.com/s/uerzl3ndeyy41nk/27.01.2022%20-%20Genesis.pdf?dl=0',169.08,1,'2022-05-22 00:17:07','2022-05-22 00:17:07','ba729fd2-3f86-4615-85c7-f3644bee1cfa','54ebfd1e-7411-4a01-8363-9b02698792ad'),('7908e8c5-afbb-4609-8223-eca7ee7884a4','2022-03-09','Sonono','Renovierung','https://www.dropbox.com/s/j4rc2umyv319dpo/09.03.2022 - Sonono.pdf?dl=0',1542.98,1,'2022-06-21 10:37:39','2022-06-21 10:37:39','9b404466-4839-41e4-a5d4-4b83b2613d69','2a2a53c8-4044-4825-8a36-5511f0ecf410'),('7f8ca7ee-288d-44f0-b770-0e8feecd1c83','2022-04-12','Dengler','Öl Lieferung','https://www.dropbox.com/s/5nm8pvwczn6irpr/12.04.2022 - Dengler.pdf?dl=0',2092.84,1,'2022-09-10 15:58:10','2022-09-10 15:58:10','39c39b37-88cc-4fa3-9364-48d76c500350','bc9102ad-caa9-4cb5-9674-efcacf3411ce\n\n'),('81c6a4a5-7e67-4770-abc9-b7d48dd9b33e','2022-05-05','dfgsdfgsdfg','dsagdgfsd','gsdfgsdfg',255,1,'2022-11-20 20:05:17','2022-11-20 20:05:17','39c39b37-88cc-4fa3-9364-48d76c500350','3d49341d-9139-4371-93cb-c8d905283cf1'),('82a8aac1-855e-4386-a45e-506011ae1cad','2022-01-18','Techem','Hausnebenkosten 2022','https://www.dropbox.com/s/1graqv13mf9kfkl/18.01.2022 - Techem.pdf?dl=0',18.45,1,'2022-06-06 13:32:42','2022-06-06 13:32:42','39c39b37-88cc-4fa3-9364-48d76c500350','41cffaec-d246-4f4c-b7bc-3468f0de8354'),('82d50754-295a-4a4c-803e-3763376e6d55','2022-02-11','Timo Foitzik','Abgasewegeprüfung','https://www.dropbox.com/s/iv6j8hal3njk9c0/11.02.2022 - Timo Foitzik.pdf?dl=0',93.69,1,'2022-06-06 13:33:29','2022-10-23 12:30:07','39c39b37-88cc-4fa3-9364-48d76c500350','41cffaec-d246-4f4c-b7bc-3468f0de8354'),('842ba84f-dd74-42a1-81e3-84b8b9a03349','2022-08-29','Amazon','Haus Dekor','https://www.dropbox.com/s/9lpbnweu3td1uky/29.08.2022%20-%20Amazon.pdf?dl=0',21.9,1,'2022-09-10 15:16:13','2022-09-10 15:16:13','ba729fd2-3f86-4615-85c7-f3644bee1cfa','54ebfd1e-7411-4a01-8363-9b02698792ad'),('846fe201-b1c2-4e31-bed8-8eb8ce818f00','2022-03-22','A.Jelin','Austausch Heizkörperventile','https://www.dropbox.com/s/pl4m5vouqrcph30/23.03.2022%20-%20A.Jelin.pdf?dl=0',118.88,0,'2022-07-30 17:13:09','2022-07-30 17:13:09','600b72c2-16d3-4679-a6e9-b7961555c6b0','2a2a53c8-4044-4825-8a36-5511f0ecf410'),('876e13ed-91ce-4683-bb12-88970973aa88','2022-05-05','dsgkjhdsfg','adsgadsfg','dagdafgdf',255,1,'2022-11-20 20:17:56','2022-11-20 20:17:56','39c39b37-88cc-4fa3-9364-48d76c500350','3d49341d-9139-4371-93cb-c8d905283cf1'),('8927f5ef-62e4-4d0b-b9c8-11cd8e053bbe','2022-07-19','Günter Schneider','Lieferung und Montage Miele Einbauherd','https://www.dropbox.com/s/n8wda250u62vjf5/19.07.2022%20-%20G%C3%BCnterSchneider.pdf?dl=0',499,1,'2022-08-20 16:55:51','2022-08-20 16:55:51','9b404466-4839-41e4-a5d4-4b83b2613d69','2b413205-580c-49fc-8064-eac9ca361a74'),('8fd5d27c-4bf1-4a3f-9cb0-371587164a7a','2022-05-16','Le Peintre','Ausbesserungsarbeiten an Wandfläschen','https://www.dropbox.com/s/iqee0wskqkhqxmw/16.05.2022%20-%20LePeintre.pdf?dl=0',1071,1,'2022-05-28 14:12:32','2022-06-11 00:36:51','9b404466-4839-41e4-a5d4-4b83b2613d69','29179778-95e3-43f8-95d1-001d0865973d'),('9288df4b-d1a2-497d-bc90-68552819549c','2022-03-14','Sonono','Renovierung','https://www.dropbox.com/s/va0y84bebnpochj/14.03.2022 - Sonono.pdf?dl=0',132.99,1,'2022-06-21 10:38:11','2022-06-21 10:38:11','9b404466-4839-41e4-a5d4-4b83b2613d69','2a2a53c8-4044-4825-8a36-5511f0ecf410'),('95fffc12-bbc2-4ac9-883c-ce4ac12bb445','2022-08-04','Börgeling','Schornsteinfeger','https://www.dropbox.com/s/gxkkoc2vwlmdhbe/04.08.2022%20-%20b%C3%B6rgeling.pdf?dl=0',75.24,1,'2022-09-10 16:05:46','2022-09-10 16:05:46','39c39b37-88cc-4fa3-9364-48d76c500350','2a2a53c8-4044-4825-8a36-5511f0ecf410'),('96c124d0-1053-440b-a998-60a91dfb1c76','2022-01-12','BMA Plankstadt','Grundsteuer','https://www.dropbox.com/s/8vziuu4quon4kr6/12.01.2022 - BMA Plankstadt%284%29.pdf?dl=0',462.88,1,'2022-09-10 16:01:38','2022-09-10 16:01:38','39c39b37-88cc-4fa3-9364-48d76c500350','bc9102ad-caa9-4cb5-9674-efcacf3411ce\n\n'),('9ff95575-5a06-457a-bdf0-a7c827b2e485','2022-12-31','IBS Technik','Alarm System','https://www.dropbox.com/s/qod6ncupnb5v5dh/IBS%20Technik.pdf?dl=0',324.32,1,'2022-05-22 00:27:37','2022-12-03 12:12:04','9b404466-4839-41e4-a5d4-4b83b2613d69','eb84d300-4ab3-459c-8848-55d192c8b0d2'),('a05f4fdf-fe9f-4add-b2d6-8d820db9616b','2022-04-01','Stadtwerke Schwetzingen','Wasser / Abwasser Kosten (03.2021 - 03.2022)','https://www.dropbox.com/s/zpgb7r78sbdaucf/01.04.2022%20-%20Stadtwerke%20Schwetzingen.pdf?dl=0',655.79,1,'2022-09-10 15:55:13','2022-09-10 15:55:13','39c39b37-88cc-4fa3-9364-48d76c500350','bc9102ad-caa9-4cb5-9674-efcacf3411ce\n\n'),('a2d1d416-596e-42ab-866d-01ba0bd0e2a4','2022-12-31','Allianz','Wohngebäude / AS-9462703582','',2583.97,1,'2022-06-06 13:36:09','2022-06-06 13:36:09','d5t45fd2-3z98-5515-85c7-f3648ari1z96','41cffaec-d246-4f4c-b7bc-3468f0de8354'),('a77406ab-cdf9-45d0-b63b-c6e73cec5503','2022-01-20','KOS Klima','Service Pauschale','https://www.dropbox.com/s/6u7y5f88agm40zq/20.01.2022%20-%20KosKlima.pdf?dl=0',250.7,1,'2022-05-22 00:15:25','2022-05-22 00:15:25','ba729fd2-3f86-4615-85c7-f3644bee1cfa','54ebfd1e-7411-4a01-8363-9b02698792ad'),('aa525cad-242b-4cda-9ff5-2275e8705ca1','2022-04-26','Marek Izydorczyk','Renovierungsarbeiten','https://www.dropbox.com/s/v33kktoia7ky8m8/26.04.2022 - Marek Izydorczyk.pdf?dl=0',8802.43,1,'2022-09-10 15:56:50','2022-09-10 15:56:50','600b72c2-16d3-4679-a6e9-b7961555c6b0','bc9102ad-caa9-4cb5-9674-efcacf3411ce\n\n'),('aea53e13-2dd7-487b-aa19-e8c7aa78ca5b','2022-05-05','sdfölnjsadf','dgadfg','dfgdgf',255,1,'2022-11-20 20:17:01','2022-11-20 20:17:01','39c39b37-88cc-4fa3-9364-48d76c500350','3d49341d-9139-4371-93cb-c8d905283cf1'),('b2b860a4-45ae-4197-abca-746d316ab0c1','2022-02-26','Neckar Protect','Ameisen Bekämpfung','https://www.dropbox.com/s/k5ve9dgpoe4hecs/26.02.2022%20-%20NeckarProtect.pdf?dl=0',354.62,1,'2022-05-22 00:19:07','2022-05-22 00:19:07','ba729fd2-3f86-4615-85c7-f3644bee1cfa','54ebfd1e-7411-4a01-8363-9b02698792ad'),('b2ce96c4-eaf5-48ed-8217-653790ec3d74','2022-06-28','A. Jelin','WC Reparatur Arbeiten','https://www.dropbox.com/s/4nxij6phylnli24/28.06.2022%20-%20A.Jelin.pdf?dl=0',225.37,1,'2022-12-03 12:17:33','2022-12-03 12:17:33','9b404466-4839-41e4-a5d4-4b83b2613d69','eb84d300-4ab3-459c-8848-55d192c8b0d2'),('b4f10c99-331a-4d59-b873-a08b73af5d5b','2022-05-05','hsadljnfasdlkjn','dgsdfgsdfg','jkngsdkfjngs',255,1,'2022-11-20 20:01:04','2022-11-20 20:01:04','39c39b37-88cc-4fa3-9364-48d76c500350','3d49341d-9139-4371-93cb-c8d905283cf1'),('b6fe4d42-63ab-4260-ace6-b82c5e11b151','2022-07-14','Maler Hauck','Malerarbeiten','https://www.dropbox.com/s/gjirghrevu8zmaq/14.07.2022%20-%20MalerHauck.pdf?dl=0',8806,1,'2022-07-30 17:24:26','2022-07-30 17:24:26','600b72c2-16d3-4679-a6e9-b7961555c6b0','2a2a53c8-4044-4825-8a36-5511f0ecf410'),('b994331e-6bee-489c-a0d4-49b6b989a086','2022-12-31','Allianz','Hausrat / AS-9466221017','',136.58,1,'2022-05-28 14:15:25','2022-06-05 20:51:53','d5t45fd2-3z98-5515-85c7-f3648ari1z96','29179778-95e3-43f8-95d1-001d0865973d'),('ba420d67-2f23-4365-b299-7d93393717fc','2022-12-31','Arag','Rechtschutz','',193.38,1,'2022-06-21 10:43:06','2022-06-21 10:43:06','d5t45fd2-3z98-5515-85c7-f3648ari1z96','2a2a53c8-4044-4825-8a36-5511f0ecf410'),('bac101fa-12c5-4288-a0f0-2f2d305879bc','2022-12-31','Allianz','Hausbesitzerhaftpflicht / AS-1455699506','',96.78,1,'2022-06-06 13:35:04','2022-06-06 13:35:04','d5t45fd2-3z98-5515-85c7-f3648ari1z96','41cffaec-d246-4f4c-b7bc-3468f0de8354'),('bdf6e519-b841-447e-9e09-69ff287ef8f0','2022-01-25','Nespresso','Kaffee Kosten','https://www.dropbox.com/s/8srikyv7ees3j31/25.01.2022%20-%20Nespresso.pdf?dl=0',89.92,1,'2022-05-22 00:16:30','2022-05-22 00:16:30','ba729fd2-3f86-4615-85c7-f3644bee1cfa','54ebfd1e-7411-4a01-8363-9b02698792ad'),('bf732cce-4f19-42ce-92b4-2f180530558a','2022-03-21','MP Gebäudeservice','Sanierungsarbeiten','https://www.dropbox.com/s/hiyx23b9o8ikxr9/21.03.2022 - MP.pdf?dl=0',5950,1,'2022-06-21 10:39:26','2022-06-21 10:39:26','9b404466-4839-41e4-a5d4-4b83b2613d69','2a2a53c8-4044-4825-8a36-5511f0ecf410'),('c1fd34c2-b26a-422c-943d-3a6c6866479c','2022-05-05','Test Vendor','sdfasfdasdfas','test Link',155.55,1,'2022-11-20 19:08:12','2022-11-20 19:08:12','600b72c2-16d3-4679-a6e9-b7961555c6b0','3d49341d-9139-4371-93cb-c8d905283cf1'),('c2d830dd-fbef-4743-ade7-04deec177979','2022-12-31','Telekom','Telefon Rechnungen (06202 5772028)','https://www.dropbox.com/s/9jpv4yh9lkbe0lk/Telekom - Berliner Str. %28062025772028%29.pdf?dl=0',433.07,1,'2022-06-21 09:51:58','2022-12-03 12:07:45','ba729fd2-3f86-4615-85c7-f3644bee1cfa','e902001c-5ab8-4524-8235-eacc182110f9'),('c949f963-58ff-4b7e-85be-ef6eb38a4b44','2022-12-31','Telekom','Carl\'s Handy','https://www.dropbox.com/s/yf3e5n4jl5x12d0/Telekom %28Carl%C2%B4s Handy%29.pdf?dl=0',611.93,1,'2022-06-21 09:56:04','2022-11-19 19:29:53','ba729fd2-3f86-4615-85c7-f3644bee1cfa','3d49341d-9139-4371-93cb-c8d905283cf1'),('ccb087c2-134c-476e-b71b-0eaecde8ef50','2022-12-25','hshsjskl','iljbnfalsknfmas','lskfjisajldf',150,1,'2022-11-20 19:58:16','2022-11-20 19:58:16','39c39b37-88cc-4fa3-9364-48d76c500350','3d49341d-9139-4371-93cb-c8d905283cf1'),('ce98b055-b4c3-4d90-8e86-19fe791f6f96','2022-05-05','dfgsdfgsdfg','dsagdgfsd','gsdfgsdfg',255,1,'2022-11-20 20:09:27','2022-11-20 20:09:27','39c39b37-88cc-4fa3-9364-48d76c500350','3d49341d-9139-4371-93cb-c8d905283cf1'),('d087f191-cf96-431b-9287-78c1113a0be4','2022-01-29','Tandem','Lagermiete für Kunstwerke','https://www.dropbox.com/s/9eu74e9tmgxq6ry/29.01.2022 - Tandem.pdf?dl=0',321.3,1,'2022-06-21 09:56:58','2022-06-21 09:56:58','ba729fd2-3f86-4615-85c7-f3644bee1cfa','3d49341d-9139-4371-93cb-c8d905283cf1'),('d523c857-9296-44f2-820b-af191f81d06c','2022-07-05','Udo Päärmann','Renovierungsarbeiten','https://www.dropbox.com/s/23i7nob42r6kwst/05.07.2022%20-%20Udo%20P%C3%A4%C3%A4rmann.pdf?dl=0',837.17,1,'2022-07-30 17:05:33','2022-07-30 17:05:33','600b72c2-16d3-4679-a6e9-b7961555c6b0','2a2a53c8-4044-4825-8a36-5511f0ecf410'),('d5420258-c8fd-461d-9288-1e81f55a3808','2022-07-21','Roth Klein Anwälte','Stadt Heidelberg Registrierung','https://www.dropbox.com/s/49tr2l0olgozqbb/21.07.2022%20-%20Rot%26Klein.pdf?dl=0',1119.79,1,'2022-09-17 17:33:34','2022-09-17 17:33:34','9b404466-4839-41e4-a5d4-4b83b2613d69','2b413205-580c-49fc-8064-eac9ca361a74'),('d676e1a1-d4ae-459e-bb08-5569c6948afe','2022-05-05','dfgsdfgsdfg','dsagdgfsd','gsdfgsdfg',255,1,'2022-11-20 20:04:47','2022-11-20 20:04:47','39c39b37-88cc-4fa3-9364-48d76c500350','3d49341d-9139-4371-93cb-c8d905283cf1'),('dbd8d9d6-82db-4757-a20d-dbe47f5ebf1f','2022-06-29','Dennis Fehringer','Schornsteinfeger','https://www.dropbox.com/s/228h666u5lsrge5/29.06.2022 - DennisFehringer.pdf?dl=0',90.58,1,'2022-09-10 15:58:51','2022-09-10 15:58:51','39c39b37-88cc-4fa3-9364-48d76c500350','bc9102ad-caa9-4cb5-9674-efcacf3411ce\n\n'),('e623e4bc-fb76-4859-96b9-fcc508ca1197','2022-01-21','Sonono','Bad Material','https://www.dropbox.com/s/909hiy31srt9pv4/21.01.2022 - Sonono.pdf?dl=0',868.45,1,'2022-09-10 15:59:37','2022-09-10 15:59:37','600b72c2-16d3-4679-a6e9-b7961555c6b0','bc9102ad-caa9-4cb5-9674-efcacf3411ce\n\n'),('e862900e-eb97-4d0a-8127-dbdadfee532f','2022-08-31','Rosenkern','Hausdekor','https://www.dropbox.com/s/8me1222nznlsnud/31.08.2022%20-%20Rosenkern.pdf?dl=0',16.97,1,'2022-09-10 15:18:17','2022-09-10 15:18:17','ba729fd2-3f86-4615-85c7-f3644bee1cfa','54ebfd1e-7411-4a01-8363-9b02698792ad'),('e884e170-50fe-40f2-9991-dd746cc67db9','2022-04-12','Dengler','Öl Lieferung','https://www.dropbox.com/s/5nm8pvwczn6irpr/12.04.2022%20-%20Dengler.pdf?dl=0',3130.88,1,'2022-05-22 00:20:31','2022-05-22 00:20:31','ba729fd2-3f86-4615-85c7-f3644bee1cfa','54ebfd1e-7411-4a01-8363-9b02698792ad'),('e8f955fa-9d15-499c-81d6-a9321880feff','2022-08-03','Vollrath & Schwab','Mieterhöhung','https://www.dropbox.com/s/ggoq9x6bazqc8ch/03.08.2022%20-%20Vollrath.pdf?dl=0',226.1,1,'2022-09-17 17:15:37','2022-09-17 17:15:37','9b404466-4839-41e4-a5d4-4b83b2613d69','2b413205-580c-49fc-8064-eac9ca361a74'),('eca77049-42fd-4649-a955-6f92c1aad928','2022-08-11','Ziplight','Lampe','https://www.dropbox.com/s/crac94hezg2w4wt/11.08.2022%20-%20Ziplight.pdf?dl=0',168.22,1,'2022-09-10 15:23:40','2022-09-10 15:23:40','ba729fd2-3f86-4615-85c7-f3644bee1cfa','54ebfd1e-7411-4a01-8363-9b02698792ad'),('ed72e0e0-790b-4b69-b09d-79fae370cdca','2022-05-05','dfgsdfgsdfg','dsagdgfsd','gsdfgsdfg',255,1,'2022-11-20 20:05:34','2022-11-20 20:05:34','39c39b37-88cc-4fa3-9364-48d76c500350','3d49341d-9139-4371-93cb-c8d905283cf1'),('f08fa6bb-fc28-4c1f-beed-5064f74c7553','2022-06-24','Rdytex','Spannbettlaken','https://www.dropbox.com/s/q08jbhvij111ksg/24.06.2022%20-%20Tdytex.pdf?dl=0',46.99,1,'2022-09-10 15:05:43','2022-09-10 15:05:43','ba729fd2-3f86-4615-85c7-f3644bee1cfa','54ebfd1e-7411-4a01-8363-9b02698792ad'),('f1907d75-d429-4221-a59d-cc1de1459ac9','2022-07-29','Genesis','Sanitär Arbeiten','https://www.dropbox.com/s/k68t24xvutmycgg/29.07.2022%20-%20Genesis.pdf?dl=0',188.91,1,'2022-09-10 15:36:21','2022-09-10 15:36:21','ba729fd2-3f86-4615-85c7-f3644bee1cfa','54ebfd1e-7411-4a01-8363-9b02698792ad'),('f3084cf2-f088-4fa2-8219-028174fa43aa','2022-12-31','Telekom','Telekom Rechnungen (06202 6059111)','https://www.dropbox.com/s/kwj3fhl727du4rg/Telekom - Berliner Str. %2806202 6059111%29.pdf?dl=0',549.12,1,'2022-06-21 09:52:39','2022-11-19 19:29:14','ba729fd2-3f86-4615-85c7-f3644bee1cfa','e902001c-5ab8-4524-8235-eacc182110f9'),('f87b6039-b574-46d4-886d-86c7d5dd8b99','2022-06-21','Kos Klima','Klima Wartung','https://www.dropbox.com/s/w22ablkdrtrdvnz/21.06.2022%20-%20KosKlima.pdf?dl=0',33.46,1,'2022-08-20 16:36:19','2022-08-20 16:36:19','ba729fd2-3f86-4615-85c7-f3644bee1cfa','54ebfd1e-7411-4a01-8363-9b02698792ad'),('f90ca20c-0be6-4133-a61e-a5e43425162d','2022-06-02','Gauweiler','Jalousien Reparatur','https://www.dropbox.com/s/aw0c8m2q7dsp9lj/02.06.2022%20-%20Gauweiler.pdf?dl=0',1029.4,0,'2022-06-21 10:35:14','2022-06-21 10:35:19','9b404466-4839-41e4-a5d4-4b83b2613d69','2a2a53c8-4044-4825-8a36-5511f0ecf410'),('f9aa1f8d-1272-4338-87f7-67883b24a33c','2022-01-20','Kos Klima','Splitklima Servicepauschale','https://www.dropbox.com/s/5jzmishdnpss1fs/20.01.2022%20-%20KosKlima.pdf?dl=0',750.29,1,'2022-05-28 14:14:42','2022-06-11 00:13:32','9b404466-4839-41e4-a5d4-4b83b2613d69','29179778-95e3-43f8-95d1-001d0865973d'),('faa4f5e2-e3b2-46d3-b718-3689e17e34c0','2022-12-31','Allianz','GSV 60/3700/7163935/120','',1121.51,1,'2022-06-21 10:42:39','2022-07-27 14:15:19','d5t45fd2-3z98-5515-85c7-f3648ari1z96','2a2a53c8-4044-4825-8a36-5511f0ecf410'),('fbded2df-48ad-4790-9746-4ccc0c20fbdf','2022-08-28','Amazon','Haus Dekor','https://www.dropbox.com/s/axr77bzrco8oyqv/28.08.2022%20-%20Amazon.pdf?dl=0',88.83,1,'2022-09-10 15:13:49','2022-09-10 15:13:49','ba729fd2-3f86-4615-85c7-f3644bee1cfa','54ebfd1e-7411-4a01-8363-9b02698792ad'),('fe811051-d1e3-4a5b-a36f-24877950a191','2022-11-28','Vattenfall','Strom 2022','https://www.dropbox.com/s/o45owyh26qldsvn/28.11.2022%20-%20Vattenfall.pdf?dl=0',1375.43,1,'2022-12-03 12:04:16','2022-12-03 12:04:16','39c39b37-88cc-4fa3-9364-48d76c500350','eb84d300-4ab3-459c-8848-55d192c8b0d2'),('ff619f70-fa5e-4d39-928e-37f7bd6fa709','2022-07-05','Sidorenko','KüchenMaterial','https://www.dropbox.com/s/2aposksk2vq36xh/05.07.2022%20-%20Sidorenko.pdf?dl=0',19.99,1,'2022-09-10 14:57:57','2022-09-10 14:57:57','ba729fd2-3f86-4615-85c7-f3644bee1cfa','54ebfd1e-7411-4a01-8363-9b02698792ad');
/*!40000 ALTER TABLE `expenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `insurances`
--

DROP TABLE IF EXISTS `insurances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `insurances` (
  `id` varchar(45) NOT NULL,
  `insurance_name` varchar(255) NOT NULL,
  `insurance_vendor` varchar(255) NOT NULL,
  `insurance_number` varchar(255) NOT NULL,
  `insurance_object` varchar(45) NOT NULL,
  `yearly_amount` varchar(255) DEFAULT '0',
  `contract_end_date` date DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `payment_type` varchar(45) NOT NULL DEFAULT 'automatic',
  `insurance_paper_link` varchar(255) DEFAULT NULL,
  `monthly_amount` varchar(45) DEFAULT '0',
  `is_cancelled` tinyint DEFAULT '0',
  `cancellation_date` date DEFAULT NULL,
  `contract_renewal` tinyint DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  `contract_start_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insurances`
--

LOCK TABLES `insurances` WRITE;
/*!40000 ALTER TABLE `insurances` DISABLE KEYS */;
INSERT INTO `insurances` VALUES ('5bd755d0-f4fc-4c94-b3a9-a30a0f670c52','test insurance','allianz','ttttest','3d49341d-9139-4371-93cb-c8d905283cf1','600','2022-12-12','gsdfgsdfgsdfg','auto','dgfsdghd','50',0,NULL,127,'2022-12-04','2022-12-04','2022-01-01');
/*!40000 ALTER TABLE `insurances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oil_status`
--

DROP TABLE IF EXISTS `oil_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oil_status` (
  `id` varchar(45) NOT NULL,
  `status` int DEFAULT '0',
  `type` varchar(45) NOT NULL,
  `date` date DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `pricePerUnit` float DEFAULT '0',
  `object` varchar(45) NOT NULL,
  `deliveryTotal` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oil_status`
--

LOCK TABLES `oil_status` WRITE;
/*!40000 ALTER TABLE `oil_status` DISABLE KEYS */;
INSERT INTO `oil_status` VALUES ('004cb638-6333-47ef-820b-44f36694267e\n\n',3839,'read','2020-07-04','2022-07-30 17:29:10','2022-07-30 17:29:10',0,'41cffaec-d246-4f4c-b7bc-3468f0de8354',0),('028057cf-14d2-48ad-8245-438abcd52466\n\n',0,'buy','2021-09-28','2022-07-30 17:29:10','2022-07-30 17:29:10',59,'41cffaec-d246-4f4c-b7bc-3468f0de8354',6000),('35d30a25-e217-40df-951b-b2d00ecf62d2\n\n',5431,'buy','2018-09-03','2022-07-30 17:29:10','2022-07-30 17:29:10',61,'41cffaec-d246-4f4c-b7bc-3468f0de8354',3000),('6eb1cccd-eb64-47a9-8b82-14da83323d47\n\n',8500,'read','2020-12-31','2022-07-30 17:29:10','2022-07-30 17:29:10',0,'41cffaec-d246-4f4c-b7bc-3468f0de8354',0),('8ef4f60a-f649-4887-aea2-68f7dc8214f4\n\n',2715,'read','2019-03-20','2022-07-30 17:29:10','2022-07-30 17:29:10',0,'41cffaec-d246-4f4c-b7bc-3468f0de8354',0),('9c368fa7-1566-4246-a295-c3d0490c5787\n\n',6648,'read','2020-12-12','2022-07-30 17:29:10','2022-07-30 17:29:10',0,'41cffaec-d246-4f4c-b7bc-3468f0de8354',0),('c6993aaf-4dab-499b-99f6-6a7a6f38ce08\n\n',3652,'read','2019-02-13','2022-07-30 17:29:10','2022-07-30 17:29:10',0,'41cffaec-d246-4f4c-b7bc-3468f0de8354',0),('c75c4658-bdbf-4b64-b329-8c86e44a7114\n\n',4963,'buy','2019-10-29','2022-07-30 17:29:10','2022-07-30 17:29:10',57,'41cffaec-d246-4f4c-b7bc-3468f0de8354',3000),('c8b3dc50-3be9-42a5-9731-903495d5d436\n\n',3558,'buy','2019-04-01','2022-07-30 17:29:10','2022-07-30 17:29:10',59,'41cffaec-d246-4f4c-b7bc-3468f0de8354',1000),('ceb08a25-f65f-4e4a-b2aa-f01d60b1cf63\n\n',3464,'read','2019-12-15','2022-07-30 17:29:10','2022-07-30 17:29:10',0,'41cffaec-d246-4f4c-b7bc-3468f0de8354',0);
/*!40000 ALTER TABLE `oil_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parent_objects`
--

DROP TABLE IF EXISTS `parent_objects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parent_objects` (
  `id` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `adress` varchar(255) DEFAULT NULL,
  `sort_number` varchar(45) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parent_objects`
--

LOCK TABLES `parent_objects` WRITE;
/*!40000 ALTER TABLE `parent_objects` DISABLE KEYS */;
INSERT INTO `parent_objects` VALUES ('0f8b5ca6-ceb1-496a-8ae1-52457b9ab4ff','Gaisbergstr.',NULL,'1'),('90ea99d3-d242-46d3-8d2e-681d060e062b','Oftersheim','Dreieichenweg 8, 68723 Oftersheim','2'),('ed42b1a6-9d97-42a7-89f4-ceaf8d08293c','Berliner Str.','Berliner Str. 1, 68723 Plankstadt','0');
/*!40000 ALTER TABLE `parent_objects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_objects`
--

DROP TABLE IF EXISTS `sub_objects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_objects` (
  `id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `route` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `isHouse` tinyint(1) DEFAULT NULL,
  `isMenu` tinyint(1) DEFAULT NULL,
  `sort_number` int NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `parent_object` varchar(45) DEFAULT NULL,
  `hasOilTank` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `route` (`route`),
  UNIQUE KEY `route_2` (`route`),
  UNIQUE KEY `route_3` (`route`),
  KEY `parent_idx` (`parent_object`),
  CONSTRAINT `parent` FOREIGN KEY (`parent_object`) REFERENCES `parent_objects` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_objects`
--

LOCK TABLES `sub_objects` WRITE;
/*!40000 ALTER TABLE `sub_objects` DISABLE KEYS */;
INSERT INTO `sub_objects` VALUES ('29179778-95e3-43f8-95d1-001d0865973d','Gaisbergstr. DG','gaisbergstr__dg','','Gaisbergstr. 87, 69115 Heidelberg',1,1,3,'2022-04-15 14:40:43','2022-04-15 14:40:43','0f8b5ca6-ceb1-496a-8ae1-52457b9ab4ff',0),('2a2a53c8-4044-4825-8a36-5511f0ecf410','Oftersheim Gebäude','oftersheim_gebaeude','','Dreieichenweg 8, 68723 Oftersheim',1,1,4,'2022-06-03 21:55:20','2022-06-03 21:55:20','90ea99d3-d242-46d3-8d2e-681d060e062b',1),('2b413205-580c-49fc-8064-eac9ca361a74','Gaisbergstr. 1. Fl.','gaisbergstr_1_fl','','Gaisbergstr. 87, 69115 Heidelberg',1,1,2,'2022-06-03 21:54:20','2022-06-03 21:54:20','0f8b5ca6-ceb1-496a-8ae1-52457b9ab4ff',0),('3d49341d-9139-4371-93cb-c8d905283cf1','Carl','carl','','Berliner Str. 1',0,1,0,'2022-06-21 09:53:57','2022-06-21 09:53:57','ed42b1a6-9d97-42a7-89f4-ceaf8d08293c',0),('41cffaec-d246-4f4c-b7bc-3468f0de8354','Gaisbergstr. Gebäude','gaisbergstr_gebaeude','','Gaisbergstr. 87, 69115 Heidelberg',1,1,0,'2022-06-03 21:47:20','2022-06-03 21:47:20','0f8b5ca6-ceb1-496a-8ae1-52457b9ab4ff',1),('54ebfd1e-7411-4a01-8363-9b02698792ad','Verwaltung','verwaltungs_aufwendungen','Verwaltung',NULL,0,1,1,'2022-04-24 20:26:03','2022-04-24 20:26:03','ed42b1a6-9d97-42a7-89f4-ceaf8d08293c',1),('80917245-bd61-4deb-a522-735a8ec8a545','Bürger Init.','b_rger_init_','','Berliner Str. 1',0,1,3,'2022-06-21 09:38:18','2022-06-21 09:38:18','ed42b1a6-9d97-42a7-89f4-ceaf8d08293c',0),('9c054022-d385-46a7-ac11-7177656eae85','Zehnstr. 32','zehnstr_32',NULL,'Zehnstr. 32',1,1,2,'2022-04-24 20:26:31','2022-04-24 20:26:31',NULL,0),('bc9102ad-caa9-4cb5-9674-efcacf3411ce\n\n','Josefleuchaus','josefleuchaus',NULL,'Josefleuchaus 6',1,1,1,'2022-06-21 09:53:57','2022-06-21 09:53:57',NULL,1),('e22d901d-b4f5-4919-a335-57d3a5040eac','Hürkan Exp.','hurkan_expenses',NULL,NULL,0,1,4,'2022-06-21 09:53:57','2022-06-21 09:53:57',NULL,0),('e902001c-5ab8-4524-8235-eacc182110f9','Praxis','praxis','','Berliner Str. 1, 68723 Plankstadt',0,1,2,'2022-06-03 21:54:38','2022-06-03 21:54:38','ed42b1a6-9d97-42a7-89f4-ceaf8d08293c',0),('eb84d300-4ab3-459c-8848-55d192c8b0d2','Gaisbergstr. EG','gaisbergstr__eg','','Gaisbergstr. 87, 69115 Heidelberg',1,1,1,'2022-04-24 20:26:31','2022-04-24 20:26:31','0f8b5ca6-ceb1-496a-8ae1-52457b9ab4ff',0),('f3e82d5e-a664-49d2-a890-6a440247df1f','Zehnstr. 34','zehnstr_34',NULL,'Zehnstr. 34',1,1,3,'2022-04-24 20:26:31','2022-04-24 20:26:31',NULL,0);
/*!40000 ALTER TABLE `sub_objects` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-19 22:04:47
