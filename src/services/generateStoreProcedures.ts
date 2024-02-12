import { Sequelize } from "sequelize";

const spGetAllClientsWithBucketInfo = `
CREATE PROCEDURE spGetAllClientsWithBucketInfo(IN offsetParam INT, IN limitParam INT)
BEGIN
    SELECT * FROM (
        SELECT 
            c.id AS clientId, 
            c.name AS \`name\`,
            (SELECT COUNT(*) FROM budgets b1 WHERE b1.state != 'finished' AND b1.clientId = c.id AND b1.deleted = 0) AS \`active\`,
            (SELECT COUNT(*) FROM budgets b2 WHERE b2.clientId = c.id AND b2.deleted = 0) AS \`total\`,
            (SELECT updateDate FROM budgets b3 WHERE b3.clientId = c.id AND b3.deleted = 0 ORDER BY b3.updateDate DESC, b3.creationDate DESC LIMIT 1) AS \`lastModification\`
        FROM clients c 
        WHERE c.deleted = 0
        GROUP BY c.id
    ) AS X
    ORDER BY X.active DESC, X.total DESC
    LIMIT offsetParam, limitParam;
END;`




export async function createStores(sequelize: Sequelize) {
    await sequelize.query(spGetAllClientsWithBucketInfo).catch(err => console.info('El procedure spGetAllClientsWithBucketInfo ya existía o no se pudo crear',err));
}