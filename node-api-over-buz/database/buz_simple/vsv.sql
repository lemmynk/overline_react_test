TRUNCATE TABLE `node-api-over-buz`.`mp_art_grupa`;
INSERT INTO `node-api-over-buz`.`mp_art_grupa`(`id`, `vArtikl`, `grpNaziv`, `grpSifra`, `grpDuzina`, `createdAt`, `updatedAt`)
SELECT `grpid` AS `id`, IF(`v_grupa` = 1, "roba", "usluga") AS `vArtikl`, `grpnaziv`, `grpsifra`, `grpduzina`, NOW(), NOW()
FROM `buz_simple`.`mp_art_grupa`;

TRUNCATE TABLE `node-api-over-buz`.`mp_art_main`;
INSERT INTO `node-api-over-buz`.`mp_art_main`(`id`, `vArtikl`, `grpId`, `intSifra`, `artNaziv`, `mera`, `pdvId`, `createdAt`, `updatedAt`)
SELECT `artid`, IF(`v_artikl`=1, "roba", "usluga") AS `vArtikl`, `grpid`, `intsifra`, `artnaziv`, `mera`, IF(`pdvid`=4, 1, 3) AS `pdvId`, NOW(), NOW()
FROM `buz_simple`.`mp_art_main`;

