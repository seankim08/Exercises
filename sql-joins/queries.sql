-- write your queries here
SELECT * FROM vehicles v FULL JOIN owners o ON v.owner_id = o.id;

SELECT first_name, last_name, count(*) FROM vehicles v JOIN owners o ON v.owner_id = o.id GROUP BY o.id ORDER BY first_name;

SELECT first_name, last_name, ROUND(AVG(price)) AS average_price, count(*) FROM vehicles v JOIN owners o ON v.owner_id = o.id GROUP BY o.id HAVING ROUND(AVG(price)) > 10000 AND count(*) > 1 ORDER BY first_name DESC;