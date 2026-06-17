import mysql, { type Pool } from "mysql2/promise";

declare global {
  // eslint-disable-next-line no-var
  var mysqlPool: Pool | undefined;
  // eslint-disable-next-line no-var
  var reviewsTableReady: Promise<void> | undefined;
}

function createPool() {
  const databaseUrl = process.env.MYSQL_URL || process.env.DATABASE_URL;

  if (databaseUrl) {
    return mysql.createPool({
      uri: databaseUrl,
      connectionLimit: 5,
      waitForConnections: true,
      enableKeepAlive: true
    });
  }

  const {
    MYSQLHOST,
    MYSQLPORT,
    MYSQLUSER,
    MYSQLPASSWORD,
    MYSQLDATABASE
  } = process.env;

  if (
    MYSQLHOST &&
    MYSQLUSER &&
    MYSQLPASSWORD &&
    MYSQLDATABASE
  ) {
    return mysql.createPool({
      host: MYSQLHOST,
      port: MYSQLPORT ? Number(MYSQLPORT) : 3306,
      user: MYSQLUSER,
      password: MYSQLPASSWORD,
      database: MYSQLDATABASE,
      connectionLimit: 5,
      waitForConnections: true,
      enableKeepAlive: true
    });
  }

  throw new Error(
    "MySQL no está configurado. En Railway agrega una base MySQL y conecta MYSQL_URL o MYSQLHOST, MYSQLPORT, MYSQLUSER, MYSQLPASSWORD y MYSQLDATABASE al servicio web."
  );
}

export function getMysqlPool() {
  if (!globalThis.mysqlPool) {
    globalThis.mysqlPool = createPool();
  }

  return globalThis.mysqlPool;
}

export async function ensureReviewsTable() {
  if (!globalThis.reviewsTableReady) {
    globalThis.reviewsTableReady = getMysqlPool()
      .execute(`
        CREATE TABLE IF NOT EXISTS reviews (
          id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
          name VARCHAR(80) NOT NULL,
          rating TINYINT UNSIGNED NOT NULL,
          comment VARCHAR(500) NOT NULL,
          approved BOOLEAN NOT NULL DEFAULT TRUE,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (id),
          INDEX idx_reviews_approved_created_at (approved, created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `)
      .then(() => undefined);
  }

  await globalThis.reviewsTableReady;
}
