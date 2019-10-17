const idGenerator = `
  CREATE SEQUENCE IF NOT EXISTS table_id_seq;
  CREATE OR REPLACE FUNCTION url_safe_base64(to_convert text)
    RETURNS text AS $$
    DECLARE
      result text;
    BEGIN
      result := replace(replace(replace(to_convert, '+', '-'), '/', '_'), '=', '');
      RETURN result;
    END
  $$ LANGUAGE PLPGSQL;
  CREATE OR REPLACE FUNCTION next_id(OUT result_string text) AS $$
    DECLARE
      our_epoch bigint := 1314220021721;
      result bigint;
      seq_id bigint;
      now_millis bigint;
      shard_id int := 0;
    BEGIN
      SELECT nextval('table_id_seq') % 1024 INTO seq_id;
      SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000) INTO now_millis;
      result:= (now_millis - our_epoch) << 23;
      result:= result | (shard_id << 10);
      result:= result | (seq_id);
      result_string:= url_safe_base64(encode(int8send(result), 'base64'));
    END;
  $$ LANGUAGE PLPGSQL;`;

const idGenRemoval = `
  DROP SEQUENCE IF EXISTS table_id_seq;
  DROP FUNCTION IF EXISTS url_safe_base64;
  DROP FUNCTION IF EXISTS next_id;`;

module.exports = {
  idGenerator,
  idGenRemoval
};