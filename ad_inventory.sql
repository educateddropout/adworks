/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80013
Source Host           : localhost:3306
Source Database       : ad_inventory

Target Server Type    : MYSQL
Target Server Version : 80013
File Encoding         : 65001

Date: 2020-09-19 12:47:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for lib_month
-- ----------------------------
DROP TABLE IF EXISTS `lib_month`;
CREATE TABLE `lib_month` (
  `id` tinyint(2) DEFAULT NULL,
  `name` varchar(30) DEFAULT NULL,
  `id1` tinyint(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of lib_month
-- ----------------------------
INSERT INTO `lib_month` VALUES ('1', 'January', '12');
INSERT INTO `lib_month` VALUES ('2', 'February', '11');
INSERT INTO `lib_month` VALUES ('3', 'March', '10');
INSERT INTO `lib_month` VALUES ('4', 'April', '9');
INSERT INTO `lib_month` VALUES ('5', 'May', '8');
INSERT INTO `lib_month` VALUES ('6', 'June', '7');
INSERT INTO `lib_month` VALUES ('7', 'July', '6');
INSERT INTO `lib_month` VALUES ('8', 'August', '5');
INSERT INTO `lib_month` VALUES ('9', 'September', '4');
INSERT INTO `lib_month` VALUES ('10', 'October', '3');
INSERT INTO `lib_month` VALUES ('11', 'November', '2');
INSERT INTO `lib_month` VALUES ('12', 'December', '1');

-- ----------------------------
-- Table structure for lib_product_type
-- ----------------------------
DROP TABLE IF EXISTS `lib_product_type`;
CREATE TABLE `lib_product_type` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `description` varchar(40) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `last_modified` datetime DEFAULT NULL,
  `last_modified_by` varchar(36) DEFAULT NULL,
  `archive` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=ascii;

-- ----------------------------
-- Records of lib_product_type
-- ----------------------------
INSERT INTO `lib_product_type` VALUES ('1', 'DENTAL SUPPLIES', null, null, '0');
INSERT INTO `lib_product_type` VALUES ('2', 'EQUIPMENTS', null, null, '0');
INSERT INTO `lib_product_type` VALUES ('3', 'CLEANING SUPPLIES', null, null, '0');
INSERT INTO `lib_product_type` VALUES ('4', 'OFFICE SUPPLIES', null, null, '0');
INSERT INTO `lib_product_type` VALUES ('5', 'OTHERS', '2020-09-10 17:15:23', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `lib_product_type` VALUES ('6', '', '2020-09-10 17:31:11', '218ae7db-cd4f-4cc5-84d8-88438714725d', '1');
INSERT INTO `lib_product_type` VALUES ('7', '', '2020-09-10 17:31:07', '218ae7db-cd4f-4cc5-84d8-88438714725d', '1');
INSERT INTO `lib_product_type` VALUES ('8', '', '2020-09-10 17:31:04', '218ae7db-cd4f-4cc5-84d8-88438714725d', '1');
INSERT INTO `lib_product_type` VALUES ('9', '', '2020-09-10 17:31:05', '218ae7db-cd4f-4cc5-84d8-88438714725d', '1');
INSERT INTO `lib_product_type` VALUES ('10', '', '2020-09-10 17:31:08', '218ae7db-cd4f-4cc5-84d8-88438714725d', '1');
INSERT INTO `lib_product_type` VALUES ('11', '', '2020-09-10 17:31:09', '218ae7db-cd4f-4cc5-84d8-88438714725d', '1');
INSERT INTO `lib_product_type` VALUES ('12', '', '2020-09-10 17:31:10', '218ae7db-cd4f-4cc5-84d8-88438714725d', '1');
INSERT INTO `lib_product_type` VALUES ('13', '', '2020-09-10 17:40:02', '218ae7db-cd4f-4cc5-84d8-88438714725d', '1');
INSERT INTO `lib_product_type` VALUES ('14', '', '2020-09-10 17:40:05', '218ae7db-cd4f-4cc5-84d8-88438714725d', '1');
INSERT INTO `lib_product_type` VALUES ('15', '', '2020-09-10 17:40:07', '218ae7db-cd4f-4cc5-84d8-88438714725d', '1');
INSERT INTO `lib_product_type` VALUES ('16', '', '2020-09-10 17:40:08', '218ae7db-cd4f-4cc5-84d8-88438714725d', '1');
INSERT INTO `lib_product_type` VALUES ('17', '', '2020-09-10 17:40:09', '218ae7db-cd4f-4cc5-84d8-88438714725d', '1');
INSERT INTO `lib_product_type` VALUES ('18', 'OTHERSS', '2020-09-10 17:42:24', '218ae7db-cd4f-4cc5-84d8-88438714725d', '1');
INSERT INTO `lib_product_type` VALUES ('19', 'asdasdasd', '2020-09-10 17:42:13', '218ae7db-cd4f-4cc5-84d8-88438714725d', '1');
INSERT INTO `lib_product_type` VALUES ('20', 'ASDASDAS', '2020-09-10 17:42:22', '218ae7db-cd4f-4cc5-84d8-88438714725d', '1');
INSERT INTO `lib_product_type` VALUES ('21', 'SAMPLE', '2020-09-19 12:30:31', '218ae7db-cd4f-4cc5-84d8-88438714725d', '1');

-- ----------------------------
-- Table structure for lib_transaction
-- ----------------------------
DROP TABLE IF EXISTS `lib_transaction`;
CREATE TABLE `lib_transaction` (
  `id` char(1) NOT NULL,
  `description` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=ascii;

-- ----------------------------
-- Records of lib_transaction
-- ----------------------------
INSERT INTO `lib_transaction` VALUES ('I', 'INCOMING');
INSERT INTO `lib_transaction` VALUES ('O', 'OUTGOING');

-- ----------------------------
-- Table structure for lib_unit
-- ----------------------------
DROP TABLE IF EXISTS `lib_unit`;
CREATE TABLE `lib_unit` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `last_modified` datetime DEFAULT NULL,
  `last_modified_by` varchar(36) DEFAULT NULL,
  `archive` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of lib_unit
-- ----------------------------
INSERT INTO `lib_unit` VALUES ('1', 'PCS', null, null, '0');
INSERT INTO `lib_unit` VALUES ('2', 'PACK', null, null, '0');
INSERT INTO `lib_unit` VALUES ('3', 'BOX', null, null, '0');
INSERT INTO `lib_unit` VALUES ('4', 'ASDASDASD', '2020-09-11 09:34:45', '218ae7db-cd4f-4cc5-84d8-88438714725d', '1');
INSERT INTO `lib_unit` VALUES ('5', 'BY TWOS', '2020-09-19 12:30:12', '218ae7db-cd4f-4cc5-84d8-88438714725d', '1');

-- ----------------------------
-- Table structure for tbl_branch
-- ----------------------------
DROP TABLE IF EXISTS `tbl_branch`;
CREATE TABLE `tbl_branch` (
  `branch_id` char(1) NOT NULL,
  `branch_name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`branch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of tbl_branch
-- ----------------------------
INSERT INTO `tbl_branch` VALUES ('K', 'KAMUNING');
INSERT INTO `tbl_branch` VALUES ('M', 'MAKATI');

-- ----------------------------
-- Table structure for tbl_products
-- ----------------------------
DROP TABLE IF EXISTS `tbl_products`;
CREATE TABLE `tbl_products` (
  `product_id` varchar(36) NOT NULL,
  `product_barcode_number` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `supplier_id` varchar(36) NOT NULL,
  `name` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` text,
  `unit` tinyint(2) NOT NULL,
  `product_type` tinyint(1) NOT NULL,
  `quantity` int(11) NOT NULL,
  `current_price` float(10,2) DEFAULT NULL,
  `date_added` datetime DEFAULT NULL,
  `last_modified` datetime NOT NULL,
  `last_modified_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `archive` tinyint(1) NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of tbl_products
-- ----------------------------
INSERT INTO `tbl_products` VALUES ('01d6d2bb-94e3-45ce-9e63-5a2f284b85b6', null, '721ace3f-7a0a-408b-b125-3733a6aecf28', 'CHLORINE 2X', null, '1', '1', '9', '35.00', '2020-09-19 12:31:47', '2020-09-19 12:31:47', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products` VALUES ('05bff015-3ce4-4fae-8a4d-58b146b45f12', null, '721ace3f-7a0a-408b-b125-3733a6aecf28', 'PARACORE (DUAL CORING CORE @ RESIN CEMENT)', null, '1', '1', '0', '820.00', '2020-08-16 23:54:13', '2020-08-16 23:54:13', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products` VALUES ('2ac08f37-fa5e-4df6-b16d-05b2ff835384', null, '721ace3f-7a0a-408b-b125-3733a6aecf28', 'GLOVES - S', null, '3', '1', '0', '350.00', '2020-08-02 16:08:00', '2020-08-02 16:08:00', '111111', '0');
INSERT INTO `tbl_products` VALUES ('373e3c30-d5c6-407f-befe-3506543ac57d', null, '8f9ed086-e8e3-4e9f-99e4-836208ae711b', 'GLOVES - XS', null, '3', '1', '62', '100.00', '2020-08-02 16:09:13', '2020-08-02 16:09:13', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products` VALUES ('3956be1f-966b-4a2e-a4c6-cabe816e4a09', null, '721ace3f-7a0a-408b-b125-3733a6aecf28', 'BLADE HOLDER', null, '1', '2', '15', '200.00', '2020-08-16 23:52:45', '2020-08-16 23:52:45', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products` VALUES ('45e3ac31-2432-4374-ac51-47f0a9c3fe69', null, '721ace3f-7a0a-408b-b125-3733a6aecf28', 'ASDSAD', null, '1', '1', '2', '1.00', '2020-09-10 16:28:49', '2020-09-10 16:28:49', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products` VALUES ('4ff7590d-4d6d-4ffb-a0b1-d5776f9992b8', null, '721ace3f-7a0a-408b-b125-3733a6aecf28', 'TESTING', null, '2', '1', '0', '14.00', '2020-09-10 16:29:09', '2020-09-10 16:42:48', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products` VALUES ('6fda8008-efd3-4109-8c28-597eb52bd651', null, '-1', '', null, '-1', '-1', '0', '0.00', '2020-09-10 16:15:30', '2020-09-10 16:15:30', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products` VALUES ('7071a1c7-9b86-4f5c-abea-da0f9947f43b', null, '721ace3f-7a0a-408b-b125-3733a6aecf28', 'GLUTA PERCHA POINTS #20', null, '1', '1', '86', '200.00', '2020-08-16 23:53:44', '2020-08-16 23:53:44', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products` VALUES ('a557f45a-c218-480b-8458-ea17f4b59449', null, '8f9ed086-e8e3-4e9f-99e4-836208ae711b', 'HAND SOAP', null, '3', '3', '44', '20.00', '2020-08-16 23:51:54', '2020-08-16 23:51:54', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products` VALUES ('ab7c154a-af34-4d12-9c7d-d565eb5018eb', null, '8f9ed086-e8e3-4e9f-99e4-836208ae711b', 'BALLPEN', null, '3', '4', '19', '568.00', '2020-08-16 23:53:12', '2020-08-16 23:53:12', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products` VALUES ('acaf9f00-34ed-4ca9-ad3c-1a2c45e08c5a', null, '8f9ed086-e8e3-4e9f-99e4-836208ae711b', 'PAPER BOND', null, '3', '4', '42', '213.00', '2020-08-16 23:58:46', '2020-08-16 23:58:46', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products` VALUES ('b519ed64-0d85-45b9-8e3c-0b2c130c0a2e', null, 'e0a89eb6-ed12-4b69-b8d2-13a338dc681c', 'ASDASD', null, '2', '2', '0', '12.00', '2020-09-10 17:41:00', '2020-09-10 17:41:00', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products` VALUES ('bca9ab34-0478-4b14-afd8-bf6acd352394', null, '721ace3f-7a0a-408b-b125-3733a6aecf28', 'SAMPLE', null, '1', '5', '10', '1.00', '2020-08-15 12:59:54', '2020-08-15 12:59:54', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products` VALUES ('bdd767b2-a58a-45aa-a182-5eeb31372fb5', null, '721ace3f-7a0a-408b-b125-3733a6aecf28', 'CHLORINE', null, '1', '3', '190', '3000.00', '2020-08-17 00:00:34', '2020-08-17 00:00:34', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products` VALUES ('c1f6c7e1-98ea-42c0-98d4-a76895cffb35', null, '8f9ed086-e8e3-4e9f-99e4-836208ae711b', 'BRACE', null, '2', '1', '5', '3.00', '2020-08-25 13:44:45', '2020-08-25 13:44:45', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products` VALUES ('c3294c04-7626-421a-a17e-38d692f2cd55', null, '721ace3f-7a0a-408b-b125-3733a6aecf28', 'GLOVES - M', null, '3', '1', '1972', '370.00', '2020-08-02 16:07:24', '2020-08-02 16:07:24', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products` VALUES ('cb4ec303-df00-43e9-8703-d3e9a3c2b35e', null, '721ace3f-7a0a-408b-b125-3733a6aecf28', 'ZONROX', null, '1', '3', '27', '10.00', '2020-08-16 23:52:14', '2020-08-16 23:52:14', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products` VALUES ('f005be4c-d8fa-4142-8594-a26498c794b3', null, '721ace3f-7a0a-408b-b125-3733a6aecf28', 'FACIAL TISSUE', null, '1', '3', '60', '123.00', '2020-08-16 23:52:29', '2020-08-16 23:52:29', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products` VALUES ('f71701c7-6702-47b0-bbce-e0fdfcbcde64', null, '-1', '', null, '-1', '-1', '0', '0.00', '2020-09-10 09:47:34', '2020-09-10 09:47:34', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');

-- ----------------------------
-- Table structure for tbl_products_received
-- ----------------------------
DROP TABLE IF EXISTS `tbl_products_received`;
CREATE TABLE `tbl_products_received` (
  `received_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `transaction_id` varchar(36) NOT NULL,
  `product_id` varchar(36) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` float(10,2) DEFAULT NULL,
  `unit` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  `date_added` datetime DEFAULT NULL,
  `last_modified` datetime DEFAULT NULL,
  `last_modified_by` varchar(36) DEFAULT NULL,
  `archive` char(1) DEFAULT NULL,
  `is_consumed` char(1) DEFAULT NULL,
  PRIMARY KEY (`received_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of tbl_products_received
-- ----------------------------
INSERT INTO `tbl_products_received` VALUES ('0a938f4d-31da-40c8-b0cc-62699f3d6167', '9ea724a3-3389-480d-bcce-bb4fab25b292', 'bdd767b2-a58a-45aa-a182-5eeb31372fb5', '7', '3000.00', 'PCS', '2020-10-10', '2020-08-30 15:10:58', '2020-09-11 23:27:19', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0', 'Y');
INSERT INTO `tbl_products_received` VALUES ('0c00e5d1-30e2-4f15-960c-e0c39528c311', '9ea724a3-3389-480d-bcce-bb4fab25b292', '7071a1c7-9b86-4f5c-abea-da0f9947f43b', '4', '200.00', 'PCS', '2020-10-10', '2020-08-30 15:10:58', '2020-08-31 02:07:30', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0', 'Y');
INSERT INTO `tbl_products_received` VALUES ('135b241f-97e1-459f-9504-d92967bc4461', '8043566a-6e3f-477d-b94c-a90d7eb795cd', '01d6d2bb-94e3-45ce-9e63-5a2f284b85b6', '2', '25.00', 'PCS', null, '2020-09-19 12:36:28', '2020-09-19 12:36:28', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0', null);
INSERT INTO `tbl_products_received` VALUES ('4a091ad5-f06f-4c4a-beec-8f2558f79bba', 'ec17771a-e50d-41d3-9511-27a07f6e976a', '01d6d2bb-94e3-45ce-9e63-5a2f284b85b6', '3', '25.00', 'PCS', '2020-10-30', '2020-09-19 12:33:34', '2020-09-19 12:33:34', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0', null);
INSERT INTO `tbl_products_received` VALUES ('594d2f89-a0eb-4891-9ecd-56fa2dbac99c', 'ec17771a-e50d-41d3-9511-27a07f6e976a', '45e3ac31-2432-4374-ac51-47f0a9c3fe69', '2', '1.00', 'PCS', '2020-10-30', '2020-09-19 12:33:34', '2020-09-19 12:33:34', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0', null);
INSERT INTO `tbl_products_received` VALUES ('71c77d24-57da-4f53-9bcc-959547483be8', '9ea724a3-3389-480d-bcce-bb4fab25b292', '373e3c30-d5c6-407f-befe-3506543ac57d', '4', '100.00', 'BOX', '2020-10-29', '2020-08-30 15:10:58', '2020-09-11 16:22:21', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0', 'Y');
INSERT INTO `tbl_products_received` VALUES ('71d6e65b-3c19-4b99-b722-850cdfc77128', 'febd7cd9-b67b-4e67-ba81-df19a2d48d33', '3956be1f-966b-4a2e-a4c6-cabe816e4a09', '2', '200.00', 'PCS', '2020-09-04', '2020-08-31 02:07:58', '2020-09-11 23:24:17', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0', 'N');
INSERT INTO `tbl_products_received` VALUES ('7bc8f8ee-c22a-4294-80eb-03278f053a6e', '4aefa025-7cb3-43a5-8db8-c490c1df4973', '01d6d2bb-94e3-45ce-9e63-5a2f284b85b6', '2', '35.00', 'PCS', null, '2020-09-19 12:37:00', '2020-09-19 12:45:56', 'd172918c-9cb3-49a3-878d-db1aebb026de', '1', null);
INSERT INTO `tbl_products_received` VALUES ('8667eadc-fa6b-4e2d-bb54-b4909b3aa5e9', 'd3c67cb4-4351-4068-b31e-d4456571b792', '05bff015-3ce4-4fae-8a4d-58b146b45f12', '4', '820.00', 'PCS', '2020-09-25', '2020-09-11 15:38:10', '2020-09-19 12:43:40', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0', 'Y');
INSERT INTO `tbl_products_received` VALUES ('ae84e108-5d8f-4b3a-b3b2-0375c6c3eef6', 'febd7cd9-b67b-4e67-ba81-df19a2d48d33', 'acaf9f00-34ed-4ca9-ad3c-1a2c45e08c5a', '2', '213.00', 'BOX', '2020-09-04', '2020-08-31 02:07:58', '2020-09-11 16:22:43', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0', 'N');
INSERT INTO `tbl_products_received` VALUES ('c76dd942-e98f-427d-be53-207f1c4ba61d', 'ec17771a-e50d-41d3-9511-27a07f6e976a', 'c1f6c7e1-98ea-42c0-98d4-a76895cffb35', '5', '3.00', 'PACK', '2020-10-30', '2020-09-19 12:33:34', '2020-09-19 12:33:34', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0', null);
INSERT INTO `tbl_products_received` VALUES ('e47fec2b-3336-44fb-a814-88a2ced7ba6c', '8043566a-6e3f-477d-b94c-a90d7eb795cd', '01d6d2bb-94e3-45ce-9e63-5a2f284b85b6', '5', '35.00', 'PCS', '2020-09-26', '2020-09-19 12:36:28', '2020-09-19 12:43:50', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0', 'Y');
INSERT INTO `tbl_products_received` VALUES ('e4d2160b-7f11-4c27-971a-c5c4f3179a83', 'd3c67cb4-4351-4068-b31e-d4456571b792', 'b519ed64-0d85-45b9-8e3c-0b2c130c0a2e', '3', '12.00', 'PACK', '2020-09-25', '2020-09-11 15:38:10', '2020-09-19 12:25:30', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0', 'Y');

-- ----------------------------
-- Table structure for tbl_products_released
-- ----------------------------
DROP TABLE IF EXISTS `tbl_products_released`;
CREATE TABLE `tbl_products_released` (
  `released_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `transaction_id` varchar(36) NOT NULL,
  `product_id` varchar(36) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `unit` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `product_price` float(12,2) DEFAULT NULL,
  `amount` float(12,2) DEFAULT NULL,
  `date_added` datetime DEFAULT NULL,
  `last_modified` datetime DEFAULT NULL,
  `last_modified_by` varchar(36) DEFAULT NULL,
  `archive` char(1) DEFAULT NULL,
  PRIMARY KEY (`released_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of tbl_products_released
-- ----------------------------
INSERT INTO `tbl_products_released` VALUES ('02a90966-e713-4f57-816a-66561237f921', '1b4ddf97-bc20-4651-8833-52e780d6a3ff', 'bca9ab34-0478-4b14-afd8-bf6acd352394', '2', 'PCS', '1.00', '2.00', '2020-09-17 16:38:40', '2020-09-17 16:38:40', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('06eb1d99-442f-4a2a-a6d4-3fdeb0d3013a', '4fc5fce2-bee7-4677-82d4-8c89db1aad91', 'ab7c154a-af34-4d12-9c7d-d565eb5018eb', '2', 'BOX', '568.00', '1136.00', '2020-09-17 16:32:03', '2020-09-17 16:32:03', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('084e8c9f-67eb-4ba5-990d-08ef26688987', '1b4ddf97-bc20-4651-8833-52e780d6a3ff', '3956be1f-966b-4a2e-a4c6-cabe816e4a09', '4', 'PCS', '200.00', '800.00', '2020-09-17 16:38:40', '2020-09-17 16:38:40', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('0e9c1cd1-3a57-43f6-96d1-862fccbcf515', 'f4ba2804-177d-4846-833d-e1ea85c2d20b', '05bff015-3ce4-4fae-8a4d-58b146b45f12', '4', 'PCS', '820.00', '3280.00', '2020-09-17 16:40:23', '2020-09-17 16:40:23', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('1604e233-fc44-4a4a-9523-e8dab2bf8897', '8c65bb16-fdcc-466e-979c-56747b6b1970', 'acaf9f00-34ed-4ca9-ad3c-1a2c45e08c5a', '4', 'BOX', '213.00', '852.00', '2020-08-30 15:30:52', '2020-08-30 15:30:52', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('16665e1f-8f8e-4898-b317-8565385b35d3', '4fc5fce2-bee7-4677-82d4-8c89db1aad91', 'cb4ec303-df00-43e9-8703-d3e9a3c2b35e', '3', 'PCS', '10.00', '30.00', '2020-09-17 16:32:03', '2020-09-17 16:32:03', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('1b5f07e1-b720-4087-9952-083bdf7dccda', '4fc5fce2-bee7-4677-82d4-8c89db1aad91', '373e3c30-d5c6-407f-befe-3506543ac57d', '17', 'BOX', '100.00', '1700.00', '2020-09-17 16:32:03', '2020-09-17 16:32:03', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('1e2e873d-ac66-4d44-9050-b2821e63e138', 'b6db4700-fdb8-4b95-bb63-2b11b4d12bd3', '05bff015-3ce4-4fae-8a4d-58b146b45f12', '11', 'PCS', '820.00', '9020.00', '2020-09-11 10:04:42', '2020-09-11 10:04:42', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('2961449c-580d-459a-a4d4-6027a8cef958', '1b4ddf97-bc20-4651-8833-52e780d6a3ff', 'f005be4c-d8fa-4142-8594-a26498c794b3', '3', 'PCS', '123.00', '369.00', '2020-09-17 16:38:40', '2020-09-17 16:38:40', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('2e65a9e2-fc45-418b-b3cf-aae3bc30eee5', '4fc5fce2-bee7-4677-82d4-8c89db1aad91', 'c3294c04-7626-421a-a17e-38d692f2cd55', '2', 'BOX', '370.00', '740.00', '2020-09-17 16:32:03', '2020-09-17 16:32:03', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('303431a6-96c9-418c-9ad1-99ce473b9363', 'a14e1439-da07-4022-be0b-2834b7f20bb8', '7071a1c7-9b86-4f5c-abea-da0f9947f43b', '3', 'PCS', '200.00', '600.00', '2020-09-17 16:39:05', '2020-09-17 16:39:05', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('383ffb3d-36dd-4ea8-820f-bddbbfb48486', '4fc5fce2-bee7-4677-82d4-8c89db1aad91', '7071a1c7-9b86-4f5c-abea-da0f9947f43b', '4', 'PCS', '200.00', '800.00', '2020-09-17 16:32:03', '2020-09-17 16:32:03', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('3f377991-96b7-4ef6-8f11-99c366876a7f', '8f79fffa-2d5d-4478-9ead-3a9986998dee', '05bff015-3ce4-4fae-8a4d-58b146b45f12', '2', 'PCS', '820.00', '1640.00', '2020-09-17 16:17:29', '2020-09-17 16:17:29', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('478d0d83-638b-43f4-af79-0e4d880717ba', 'a14e1439-da07-4022-be0b-2834b7f20bb8', '7071a1c7-9b86-4f5c-abea-da0f9947f43b', '2', 'PCS', '200.00', '400.00', '2020-09-17 16:39:05', '2020-09-17 16:39:05', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('4f9478d5-e10e-4911-852a-a977032f7990', '4bf0aef2-0d17-4f40-88d5-cf6d875902df', 'acaf9f00-34ed-4ca9-ad3c-1a2c45e08c5a', '2', 'BOX', '213.00', '426.00', '2020-08-30 15:47:57', '2020-08-30 15:47:57', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('614cda35-0698-4a1d-95c7-d32c904f0d4c', '8c65bb16-fdcc-466e-979c-56747b6b1970', 'ab7c154a-af34-4d12-9c7d-d565eb5018eb', '3', 'BOX', '568.00', '1704.00', '2020-08-30 15:30:52', '2020-08-30 15:30:52', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('7a60cdba-72cc-4d95-8cb8-d18eb26b56c0', '8c65bb16-fdcc-466e-979c-56747b6b1970', 'c1f6c7e1-98ea-42c0-98d4-a76895cffb35', '2', 'PACK', '3.00', '6.00', '2020-08-30 15:30:52', '2020-08-30 15:30:52', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('889944fb-4ead-46b5-8a6b-21aa4250fd2a', '4fc5fce2-bee7-4677-82d4-8c89db1aad91', 'cb4ec303-df00-43e9-8703-d3e9a3c2b35e', '3', 'PCS', '10.00', '30.00', '2020-09-17 16:32:03', '2020-09-17 16:32:03', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('8d1ef7b8-c537-4fa2-9dc5-3b3d485a32f4', '1a1d4b1a-2410-4b77-a1fd-2e7c3061feee', '05bff015-3ce4-4fae-8a4d-58b146b45f12', '1', 'PCS', '820.00', '820.00', '2020-09-19 12:40:00', '2020-09-19 12:40:00', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('8d8cecb3-12c8-489b-b1a1-d7b3c49d9046', '8c65bb16-fdcc-466e-979c-56747b6b1970', '7071a1c7-9b86-4f5c-abea-da0f9947f43b', '4', 'PCS', '200.00', '800.00', '2020-08-30 15:30:52', '2020-08-30 15:30:52', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('9137f822-dac2-4c5e-8044-a26b9800b7e7', '1a1d4b1a-2410-4b77-a1fd-2e7c3061feee', '01d6d2bb-94e3-45ce-9e63-5a2f284b85b6', '3', 'PCS', '35.00', '105.00', '2020-09-19 12:40:00', '2020-09-19 12:40:00', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('9332af05-0ff6-42b9-a780-9ed801eb5610', '4fc5fce2-bee7-4677-82d4-8c89db1aad91', 'cb4ec303-df00-43e9-8703-d3e9a3c2b35e', '3', 'PCS', '10.00', '30.00', '2020-09-17 16:32:03', '2020-09-17 16:32:03', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('9bfe9069-5b6d-417b-8895-a575e43fe1e0', '8f79fffa-2d5d-4478-9ead-3a9986998dee', 'b519ed64-0d85-45b9-8e3c-0b2c130c0a2e', '3', 'PACK', '12.00', '36.00', '2020-09-17 16:17:29', '2020-09-17 16:17:29', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('a846e664-7be1-4eeb-9ca9-363c7dd2b545', '1b4ddf97-bc20-4651-8833-52e780d6a3ff', '05bff015-3ce4-4fae-8a4d-58b146b45f12', '3', 'PCS', '820.00', '2460.00', '2020-09-17 16:38:40', '2020-09-17 16:38:40', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('b1ff1bd4-9978-4300-af16-7978a99a2eb9', 'a14e1439-da07-4022-be0b-2834b7f20bb8', '05bff015-3ce4-4fae-8a4d-58b146b45f12', '3', 'PCS', '820.00', '2460.00', '2020-09-17 16:39:05', '2020-09-17 16:39:05', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('c6c0ecf0-0db2-4cb4-ac45-b6e9ef22793b', '4fc5fce2-bee7-4677-82d4-8c89db1aad91', 'f005be4c-d8fa-4142-8594-a26498c794b3', '4', 'PCS', '123.00', '492.00', '2020-09-17 16:32:03', '2020-09-17 16:32:03', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('ca8f0015-9300-4a98-83d2-2a9c7ad928ca', '4bf0aef2-0d17-4f40-88d5-cf6d875902df', 'acaf9f00-34ed-4ca9-ad3c-1a2c45e08c5a', '4', 'BOX', '213.00', '852.00', '2020-08-30 15:47:57', '2020-08-30 15:47:57', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('cf07eb1d-31d1-4312-8056-ff45d40d68ff', '1a1d4b1a-2410-4b77-a1fd-2e7c3061feee', 'bca9ab34-0478-4b14-afd8-bf6acd352394', '5', 'PCS', '1.00', '5.00', '2020-09-19 12:40:00', '2020-09-19 12:40:00', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('cf2c86c8-6e8d-46ca-84ef-05badf23d935', '4fc5fce2-bee7-4677-82d4-8c89db1aad91', '7071a1c7-9b86-4f5c-abea-da0f9947f43b', '5', 'PCS', '200.00', '1000.00', '2020-09-17 16:32:03', '2020-09-17 16:32:03', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('e0f19859-148e-46f1-8ffa-5a7b837de0a6', 'f4ba2804-177d-4846-833d-e1ea85c2d20b', 'bdd767b2-a58a-45aa-a182-5eeb31372fb5', '2', 'PCS', '3000.00', '6000.00', '2020-09-17 16:40:23', '2020-09-17 16:40:23', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('ef316c2f-43a0-4d04-b3ce-07e7465031cf', '1b4ddf97-bc20-4651-8833-52e780d6a3ff', '3956be1f-966b-4a2e-a4c6-cabe816e4a09', '4', 'PCS', '200.00', '800.00', '2020-09-17 16:38:40', '2020-09-17 16:38:40', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_products_released` VALUES ('f5a75ab8-cd95-43ef-aa56-fb9eadbf2f54', '4bf0aef2-0d17-4f40-88d5-cf6d875902df', 'bdd767b2-a58a-45aa-a182-5eeb31372fb5', '3', 'PCS', '3000.00', '9000.00', '2020-08-30 15:47:57', '2020-08-30 15:47:57', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');

-- ----------------------------
-- Table structure for tbl_supplier
-- ----------------------------
DROP TABLE IF EXISTS `tbl_supplier`;
CREATE TABLE `tbl_supplier` (
  `supplier_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `supplier_name` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `supplier_address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `supplier_contact_number` varchar(20) DEFAULT NULL,
  `supplier_contact_person` varchar(100) DEFAULT NULL,
  `remarks` varchar(100) DEFAULT NULL,
  `last_modified_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `last_modified` datetime NOT NULL,
  `archive` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`supplier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of tbl_supplier
-- ----------------------------
INSERT INTO `tbl_supplier` VALUES ('0d61aaff-a362-4dca-a0f8-46b9d7ad34d9', '', '', null, '', '', '218ae7db-cd4f-4cc5-84d8-88438714725d', '2020-09-10 09:47:01', '1');
INSERT INTO `tbl_supplier` VALUES ('30e98528-1890-41a5-8c31-c7f63c6db100', 'SUPPLIER 3', '7A ', '09090909090', 'PPLDSF', '', '218ae7db-cd4f-4cc5-84d8-88438714725d', '2020-09-19 12:31:08', '0');
INSERT INTO `tbl_supplier` VALUES ('34536798-574c-4ecd-9345-cd30db3c1e20', '', '', '', '', '', '218ae7db-cd4f-4cc5-84d8-88438714725d', '2020-09-10 09:47:29', '1');
INSERT INTO `tbl_supplier` VALUES ('36a66b39-316b-4176-a791-b0a165e9e92f', 'ASDASD', 'AASDASD', '09091209302', 'ASDASDASD', '', '218ae7db-cd4f-4cc5-84d8-88438714725d', '2020-09-10 17:41:11', '0');
INSERT INTO `tbl_supplier` VALUES ('5e68f142-6dcf-4418-9142-6a1c23b17b71', '', '', null, '', '', '218ae7db-cd4f-4cc5-84d8-88438714725d', '2020-09-10 09:47:07', '1');
INSERT INTO `tbl_supplier` VALUES ('5fd2c1a5-38d5-4441-8f0c-86ad1057e71b', 'ASDAS', 'ASDASD', '09879878978', 'ABDUL JABBAR', '', '218ae7db-cd4f-4cc5-84d8-88438714725d', '2020-09-10 17:02:00', '0');
INSERT INTO `tbl_supplier` VALUES ('6f1e0830-1550-4eff-b109-86ecd72a155d', 'SAMPLE', 'SAMPLE', '', '', '', '218ae7db-cd4f-4cc5-84d8-88438714725d', '2020-09-10 09:47:17', '0');
INSERT INTO `tbl_supplier` VALUES ('721ace3f-7a0a-408b-b125-3733a6aecf28', 'LIBERTY SUPPLY CENTER', 'QC', '01923091829', 'ALEXIS', '', '218ae7db-cd4f-4cc5-84d8-88438714725d', '2020-08-02 16:03:20', '0');
INSERT INTO `tbl_supplier` VALUES ('74960bbd-61b7-4178-9adc-12656b0c10a2', '', '', '', '', '', '218ae7db-cd4f-4cc5-84d8-88438714725d', '2020-09-10 16:43:03', '1');
INSERT INTO `tbl_supplier` VALUES ('8f9ed086-e8e3-4e9f-99e4-836208ae711b', 'SUPPLIER 2', 'QC', '09129308123', 'ALEXIS', '', '218ae7db-cd4f-4cc5-84d8-88438714725d', '2020-08-02 16:08:51', '0');
INSERT INTO `tbl_supplier` VALUES ('e0a89eb6-ed12-4b69-b8d2-13a338dc681c', 'SUPPLIER 3', '7', '09120938901', 'TSUPER', '', '218ae7db-cd4f-4cc5-84d8-88438714725d', '2020-08-25 13:43:43', '0');

-- ----------------------------
-- Table structure for tbl_transactions
-- ----------------------------
DROP TABLE IF EXISTS `tbl_transactions`;
CREATE TABLE `tbl_transactions` (
  `transaction_id` varchar(36) NOT NULL,
  `type_of_transaction` char(1) NOT NULL,
  `last_modified` datetime NOT NULL,
  `last_modified_by` varchar(36) NOT NULL,
  `branch` char(1) DEFAULT NULL,
  `total_amount` float(10,2) DEFAULT NULL,
  `archive` tinyint(1) NOT NULL,
  PRIMARY KEY (`transaction_id`)
) ENGINE=MyISAM DEFAULT CHARSET=ascii;

-- ----------------------------
-- Records of tbl_transactions
-- ----------------------------
INSERT INTO `tbl_transactions` VALUES ('9ea724a3-3389-480d-bcce-bb4fab25b292', 'I', '2020-07-01 15:10:58', '218ae7db-cd4f-4cc5-84d8-88438714725d', null, '22200.00', '0');
INSERT INTO `tbl_transactions` VALUES ('8c65bb16-fdcc-466e-979c-56747b6b1970', 'O', '2020-07-01 15:30:52', '218ae7db-cd4f-4cc5-84d8-88438714725d', 'M', '3362.00', '0');
INSERT INTO `tbl_transactions` VALUES ('4bf0aef2-0d17-4f40-88d5-cf6d875902df', 'O', '2020-08-30 15:47:57', '218ae7db-cd4f-4cc5-84d8-88438714725d', 'K', '10278.00', '0');
INSERT INTO `tbl_transactions` VALUES ('febd7cd9-b67b-4e67-ba81-df19a2d48d33', 'I', '2020-08-31 02:07:58', '218ae7db-cd4f-4cc5-84d8-88438714725d', null, '826.00', '0');
INSERT INTO `tbl_transactions` VALUES ('b6db4700-fdb8-4b95-bb63-2b11b4d12bd3', 'O', '2020-09-11 10:04:41', '218ae7db-cd4f-4cc5-84d8-88438714725d', 'K', '9020.00', '0');
INSERT INTO `tbl_transactions` VALUES ('d3c67cb4-4351-4068-b31e-d4456571b792', 'I', '2020-09-11 15:38:10', '218ae7db-cd4f-4cc5-84d8-88438714725d', null, '3316.00', '0');
INSERT INTO `tbl_transactions` VALUES ('8f79fffa-2d5d-4478-9ead-3a9986998dee', 'O', '2020-09-17 16:17:29', '218ae7db-cd4f-4cc5-84d8-88438714725d', 'M', '1676.00', '0');
INSERT INTO `tbl_transactions` VALUES ('4fc5fce2-bee7-4677-82d4-8c89db1aad91', 'O', '2020-09-17 16:32:03', '218ae7db-cd4f-4cc5-84d8-88438714725d', 'K', '5958.00', '0');
INSERT INTO `tbl_transactions` VALUES ('1b4ddf97-bc20-4651-8833-52e780d6a3ff', 'O', '2020-09-17 16:38:40', '218ae7db-cd4f-4cc5-84d8-88438714725d', 'K', '4431.00', '0');
INSERT INTO `tbl_transactions` VALUES ('a14e1439-da07-4022-be0b-2834b7f20bb8', 'O', '2020-09-17 16:39:05', '218ae7db-cd4f-4cc5-84d8-88438714725d', 'M', '3460.00', '0');
INSERT INTO `tbl_transactions` VALUES ('f4ba2804-177d-4846-833d-e1ea85c2d20b', 'O', '2020-09-17 16:40:23', '218ae7db-cd4f-4cc5-84d8-88438714725d', 'K', '9280.00', '0');
INSERT INTO `tbl_transactions` VALUES ('ec17771a-e50d-41d3-9511-27a07f6e976a', 'I', '2020-09-19 12:33:34', '218ae7db-cd4f-4cc5-84d8-88438714725d', null, '92.00', '0');
INSERT INTO `tbl_transactions` VALUES ('8043566a-6e3f-477d-b94c-a90d7eb795cd', 'I', '2020-09-19 12:36:28', '218ae7db-cd4f-4cc5-84d8-88438714725d', null, '225.00', '0');
INSERT INTO `tbl_transactions` VALUES ('4aefa025-7cb3-43a5-8db8-c490c1df4973', 'I', '2020-09-19 12:45:56', 'd172918c-9cb3-49a3-878d-db1aebb026de', null, '70.00', '1');
INSERT INTO `tbl_transactions` VALUES ('1a1d4b1a-2410-4b77-a1fd-2e7c3061feee', 'O', '2020-09-19 12:40:00', '218ae7db-cd4f-4cc5-84d8-88438714725d', 'M', '930.00', '0');

-- ----------------------------
-- Table structure for tbl_users
-- ----------------------------
DROP TABLE IF EXISTS `tbl_users`;
CREATE TABLE `tbl_users` (
  `id` bigint(7) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `user_id` varchar(36) DEFAULT NULL,
  `name` varchar(60) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `nickname` varchar(20) DEFAULT NULL,
  `username` varchar(60) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `password` char(32) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `user_type` smallint(1) NOT NULL,
  `is_active` char(1) DEFAULT NULL,
  `branch` tinyint(2) DEFAULT NULL,
  `last_modified` datetime DEFAULT NULL,
  `last_modified_by` varchar(36) DEFAULT NULL,
  `archive` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tbl_users
-- ----------------------------
INSERT INTO `tbl_users` VALUES ('0000001', '218ae7db-cd4f-4cc5-84d8-88438714725d', 'Camille Ampong', 'Camille', 'campong', '7a1965129948c271a57ad3f8a882a75a', '3', 'Y', null, '2020-08-25 10:32:41', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_users` VALUES ('0000002', '7766d51f-b9ae-4262-a273-9ef31a1a2682', 'Kimberly Flores', 'Kim', 'kflores', '7a1965129948c271a57ad3f8a882a75a', '2', 'Y', null, '2019-09-14 08:33:15', '88cd2b1e-6d9e-476f-a472-4ac7725bc642', '0');
INSERT INTO `tbl_users` VALUES ('0000003', '1eecac5e-03ce-4392-96e4-ff0ecd12befa', 'Queencel Joyce Singh', 'Joyce', 'jsingh', '7a1965129948c271a57ad3f8a882a75a', '2', 'Y', null, null, null, '0');
INSERT INTO `tbl_users` VALUES ('0000004', '549399f6-9048-4a7b-abce-2f00d9368095', 'Yves Vicente Diaz', 'Yves', 'yvdiaz', '7a1965129948c271a57ad3f8a882a75a', '2', 'Y', null, null, null, '0');
INSERT INTO `tbl_users` VALUES ('0000005', 'ce55f237-e755-41de-86ed-7965f3b31a70', 'Filbert Mangada', 'Filbert', 'fmangada', '7a1965129948c271a57ad3f8a882a75a', '2', 'Y', null, null, null, '0');
INSERT INTO `tbl_users` VALUES ('0000006', 'fc246f53-ed4e-4e48-b7e7-b1633e6e9f31', 'Danielle Leal', 'Danielle', 'dleal', 'ampongdental', '2', 'Y', null, '2019-12-27 20:08:41', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_users` VALUES ('0000007', 'c081aeb8-1071-48e8-9e73-5f89c26f5e09', 'Katrina Amparo', 'Katrina', 'kamparo', 'ampongdental', '2', 'Y', null, '2019-09-14 08:33:18', '88cd2b1e-6d9e-476f-a472-4ac7725bc642', '0');
INSERT INTO `tbl_users` VALUES ('0000008', '3f06bf2d-fc48-43a0-95f8-da878dcf652a', 'Dave Dalida', 'Dave', 'ddalida', 'ampongdental', '2', 'Y', null, null, null, '0');
INSERT INTO `tbl_users` VALUES ('0000009', 'ad9cee20-1b56-4256-a56e-aaab45ea6a46', 'Jonah Marie Dahili', 'Jonah', 'jmdahili', 'ampongdental', '1', 'N', null, '2019-09-13 22:50:56', '218ae7db-cd4f-4cc5-84d8-88438714725d', '1');
INSERT INTO `tbl_users` VALUES ('0000010', '066b9dd2-e492-4672-81ba-f45cdad9c2b3', 'Faida Harun', 'Faida', 'fharun', 'ampongdental', '1', 'N', null, '2019-12-27 19:33:39', 'fc95d80f-6425-4a71-918c-fccb8c286571', '1');
INSERT INTO `tbl_users` VALUES ('0000011', '4ebe6a35-f065-4fbf-a912-958c8b688723', 'Angeline', 'Angeline', 'angelie', 'ampongdental', '1', 'N', null, '2020-08-25 10:32:31', '218ae7db-cd4f-4cc5-84d8-88438714725d', '1');
INSERT INTO `tbl_users` VALUES ('0000012', '25626b08-ec09-438e-b85e-a7204ca1fb29', 'Gabriel See', 'Gabriel', 'gsee', 'ampongdental', '2', 'Y', null, null, null, '0');
INSERT INTO `tbl_users` VALUES ('0000013', 'bcf96d8e-fe12-4bf1-a03f-5cf639703c2d', 'Patricia Tiangco', 'Patricia', 'ptianco', 'ampongdental', '2', 'Y', null, null, null, '0');
INSERT INTO `tbl_users` VALUES ('0000014', '21caa435-e3a1-4693-9ef3-1a3be5789842', 'Allison ', 'Allison', 'a', 'ampongdental', '1', 'Y', null, '2020-08-25 10:32:33', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_users` VALUES ('0000015', '88cd2b1e-6d9e-476f-a472-4ac7725bc642', 'Dheanne Taguba', 'Dheanne', 'dtaguba', '7a1965129948c271a57ad3f8a882a75a', '1', 'Y', null, '2020-03-03 14:36:42', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_users` VALUES ('0000018', 'fc95d80f-6425-4a71-918c-fccb8c286571', 'Juana Dela Cruz', 'Juana', 'jdelacruz', '12345678', '1', 'Y', '1', '2019-12-27 19:32:11', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_users` VALUES ('0000019', 'f0243a53-e6cb-4b77-aea3-2ade86640c4b', 'jun', 'jan', 'jil', 'ampongdental', '2', 'Y', '1', '2019-12-27 20:08:14', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_users` VALUES ('0000020', '65635370-6886-4ab0-965d-5357e6512335', 'MIGGY', 'MIGGY', 'MIGGY', 'ampongdental', '2', 'Y', '1', '2019-12-27 20:58:56', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_users` VALUES ('0000021', '7a0b8c38-4e99-4252-9fa7-d9df5c474f56', 'enriquez', 'lenny', 'pancake', 'ampongdental', '1', 'Y', '1', '2020-08-25 10:30:55', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_users` VALUES ('0000022', 'bc91d930-4a04-4dcd-862d-046fd0665f2d', 'kenneth', 'mokiu', 'kenth2', '7a1965129948c271a57ad3f8a882a75a', '3', 'Y', null, '2020-08-25 10:32:46', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
INSERT INTO `tbl_users` VALUES ('0000023', 'a328f91f-f054-47ce-a48b-e0e98994e857', 'kenneth anthony molina', 'kenth', 'kenth123', '7a1965129948c271a57ad3f8a882a75a', '1', 'Y', null, '2020-08-18 18:23:33', null, '0');
INSERT INTO `tbl_users` VALUES ('0000024', 'd172918c-9cb3-49a3-878d-db1aebb026de', 'test', 'test', 'sampleuser', '7a1965129948c271a57ad3f8a882a75a', '1', 'Y', null, '2020-09-19 12:45:06', '218ae7db-cd4f-4cc5-84d8-88438714725d', '0');
