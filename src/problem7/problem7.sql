SELECT 
  with_usd_amount.address
FROM
  (
    SELECT
      has_recent_trades.address, 
      has_recent_trades.denom, 
      CASE
        WHEN has_recent_trades.denom = 'usdc' THEN SUM(has_recent_trades.amount) * 0.000001
        WHEN has_recent_trades.denom = 'swth' THEN SUM(has_recent_trades.amount) * 0.00000005
        WHEN has_recent_trades.denom = 'tmz' THEN SUM(has_recent_trades.amount) * 0.003
      END usd_amount
    FROM
      (
        SELECT 
          balances.address,
          balances.denom,
          balances.amount
        FROM balances
        WHERE
          balances.address IN (
            SELECT
              trades.address
            FROM 
              trades
            GROUP BY
              trades.address
            HAVING
              MAX(trades.block_height) > 730000
          )
       ) AS has_recent_trades
     GROUP BY
       has_recent_trades.denom,
       has_recent_trades.address
  ) AS with_usd_amount
GROUP BY
  with_usd_amount.address
HAVING 
  SUM(with_usd_amount.usd_amount) >= 500;
