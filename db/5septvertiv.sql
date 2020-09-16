--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.18
-- Dumped by pg_dump version 12.3

-- Started on 2020-09-05 16:34:03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 272 (class 1255 OID 115610)
-- Name: delete_fields(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.delete_fields() RETURNS trigger
    LANGUAGE plpgsql
    AS $$DECLARE tbl_name character varying; 
DECLARE filed_name character varying; 
DECLARE filed_type character varying; 
declare test character varying;
declare test1 character varying;
declare test2 character varying;
BEGIN 
 
select s_tbl_name,s_field_nam ,s_field_type into tbl_name,filed_name,filed_type from tbl_custom_fields  WHERE n_customfield_id=OLD.n_customfield_id;

test1 := old.s_field_nam;
  test := old.s_tbl_name;
  test2 :=old.s_field_type;

--insert into tbl_demo ( id,phone,phone1,phone2) values (20,OLD.s_tbl_name,OLD.s_field_nam ,OLD.s_field_type);

--insert into tbl_demo ( id,phone,phone1,phone2) values (20,test,test1,test2);


if tbl_name = 'tbl_alert_master' then

--EXECUTE 'ALTER TABLE tbl_alert_master  DROP COLUMN ' || test ', DROP COLUMN '||test2;

EXECUTE 'ALTER TABLE tbl_alert_master DROP COLUMN ' || test1;

elseif tbl_name = 'tbl_alert_transaction' then

--EXECUTE 'ALTER TABLE tbl_alert_transaction  DROP COLUMN ' || test ', DROP COLUMN '||test2;

EXECUTE 'ALTER TABLE tbl_alert_transaction DROP COLUMN ' || test1;

elseif tbl_name = 'tbl_system_parameter' then

EXECUTE 'ALTER TABLE tbl_system_parameter DROP COLUMN ' || test1;

elseif tbl_name = 'tbl_role_master' then

EXECUTE 'ALTER TABLE tbl_role_master DROP COLUMN ' || test1;

elseif tbl_name = 'tbl_user_role_mapping' then

EXECUTE 'ALTER TABLE tbl_user_role_mapping DROP COLUMN ' || test1;

elseif tbl_name = 'tbl_status_master' then

EXECUTE 'ALTER TABLE tbl_status_master DROP COLUMN ' || test1;

elseif tbl_name = 'tbl_rake_master' then

EXECUTE 'ALTER TABLE tbl_rake_master DROP COLUMN ' || test1;

elseif tbl_name = 'tbl_racku_master' then

EXECUTE 'ALTER TABLE tbl_racku_master DROP COLUMN ' || test1;


elseif tbl_name = 'tbl_asset_master' then

EXECUTE 'ALTER TABLE tbl_asset_master DROP COLUMN ' || test1;

elseif tbl_name = 'tbl_asset_mapping' then

EXECUTE 'ALTER TABLE tbl_asset_mapping DROP COLUMN ' || test1;

elseif tbl_name = 'tbl_country_master' then

EXECUTE 'ALTER TABLE tbl_country_master DROP COLUMN ' || test1;


elseif tbl_name = 'tbl_state_master' then

EXECUTE 'ALTER TABLE tbl_state_master DROP COLUMN ' || test1;



elseif tbl_name = 'tbl_datacenter_location' then

EXECUTE 'ALTER TABLE tbl_datacenter_location DROP COLUMN ' || test1;

elseif tbl_name = 'tbl_datacenter_room' then

EXECUTE 'ALTER TABLE tbl_datacenter_room DROP COLUMN ' || test1;

elseif tbl_name = 'tbl_custom_fields' then

EXECUTE 'ALTER TABLE tbl_custom_fields DROP COLUMN ' || test1;

END IF;

	RETURN OLD;
END;


$$;


ALTER FUNCTION public.delete_fields() OWNER TO postgres;

--
-- TOC entry 269 (class 1255 OID 82773)
-- Name: delete_floor_onlocation_delete(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.delete_floor_onlocation_delete() RETURNS trigger
    LANGUAGE plpgsql
    AS $$BEGIN 

  DELETE FROM tbl_datacenter_door WHERE n_datacenter_id = OLD.n_datacenter_id;
    RETURN OLD;
	
END;
$$;


ALTER FUNCTION public.delete_floor_onlocation_delete() OWNER TO postgres;

--
-- TOC entry 236 (class 1255 OID 74505)
-- Name: gealertmsg(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.gealertmsg(aid bigint) RETURNS character varying
    LANGUAGE plpgsql
    AS $$

declare  alertmsg character varying(100);
BEGIN

  select s_alert_msg_desc into alertmsg from tbl_alert_master where n_alert_id=aid;
  return alertmsg;
END;

$$;


ALTER FUNCTION public.gealertmsg(aid bigint) OWNER TO postgres;

--
-- TOC entry 262 (class 1255 OID 82722)
-- Name: getasset(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.getasset(a_id bigint) RETURNS character varying
    LANGUAGE plpgsql
    AS $$

declare  asset character varying(100);
BEGIN

  select s_asset_name into asset  from tbl_asset_master where n_asset_id=a_id;
  return  asset ;
END;

$$;


ALTER FUNCTION public.getasset(a_id bigint) OWNER TO postgres;

--
-- TOC entry 237 (class 1255 OID 74507)
-- Name: getcountry(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.getcountry(c_id bigint) RETURNS character varying
    LANGUAGE plpgsql
    AS $$

declare country character varying(100);
BEGIN

  select s_country_name into country from tbl_country_master where n_country_id=c_id;
  return country;
END;

$$;


ALTER FUNCTION public.getcountry(c_id bigint) OWNER TO postgres;

--
-- TOC entry 238 (class 1255 OID 74508)
-- Name: getdatacentename(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.getdatacentename(d_id bigint) RETURNS character varying
    LANGUAGE plpgsql
    AS $$

declare  datacenter_name character varying(100);
BEGIN

  select s_datacenter_name into datacenter_name from tbl_datacenter_location where n_datacenter_id=d_id;
  return datacenter_name;
END;

$$;


ALTER FUNCTION public.getdatacentename(d_id bigint) OWNER TO postgres;

--
-- TOC entry 239 (class 1255 OID 74509)
-- Name: getdatacenterlocation(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.getdatacenterlocation(sid bigint) RETURNS character varying
    LANGUAGE plpgsql
    AS $$

declare location character varying(100);
BEGIN

  select s_datacenter_address,s_datacenter_landmark,n_datacenter_pincode into location from tbl_datacenter_location where n_datacenter_id=sid;
  return location;
END;

$$;


ALTER FUNCTION public.getdatacenterlocation(sid bigint) OWNER TO postgres;

--
-- TOC entry 240 (class 1255 OID 74510)
-- Name: getfloor(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.getfloor(f_id bigint) RETURNS character varying
    LANGUAGE plpgsql
    AS $$

declare floor character varying(100);
BEGIN

  select s_floor_loc into floor from tbl_datacenter_door where n_door_id=f_id;
  return floor;
END;

$$;


ALTER FUNCTION public.getfloor(f_id bigint) OWNER TO postgres;

--
-- TOC entry 241 (class 1255 OID 74511)
-- Name: getrakename(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.getrakename(rid bigint) RETURNS character varying
    LANGUAGE plpgsql
    AS $$

declare rakename  character varying(100);
BEGIN

  select s_rake_name into rakename from tbl_rake_master where n_rake_id=rid;
  return rakename;
END;

$$;


ALTER FUNCTION public.getrakename(rid bigint) OWNER TO postgres;

--
-- TOC entry 242 (class 1255 OID 74512)
-- Name: getrolename(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.getrolename(roleid bigint) RETURNS character varying
    LANGUAGE plpgsql
    AS $$

declare rolename character varying(100);
BEGIN

  select s_role_name into rolename from tbl_role_master where n_role_id=roleid;
  return rolename;
END;

$$;


ALTER FUNCTION public.getrolename(roleid bigint) OWNER TO postgres;

--
-- TOC entry 243 (class 1255 OID 74513)
-- Name: getroom(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.getroom(r_id bigint) RETURNS character varying
    LANGUAGE plpgsql
    AS $$

declare  room character varying(100);
BEGIN

  select n_room_no into room from tbl_datacenter_room where n_room_id=r_id;
  return room;
END;

$$;


ALTER FUNCTION public.getroom(r_id bigint) OWNER TO postgres;

--
-- TOC entry 244 (class 1255 OID 74514)
-- Name: getstate(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.getstate(sid bigint) RETURNS character varying
    LANGUAGE plpgsql
    AS $$

declare state character varying(100);
BEGIN

  select s_state_name into state from tbl_state_master where n_state_id=sid;
  return state;
END;

$$;


ALTER FUNCTION public.getstate(sid bigint) OWNER TO postgres;

--
-- TOC entry 265 (class 1255 OID 107281)
-- Name: getstatus(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.getstatus(s_id bigint) RETURNS character varying
    LANGUAGE plpgsql
    AS $$

declare  status character varying(100);
BEGIN


  select CONCAT(s_status_name ,'::' ,s_status_colorcode ) into status   from tbl_status_master where n_status_no=s_id;
  return  status ;
END;

$$;


ALTER FUNCTION public.getstatus(s_id bigint) OWNER TO postgres;

--
-- TOC entry 257 (class 1255 OID 74516)
-- Name: gettag(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.gettag(uid bigint) RETURNS character varying
    LANGUAGE plpgsql
    AS $$

declare tag character varying(100);
BEGIN

  select s_racku_no into tag from tbl_racku_master where n_u_id=uid;
  return tag;
END;

$$;


ALTER FUNCTION public.gettag(uid bigint) OWNER TO postgres;

--
-- TOC entry 258 (class 1255 OID 74517)
-- Name: getusername(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.getusername(uid bigint) RETURNS character varying
    LANGUAGE plpgsql
    AS $$

declare uname character varying(100);
BEGIN

  select s_user_name into uname from tbl_user where s_user_id=uid;
  return uname;
END;

$$;


ALTER FUNCTION public.getusername(uid bigint) OWNER TO postgres;

--
-- TOC entry 273 (class 1255 OID 82771)
-- Name: insert_floor(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.insert_floor() RETURNS trigger
    LANGUAGE plpgsql
    AS $$DECLARE floor integer;
DECLARE createdby character varying;
DECLARE createddate bigint;
DECLARE location character varying;
DECLARE s_door_sensor_idd character varying;

DECLARE floorno character varying;
BEGIN 
 SELECT s_floor_loc ,s_created_by,d_created_date,concat(s_datacenter_address,concat(',',s_datacenter_landmark),concat(',',n_datacenter_pincode)) INTO floor,createdby,createddate,location FROM tbl_datacenter_location WHERE n_datacenter_id=NEW.n_datacenter_id;
 FOR floorid IN 1..floor	   
   LOOP
     floorno := concat('Floor','-',floorid);
	 	 --s_door_sensor_idd:= concat('----');

-- 	   select s_datacenter_address,s_datacenter_landmark,n_datacenter_pincode into location from tbl_datacenter_location where n_datacenter_id=NEW.n_datacenter_id;

  INSERT INTO tbl_datacenter_door
(	
s_floor_loc ,s_datacenter_location,s_door_sensor_id,n_datacenter_id,s_created_by,d_created_date) values(floorno,location,s_door_sensor_idd,NEW.n_datacenter_id,createdby,createddate);

 END LOOP;
	RETURN NEW;
END;





$$;


ALTER FUNCTION public.insert_floor() OWNER TO postgres;

--
-- TOC entry 266 (class 1255 OID 82766)
-- Name: insert_floorbylocation(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.insert_floorbylocation() RETURNS trigger
    LANGUAGE plpgsql
    AS $$DECLARE floor integer;
DECLARE createdby character varying;
DECLARE createddate bigint;
DECLARE location character varying;
DECLARE floorno character varying;
BEGIN 
 SELECT s_floor_loc ,s_created_by,d_created_date,s_datacenter_address,n_datacenter_pincode,s_datacenter_landmark INTO floor,createdby,createddate,location FROM tbl_datacenter_location WHERE n_datacenter_id=NEW.n_datacenter_id;

delete from tbl_datacenter_door where n_datacenter_id=NEW.n_datacenter_id;
 FOR doorid IN 1..floor  
   LOOP
	   floorno := concat('Floor','-',doorid);
   
  INSERT INTO tbl_datacenter_door
(	

s_floor_loc ,s_datacenter_location,n_datacenter_id,s_created_by,d_created_date) values(floorno,location,NEW.n_datacenter_id,createdby,createddate);

 END LOOP;

	RETURN NEW;
END;

$$;


ALTER FUNCTION public.insert_floorbylocation() OWNER TO postgres;

--
-- TOC entry 270 (class 1255 OID 115608)
-- Name: new_fields(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.new_fields() RETURNS trigger
    LANGUAGE plpgsql
    AS $$DECLARE tbl_name character varying; 
DECLARE filed_name character varying; 
DECLARE filed_type character varying; 
declare test character varying;
declare test2 character varying;
BEGIN 
 
select s_tbl_name,s_field_nam ,s_field_type into tbl_name,filed_name,filed_type from tbl_custom_fields  WHERE n_customfield_id=NEW.n_customfield_id;
  test := filed_name;
  test2 := filed_type;

if tbl_name = 'tbl_alert_master' then

EXECUTE 'ALTER TABLE tbl_alert_master  ADD COLUMN ' || test ||' varchar(15)';
--EXECUTE 'ALTER TABLE tbl_alert_master  ADD COLUMN ' || test ||' varchar(150)'||',ADD COLUMN '||test2||' varchar(150)';

elseif tbl_name = 'tbl_alert_transaction' then

--EXECUTE 'ALTER TABLE tbl_alert_transaction  ADD COLUMN ' || test ||' varchar(150)'||',ADD COLUMN '||test2||' varchar(150)';

EXECUTE 'ALTER TABLE tbl_alert_transaction  ADD COLUMN ' || test ||' varchar(15)';

elseif tbl_name = 'tbl_system_parameter' then

EXECUTE 'ALTER TABLE tbl_system_parameter  ADD COLUMN ' || test ||' varchar(15)';

elseif tbl_name = 'tbl_role_master' then

EXECUTE 'ALTER TABLE tbl_role_master  ADD COLUMN ' || test ||' varchar(15)';

elseif tbl_name = 'tbl_user_role_mapping' then

EXECUTE 'ALTER TABLE tbl_user_role_mapping  ADD COLUMN ' || test ||' varchar(15)';

elseif tbl_name = 'tbl_status_master' then

EXECUTE 'ALTER TABLE tbl_status_master  ADD COLUMN ' || test ||' varchar(15)';

elseif tbl_name = 'tbl_rake_master' then

EXECUTE 'ALTER TABLE tbl_rake_master  ADD COLUMN ' || test ||' varchar(15)';


elseif tbl_name = 'tbl_racku_master' then

EXECUTE 'ALTER TABLE tbl_racku_master  ADD COLUMN ' || test ||' varchar(15)';

elseif tbl_name = 'tbl_asset_master' then

EXECUTE 'ALTER TABLE tbl_asset_master  ADD COLUMN ' || test ||' varchar(15)';

elseif tbl_name = 'tbl_asset_mapping' then

EXECUTE 'ALTER TABLE tbl_asset_mapping  ADD COLUMN ' || test ||' varchar(15)';

elseif tbl_name = 'tbl_country_master' then

EXECUTE 'ALTER TABLE tbl_country_master  ADD COLUMN ' || test ||' varchar(15)';


elseif tbl_name = 'tbl_state_master' then

EXECUTE 'ALTER TABLE tbl_state_master  ADD COLUMN ' || test ||' varchar(15)';

elseif tbl_name = 'tbl_datacenter_location' then

EXECUTE 'ALTER TABLE tbl_datacenter_location  ADD COLUMN ' || test ||' varchar(15)';

elseif tbl_name = 'tbl_datacenter_room' then

EXECUTE 'ALTER TABLE tbl_datacenter_room  ADD COLUMN ' || test ||' varchar(15)';

elseif tbl_name = 'tbl_custom_fields' then

EXECUTE 'ALTER TABLE tbl_custom_fields  ADD COLUMN ' || test ||' varchar(15)';


END IF;

	RETURN NEW;
END;




$$;


ALTER FUNCTION public.new_fields() OWNER TO postgres;

--
-- TOC entry 259 (class 1255 OID 74518)
-- Name: trigger_delete_racku(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.trigger_delete_racku() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN 

  DELETE FROM tbl_racku_master WHERE n_rake_id = OLD.n_rake_id;
    RETURN OLD;
	
END;
$$;


ALTER FUNCTION public.trigger_delete_racku() OWNER TO postgres;

--
-- TOC entry 260 (class 1255 OID 74519)
-- Name: trigger_delete_rake(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.trigger_delete_rake() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE racku integer;
BEGIN 
SELECT s_racku_no INTO racku FROM tbl_rake_master WHERE n_rake_id=OLD.n_rake_id;
   UPDATE tbl_rake_master SET s_racku_no =racku -1
      WHERE n_rake_id = OLD.n_rake_id;
	  RETURN OLD;
END;
$$;


ALTER FUNCTION public.trigger_delete_rake() OWNER TO postgres;

--
-- TOC entry 261 (class 1255 OID 74520)
-- Name: trigger_image_upload(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.trigger_image_upload() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
         INSERT INTO tbl_attachment_master
(
n_system_param_id,
s_og_name,
s_new_name,
s_path,
s_type,
s_created_by,
d_created_date)
SELECT 
new.n_system_param_id,
s_og_name,
s_new_name,
s_path,
s_type,
s_created_by,
d_created_date
FROM tbl_temp_img 
where s_created_by = new.s_created_by;

delete from tbl_temp_img where s_created_by = new.s_created_by;
 RETURN NEW;
END;
$$;


ALTER FUNCTION public.trigger_image_upload() OWNER TO postgres;

--
-- TOC entry 264 (class 1255 OID 82752)
-- Name: trigger_insert_floor(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.trigger_insert_floor() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE floor integer;
DECLARE createdby character varying;
DECLARE createddate bigint;
DECLARE location character varying;
-- DECLARE n_datacenter_pincode character varying;
-- DECLARE s_datacenter_landmark character varying;
-- DECLARE n_datacenter_pincode integer;
DECLARE floorno character varying;
BEGIN 
 SELECT s_floor_loc ,s_created_by,d_created_date,(s_datacenter_address,n_datacenter_pincode,s_datacenter_landmark) INTO floor,createdby,createddate,location FROM tbl_datacenter_location WHERE n_datacenter_id=NEW.n_datacenter_id;
 FOR floorid IN 1..floor	   
   LOOP
     floorno := concat('FloorId','-',floorid);
-- 	   select s_datacenter_address,s_datacenter_landmark,n_datacenter_pincode into location from tbl_datacenter_location where n_datacenter_id=NEW.n_datacenter_id;

  INSERT INTO tbl_datacenter_door
(	
s_floor_loc ,s_datacenter_location,n_datacenter_id,s_created_by,d_created_date) values(floorno,location,NEW.n_datacenter_id,createdby,createddate);

 END LOOP;
	RETURN NEW;
END;
$$;


ALTER FUNCTION public.trigger_insert_floor() OWNER TO postgres;

--
-- TOC entry 267 (class 1255 OID 74521)
-- Name: trigger_insert_racku(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.trigger_insert_racku() RETURNS trigger
    LANGUAGE plpgsql
    AS $$DECLARE rack integer;
DECLARE createdby character varying;
DECLARE createddate bigint;
DECLARE rackuno character varying;
BEGIN 
 SELECT s_racku_no ,s_created_by,d_created_date INTO rack,createdby,createddate FROM tbl_rake_master WHERE n_rake_id=NEW.n_rake_id;
 FOR rackid IN 1..rack	   
   LOOP
     rackuno := concat('RU','-',rackid);
   
  INSERT INTO tbl_racku_master
(	
s_racku_no,n_rake_id,n_status,s_created_by,d_created_date) values(rackuno,NEW.n_rake_id,'0',createdby,createddate);

 END LOOP;
	RETURN NEW;
END;$$;


ALTER FUNCTION public.trigger_insert_racku() OWNER TO postgres;

--
-- TOC entry 263 (class 1255 OID 74522)
-- Name: trigger_user_seq_no(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.trigger_user_seq_no() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
declare cnt bigint; 
declare seq_no integer;
declare user_seq character varying(500);
declare s_uid character varying(500);
begin
	 
	select count(*),n_seq_no into cnt,seq_no from tbl_seq_no_trigger where s_table_name = 'tbl_user' and s_year = cast(date_part('year', CURRENT_DATE) as character varying) group by n_seq_no;
	   if cnt is null then
	      cnt := 0;
	   end if;
       
	if cnt = 0 then
	   insert into tbl_seq_no_trigger(n_seq_no,s_table_name,s_year)values(1,'tbl_user',cast(date_part('year', CURRENT_DATE) as character varying));
	
	else 
	   update tbl_seq_no_trigger set n_seq_no = seq_no+1 where s_table_name = 'tbl_user' and s_year = cast(date_part('year', CURRENT_DATE) as character varying);
		
	end if;
	select n_seq_no into s_uid from tbl_seq_no_trigger where s_table_name = 'tbl_user' and s_year = cast(date_part('year', CURRENT_DATE) as character varying); 
	user_seq := concat('user','-',s_uid,'-',date_part('year', CURRENT_DATE)); 
	update tbl_user set n_user_seq = user_seq where s_user_id = new.s_user_id;
	RETURN NEW;
end;
$$;


ALTER FUNCTION public.trigger_user_seq_no() OWNER TO postgres;

--
-- TOC entry 271 (class 1255 OID 115609)
-- Name: update_field(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_field() RETURNS trigger
    LANGUAGE plpgsql
    AS $$DECLARE tbl_name character varying; 
DECLARE filed_name character varying; 
DECLARE filed_type character varying; 
declare test character varying;
declare test1 character varying;
declare test2 character varying;

--FOR NEW ADDED DATA
declare test3 character varying;
declare test4 character varying;
declare test5 character varying;

BEGIN 
 
select s_tbl_name,s_field_nam ,s_field_type into tbl_name,filed_name,filed_type from tbl_custom_fields  WHERE d_modified_date=OLD.d_modified_date;
--select OLD.s_tbl_name,OLD.s_field_nam ,OLD.s_field_type,old.n_customfield_id  from tbl_custom_fields;
select s_tbl_name,s_field_nam ,s_field_type into tbl_name,filed_name,filed_type from tbl_custom_fields  WHERE d_modified_date=new.d_modified_date;


test1 := old.s_field_nam;
  test := old.s_tbl_name;
  test2 :=old.s_field_type;
  
    test3 := NEW.s_field_nam;
  test4 := NEW.s_tbl_name;
  test5 :=NEW.s_field_type;


--insert into tbl_demo ( id,phone,phone1,phone2) values (1,test,test1,test3);

--insert into tbl_demo ( id,phone,phone1,phone2) values (2,test3,test4,test5);

if tbl_name = 'tbl_alert_master'  and test1 != test3 then

EXECUTE 'ALTER TABLE tbl_alert_master  RENAME COLUMN ' || test1 || ' TO '|| test3 ;

elseif tbl_name = 'tbl_alert_transaction'  and test1 != test3  then

EXECUTE 'ALTER TABLE tbl_alert_transaction  RENAME COLUMN ' || test1 || ' TO '|| test3 ;


elseif tbl_name = 'tbl_system_parameter'  and test1 != test3  then

EXECUTE 'ALTER TABLE tbl_system_parameter  RENAME COLUMN ' || test1 || ' TO '|| test3 ;

elseif tbl_name = 'tbl_role_master'   and test1 != test3 then

EXECUTE 'ALTER TABLE tbl_role_master  RENAME COLUMN ' || test1 || ' TO '|| test3 ;

elseif tbl_name = 'tbl_user_role_mapping'  and test1 != test3 then

EXECUTE 'ALTER TABLE tbl_user_role_mapping  RENAME COLUMN ' || test1 || ' TO '|| test3 ;

elseif tbl_name = 'tbl_status_master'  and test1 != test3 then

EXECUTE 'ALTER TABLE tbl_status_master  RENAME COLUMN ' || test1 || ' TO '|| test3 ;


elseif tbl_name = 'tbl_rake_master'  and test1 != test3 then

EXECUTE 'ALTER TABLE tbl_rake_master  RENAME COLUMN ' || test1 || ' TO '|| test3 ;

elseif tbl_name = 'tbl_racku_master'  and test1 != test3 then

EXECUTE 'ALTER TABLE tbl_racku_master  RENAME COLUMN ' || test1 || ' TO '|| test3 ;

elseif tbl_name = 'tbl_asset_master'  and test1 != test3 then

EXECUTE 'ALTER TABLE tbl_asset_master  RENAME COLUMN ' || test1 || ' TO '|| test3 ;


elseif tbl_name = 'tbl_asset_mapping'  and test1 != test3 then

EXECUTE 'ALTER TABLE tbl_asset_mapping  RENAME COLUMN ' || test1 || ' TO '|| test3 ;


elseif tbl_name = 'tbl_country_master'  and test1 != test3 then

EXECUTE 'ALTER TABLE tbl_country_master  RENAME COLUMN ' || test1 || ' TO '|| test3 ;

elseif tbl_name = 'tbl_state_master'  and test1 != test3 then

EXECUTE 'ALTER TABLE tbl_state_master  RENAME COLUMN ' || test1 || ' TO '|| test3 ;

elseif tbl_name = 'tbl_datacenter_location' and test1 != test3  then

EXECUTE 'ALTER TABLE tbl_datacenter_location  RENAME COLUMN ' || test1 || ' TO '|| test3 ;

elseif tbl_name = 'tbl_datacenter_room'  and test1 != test3 then

EXECUTE 'ALTER TABLE tbl_datacenter_room  RENAME COLUMN ' || test1 || ' TO '|| test3 ;



elseif tbl_name = 'tbl_custom_fields'  and test1 != test3 then

EXECUTE 'ALTER TABLE tbl_custom_fields  RENAME COLUMN ' || test1 || ' TO '|| test3 ;

else
EXECUTE 'select * from tbl_custom_fields' ;

END IF;

	RETURN OLD;
END;



$$;


ALTER FUNCTION public.update_field() OWNER TO postgres;

--
-- TOC entry 268 (class 1255 OID 82730)
-- Name: update_rack(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_rack() RETURNS trigger
    LANGUAGE plpgsql
    AS $$DECLARE rack integer;
DECLARE rackno integer;
DECLARE createdby character varying;
DECLARE createddate bigint;
DECLARE rackuno character varying;
BEGIN 
SELECT s_racku_no ,s_created_by,d_created_date INTO rack,createdby,createddate FROM tbl_rake_master WHERE n_rake_id=new.n_rake_id;

delete from tbl_racku_master where n_rake_id=new.n_rake_id;
 FOR rackid IN 1..rack  
   LOOP
     rackuno := concat('RU','-',rackid);
   
  INSERT INTO tbl_racku_master
(	
s_racku_no,n_rake_id,n_status,s_created_by,d_created_date) values(rackuno,new.n_rake_id,'0',createdby,createddate);
 END LOOP;
	RETURN NEW;
END;$$;


ALTER FUNCTION public.update_rack() OWNER TO postgres;

--
-- TOC entry 185 (class 1259 OID 74523)
-- Name: alert_seq_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.alert_seq_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.alert_seq_id OWNER TO postgres;

--
-- TOC entry 186 (class 1259 OID 74525)
-- Name: alert_trans_seq_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.alert_trans_seq_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.alert_trans_seq_id OWNER TO postgres;

--
-- TOC entry 187 (class 1259 OID 74527)
-- Name: apis_seq_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.apis_seq_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.apis_seq_id OWNER TO postgres;

--
-- TOC entry 188 (class 1259 OID 74529)
-- Name: asset_log_seq_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.asset_log_seq_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.asset_log_seq_id OWNER TO postgres;

--
-- TOC entry 189 (class 1259 OID 74531)
-- Name: asset_map_seq_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.asset_map_seq_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.asset_map_seq_id OWNER TO postgres;

--
-- TOC entry 190 (class 1259 OID 74533)
-- Name: asset_seq_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.asset_seq_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.asset_seq_id OWNER TO postgres;

--
-- TOC entry 191 (class 1259 OID 74535)
-- Name: country_seq_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.country_seq_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.country_seq_id OWNER TO postgres;

--
-- TOC entry 192 (class 1259 OID 74537)
-- Name: custom_seq_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.custom_seq_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.custom_seq_id OWNER TO postgres;

--
-- TOC entry 193 (class 1259 OID 74539)
-- Name: datacenter_door_seq_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.datacenter_door_seq_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.datacenter_door_seq_id OWNER TO postgres;

--
-- TOC entry 194 (class 1259 OID 74541)
-- Name: datacenter_location_seq_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.datacenter_location_seq_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.datacenter_location_seq_id OWNER TO postgres;

--
-- TOC entry 195 (class 1259 OID 74543)
-- Name: datacenter_room_seq_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.datacenter_room_seq_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.datacenter_room_seq_id OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 74545)
-- Name: user_seq_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_seq_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_seq_id OWNER TO postgres;

SET default_tablespace = '';

--
-- TOC entry 197 (class 1259 OID 74547)
-- Name: tbl_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_user (
    n_user_seq character varying(100),
    s_user_id bigint DEFAULT nextval('public.user_seq_id'::regclass) NOT NULL,
    s_user_name character varying(45) DEFAULT NULL::character varying,
    s_first_name character varying(45) DEFAULT NULL::character varying,
    s_last_name character varying(45) DEFAULT NULL::character varying,
    n_con_number character varying(45) DEFAULT NULL::character varying,
    s_email character varying(100) DEFAULT NULL::character varying,
    d_join_date character varying(45) DEFAULT NULL::character varying,
    s_designation character varying(100) DEFAULT NULL::character varying,
    s_company_name character varying(100) DEFAULT NULL::character varying,
    s_department character varying(100) DEFAULT NULL::character varying,
    s_address character varying(100) DEFAULT NULL::character varying,
    n_active character varying(45) DEFAULT NULL::character varying,
    s_created_by character varying(45) DEFAULT NULL::character varying,
    s_modified_by character varying(45) DEFAULT NULL::character varying,
    d_created_date bigint,
    d_modified_date bigint,
    s_pass character varying(100),
    s_about_me character varying(100),
    n_img_path character varying(200),
    s_role integer,
    n_status integer
);


ALTER TABLE public.tbl_user OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 74567)
-- Name: user_rolemap_seq_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_rolemap_seq_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_rolemap_seq_id OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 74569)
-- Name: tbl_user_role_mapping; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_user_role_mapping (
    s_userrole_id bigint DEFAULT nextval('public.user_rolemap_seq_id'::regclass) NOT NULL,
    s_user_id integer NOT NULL,
    n_role_id integer,
    s_created_by character varying(100),
    d_created_date bigint,
    s_modified_by character varying(100),
    d_modified_date bigint,
    n_status integer
);


ALTER TABLE public.tbl_user_role_mapping OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 107282)
-- Name: login_process; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.login_process AS
 SELECT a.n_user_seq,
    a.s_user_id,
    a.s_user_name,
    a.s_first_name,
    a.s_last_name,
    a.n_con_number,
    a.s_email,
    a.s_designation,
    a.s_department,
    a.n_active,
    a.s_pass,
    a.s_role,
    b.s_user_id AS userid,
    b.n_role_id AS roleid
   FROM public.tbl_user a,
    public.tbl_user_role_mapping b
  WHERE (a.s_user_id = b.s_user_id);


ALTER TABLE public.login_process OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 74573)
-- Name: login_process_old; Type: MATERIALIZED VIEW; Schema: public; Owner: postgres
--

CREATE MATERIALIZED VIEW public.login_process_old
WITH (autovacuum_enabled='false') AS
 SELECT a.n_user_seq,
    a.s_user_id,
    a.s_user_name,
    a.s_first_name,
    a.s_last_name,
    a.n_con_number,
    a.s_email,
    a.d_join_date,
    a.s_designation,
    a.s_company_name,
    a.s_department,
    a.s_address,
    a.n_active,
    a.s_created_by,
    a.s_modified_by,
    a.d_created_date,
    a.d_modified_date,
    a.s_pass,
    a.s_about_me,
    a.n_img_path,
    a.s_role,
    b.s_user_id AS userid,
    b.n_role_id AS roleid
   FROM public.tbl_user a,
    public.tbl_user_role_mapping b
  WHERE (a.s_user_id = b.s_user_id)
  WITH NO DATA;


ALTER TABLE public.login_process_old OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 74580)
-- Name: n_attachment_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.n_attachment_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.n_attachment_id OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 74582)
-- Name: n_img_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.n_img_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.n_img_id OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 74584)
-- Name: n_system_param_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.n_system_param_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.n_system_param_id OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 82749)
-- Name: racku; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.racku (
    s_racku_no integer
);


ALTER TABLE public.racku OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 74586)
-- Name: racku_seq_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.racku_seq_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.racku_seq_id OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 74588)
-- Name: rake_seq_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rake_seq_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rake_seq_id OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 74590)
-- Name: role_seq_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_seq_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_seq_id OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 74592)
-- Name: seq_no_trigger_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_no_trigger_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_no_trigger_id OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 74594)
-- Name: state_seq_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.state_seq_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.state_seq_id OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 74596)
-- Name: status_seq_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.status_seq_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.status_seq_id OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 74598)
-- Name: syslog_seq_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.syslog_seq_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.syslog_seq_id OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 74600)
-- Name: sysparam_seq_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sysparam_seq_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sysparam_seq_id OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 115464)
-- Name: tbl_alert_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_alert_master (
    n_alert_id bigint DEFAULT nextval('public.alert_seq_id'::regclass) NOT NULL,
    n_alert_code character varying(100),
    s_alert_name character varying(100),
    s_type character varying(100),
    s_alert_msg_desc character varying(200),
    s_created_by character varying(100),
    d_created_date bigint,
    s_modified_by character varying(100),
    d_modified_date bigint,
    n_status integer,
    eee character varying(15)
);


ALTER TABLE public.tbl_alert_master OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 74839)
-- Name: tbl_alert_transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_alert_transaction (
    n_alert_trans_id bigint DEFAULT nextval('public.alert_trans_seq_id'::regclass) NOT NULL,
    s_alert_desc character varying(500),
    n_asset_id integer,
    n_u_id integer,
    d_date date,
    n_email character varying(30),
    n_alert_id integer,
    s_notify_user character varying(50),
    s_created_by character varying(100),
    d_created_date bigint,
    s_modified_by character varying(100),
    d_modified_date bigint,
    n_status integer
);


ALTER TABLE public.tbl_alert_transaction OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 74616)
-- Name: tbl_apis; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_apis (
    "loopback api detail" character varying(200)
);


ALTER TABLE public.tbl_apis OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 74619)
-- Name: tbl_asset_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_asset_log (
    n_asset_audit_id bigint DEFAULT nextval('public.asset_log_seq_id'::regclass) NOT NULL,
    n_asset_mapping_id character varying(100) NOT NULL,
    s_status character varying(100),
    d_date date,
    s_user_id character varying(100),
    s_created_by character varying(100),
    s_modified_by character varying(100),
    d_created_date bigint,
    d_modified_date bigint
);


ALTER TABLE public.tbl_asset_log OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 115594)
-- Name: tbl_asset_mapping; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_asset_mapping (
    n_asset_mapping_id bigint DEFAULT nextval('public.asset_map_seq_id'::regclass) NOT NULL,
    d_assign_date date,
    s_created_by character varying(100),
    s_modified_by character varying(100),
    d_created_date bigint,
    d_modified_date bigint,
    n_rake_id integer,
    n_u_id integer,
    n_asset_id integer,
    n_status_no integer,
    n_datacenter_id integer,
    n_door_id integer,
    n_room_id integer,
    n_status integer
);


ALTER TABLE public.tbl_asset_mapping OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 115585)
-- Name: tbl_asset_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_asset_master (
    n_asset_id bigint DEFAULT nextval('public.asset_seq_id'::regclass) NOT NULL,
    s_asset_name character varying(100),
    n_asset_no character varying(100),
    s_manufacturer_name character varying(100),
    s_make character varying(100),
    n_model_no character varying(100),
    s_device_category character varying(100),
    n_serial_number character varying(100),
    n_barcode_number character varying(100),
    s_owner_name character varying(100),
    s_owner_email character varying(100),
    n_u_size character varying(100),
    n_u_position character varying(100),
    d_install_date date,
    n_u_height character varying(100),
    s_supplier character varying(100),
    s_rated_power integer,
    s_rated_current integer,
    n_rated_voltage integer,
    s_maintenance_cycle character varying(100),
    s_contact_person character varying(100),
    n_contact_number bigint,
    d_next_maintenance date,
    s_customized_notes character varying(100),
    n_status integer,
    s_created_by character varying(100),
    d_created_date bigint,
    s_modified_by character varying(100),
    d_modified_date bigint
);


ALTER TABLE public.tbl_asset_master OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 74637)
-- Name: tbl_attachment_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_attachment_master (
    n_attachment_id bigint DEFAULT nextval('public.n_attachment_id'::regclass) NOT NULL,
    s_og_name character varying(500),
    s_new_name character varying(500),
    s_path character varying(500),
    s_type character varying(200),
    s_created_by character varying(200),
    d_created_date bigint,
    "s_modified_by  " character varying(200),
    d_modified_date bigint,
    n_system_param_id bigint
);


ALTER TABLE public.tbl_attachment_master OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 74644)
-- Name: tbl_country_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_country_master (
    n_country_id bigint DEFAULT nextval('public.country_seq_id'::regclass) NOT NULL,
    s_country_name character varying(100),
    s_created_by character varying(100),
    s_modified_by character varying(100),
    d_created_date bigint,
    d_modified_date bigint,
    n_status character(1) DEFAULT 0
);


ALTER TABLE public.tbl_country_master OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 115473)
-- Name: tbl_custom_fields; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_custom_fields (
    n_customfield_id bigint DEFAULT nextval('public.custom_seq_id'::regclass) NOT NULL,
    s_tbl_name character varying(100),
    s_field_nam character varying(100),
    s_field_type character varying(100),
    s_created_by character varying(100),
    d_created_date bigint,
    s_modified_by character varying(100),
    d_modified_date bigint,
    n_status integer,
    s_placeholder character varying(100),
    s_default_val character varying(100)
);


ALTER TABLE public.tbl_custom_fields OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 74655)
-- Name: tbl_datacenter_door; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_datacenter_door (
    n_door_id bigint DEFAULT nextval('public.datacenter_door_seq_id'::regclass) NOT NULL,
    n_datacenter_id integer,
    s_datacenter_location character varying(10000),
    s_door_sensor_id character varying(100),
    s_floor_loc character varying(100),
    s_created_by character varying(100),
    s_modified_by character varying(100),
    d_created_date bigint,
    d_modified_date bigint,
    n_status character(1) DEFAULT 0
);


ALTER TABLE public.tbl_datacenter_door OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 82753)
-- Name: tbl_datacenter_location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_datacenter_location (
    n_datacenter_id bigint DEFAULT nextval('public.datacenter_location_seq_id'::regclass) NOT NULL,
    s_datacenter_desc character varying(200),
    s_datacenter_name character varying(200),
    s_datacenter_address character varying(200),
    n_datacenter_pincode integer,
    s_datacenter_landmark character varying(200),
    n_country_id integer,
    n_state_id integer,
    s_floor_loc integer,
    s_created_by character varying(100),
    s_modified_by character varying(100),
    d_created_date bigint,
    d_modified_date bigint,
    n_status character(1) DEFAULT 0
);


ALTER TABLE public.tbl_datacenter_location OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 74669)
-- Name: tbl_datacenter_room; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_datacenter_room (
    n_room_id bigint DEFAULT nextval('public.datacenter_room_seq_id'::regclass) NOT NULL,
    n_room_no character varying(100),
    s_desc character varying(100),
    n_door_id integer,
    n_datacenter_id integer,
    s_created_by character varying(100),
    s_modified_by character varying(100),
    d_created_date bigint,
    d_modified_date bigint,
    n_status character(1) DEFAULT 0
);


ALTER TABLE public.tbl_datacenter_room OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 74673)
-- Name: tbl_login_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_login_master (
    n_user_id integer NOT NULL,
    s_user_name character varying(45) DEFAULT NULL::character varying,
    n_con_number character varying(45) DEFAULT NULL::character varying,
    s_email character varying(100) DEFAULT NULL::character varying,
    d_dob character varying(45) DEFAULT NULL::character varying,
    n_active character varying(45) DEFAULT NULL::character varying,
    s_role character varying(45) DEFAULT NULL::character varying,
    s_created_by character varying(45) DEFAULT NULL::character varying,
    s_modified_by character varying(45) DEFAULT NULL::character varying,
    d_created_date character varying(50),
    d_modified_date character varying(50),
    s_pass character varying(100),
    s_about_me character varying(100),
    n_img_path character varying(200)
);


ALTER TABLE public.tbl_login_master OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 115573)
-- Name: tbl_racku_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_racku_master (
    n_u_id bigint DEFAULT nextval('public.racku_seq_id'::regclass) NOT NULL,
    s_racku_no character varying(100),
    s_created_by character varying(100),
    s_modified_by character varying(100),
    d_created_date bigint,
    d_modified_date bigint,
    n_rake_id integer,
    n_racku_status integer,
    n_status integer
);


ALTER TABLE public.tbl_racku_master OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 115500)
-- Name: tbl_rake_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_rake_master (
    n_rake_id bigint DEFAULT nextval('public.rake_seq_id'::regclass) NOT NULL,
    s_rake_name character varying(100),
    n_datacenter_id integer,
    s_rake_code character varying(100),
    n_rake_status integer,
    n_status integer,
    n_door_id integer,
    n_room_id integer,
    s_rake_model character varying(100),
    s_created_by character varying(100),
    s_modified_by character varying(100),
    d_created_date bigint,
    d_modified_date bigint,
    s_racku_no integer
);


ALTER TABLE public.tbl_rake_master OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 74701)
-- Name: tbl_role_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_role_master (
    n_role_id bigint DEFAULT nextval('public.role_seq_id'::regclass) NOT NULL,
    s_role_name character varying(100),
    s_created_by character varying(100),
    s_modified_by character varying(100),
    d_created_date bigint,
    d_modified_date bigint,
    n_status integer
);


ALTER TABLE public.tbl_role_master OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 74705)
-- Name: tbl_seq_no_trigger; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_seq_no_trigger (
    tbl_seq_no_trigger_id bigint DEFAULT nextval('public.seq_no_trigger_id'::regclass) NOT NULL,
    n_seq_no integer,
    s_table_name character varying(500),
    s_year character varying(200)
);


ALTER TABLE public.tbl_seq_no_trigger OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 74712)
-- Name: tbl_state_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_state_master (
    n_state_id bigint DEFAULT nextval('public.state_seq_id'::regclass) NOT NULL,
    s_state_name character varying(100),
    s_created_by character varying(100),
    s_modified_by character varying(100),
    d_created_date bigint,
    d_modified_date bigint,
    n_country_id integer,
    n_status character(1) DEFAULT 0
);


ALTER TABLE public.tbl_state_master OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 107272)
-- Name: tbl_status_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_status_master (
    n_status_no bigint DEFAULT nextval('public.status_seq_id'::regclass) NOT NULL,
    s_status_desc character varying(100),
    s_status_name character varying(100),
    s_status_type character varying(100),
    s_status_colorcode character varying(100),
    s_created_by character varying(100),
    s_modified_by character varying(100),
    d_created_date bigint,
    d_modified_date bigint,
    n_status integer
);


ALTER TABLE public.tbl_status_master OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 74723)
-- Name: tbl_system_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_system_logs (
    n_log_id bigint DEFAULT nextval('public.syslog_seq_id'::regclass) NOT NULL,
    s_user_id character varying(100),
    s_desc character varying(100),
    d_date date,
    s_form_name character varying(100),
    s_task_desc character varying(100),
    s_created_by character varying(100),
    s_modified_by character varying(100),
    d_created_date bigint,
    d_modified_date bigint
);


ALTER TABLE public.tbl_system_logs OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 74730)
-- Name: tbl_system_parameter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_system_parameter (
    n_system_param_id bigint DEFAULT nextval('public.n_system_param_id'::regclass) NOT NULL,
    s_email_setting character varying(100),
    s_captha_setting character varying(100),
    s_database_connection_setting character varying(100),
    s_logo character varying(500),
    s_company_name character varying(200),
    s_created_by character varying(150),
    d_created_date bigint,
    s_modified_by character varying(150),
    d_modified_date bigint,
    n_status integer,
    tyuw33333 character varying(15)
);


ALTER TABLE public.tbl_system_parameter OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 74737)
-- Name: tbl_temp_img; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_temp_img (
    n_img_id bigint DEFAULT nextval('public.n_img_id'::regclass) NOT NULL,
    s_og_name character varying(100),
    s_new_name character varying(199),
    s_path character varying(150),
    s_type character varying(100),
    s_created_by character varying(189),
    d_created_date bigint,
    s_modified_by character varying(100),
    d_modified_by bigint
);


ALTER TABLE public.tbl_temp_img OWNER TO postgres;

--
-- TOC entry 2456 (class 0 OID 82749)
-- Dependencies: 226
-- Data for Name: racku; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.racku (s_racku_no) FROM stdin;
-3
\.


--
-- TOC entry 2459 (class 0 OID 115464)
-- Dependencies: 230
-- Data for Name: tbl_alert_master; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_alert_master (n_alert_id, n_alert_code, s_alert_name, s_type, s_alert_msg_desc, s_created_by, d_created_date, s_modified_by, d_modified_date, n_status, eee) FROM stdin;
21	98789	jhjkhwwwww	\N	878d	admin@gmail.com	1599209690552	admin@gmail.com	1599209724484	1	\N
23	7	hghghg	\N	hghj	admin@gmail.com	1599303740249	\N	\N	0	\N
22	388	hjkhjk	\N	jkh	admin@gmail.com	1599209747564	admin@gmail.com	1599303746235	1	\N
\.


--
-- TOC entry 2455 (class 0 OID 74839)
-- Dependencies: 225
-- Data for Name: tbl_alert_transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_alert_transaction (n_alert_trans_id, s_alert_desc, n_asset_id, n_u_id, d_date, n_email, n_alert_id, s_notify_user, s_created_by, d_created_date, s_modified_by, d_modified_date, n_status) FROM stdin;
13	lkjhgf	96	343	2020-09-09	uj@gmail.com	22	kjhg	admin@gmail.com	1599211705090	\N	\N	1
14	jkhgeeeeeeeeeeeeeeeeeeeeeeeeeeeeee	105	398	2020-06-03	inbv@gmail.com	21	weeee	admin@gmail.com	1599211728626	admin@gmail.com	1599303768616	0
\.


--
-- TOC entry 2442 (class 0 OID 74616)
-- Dependencies: 212
-- Data for Name: tbl_apis; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_apis ("loopback api detail") FROM stdin;
\.


--
-- TOC entry 2443 (class 0 OID 74619)
-- Dependencies: 213
-- Data for Name: tbl_asset_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_asset_log (n_asset_audit_id, n_asset_mapping_id, s_status, d_date, s_user_id, s_created_by, s_modified_by, d_created_date, d_modified_date) FROM stdin;
\.


--
-- TOC entry 2464 (class 0 OID 115594)
-- Dependencies: 235
-- Data for Name: tbl_asset_mapping; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_asset_mapping (n_asset_mapping_id, d_assign_date, s_created_by, s_modified_by, d_created_date, d_modified_date, n_rake_id, n_u_id, n_asset_id, n_status_no, n_datacenter_id, n_door_id, n_room_id, n_status) FROM stdin;
37	2020-09-05	operational@gmail.com	\N	1599303264270	\N	94	398	105	54	69	161	95	0
\.


--
-- TOC entry 2463 (class 0 OID 115585)
-- Dependencies: 234
-- Data for Name: tbl_asset_master; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_asset_master (n_asset_id, s_asset_name, n_asset_no, s_manufacturer_name, s_make, n_model_no, s_device_category, n_serial_number, n_barcode_number, s_owner_name, s_owner_email, n_u_size, n_u_position, d_install_date, n_u_height, s_supplier, s_rated_power, s_rated_current, n_rated_voltage, s_maintenance_cycle, s_contact_person, n_contact_number, d_next_maintenance, s_customized_notes, n_status, s_created_by, d_created_date, s_modified_by, d_modified_date) FROM stdin;
105	laptop	heegwey	heyugr32yr	hyg324y3	2hy3g24	hiueg324	h1u32g42	hue23	uq13u2	W@gmail.com	dyewfg	weyw	2003-04-03	hdewuydwef	hwedewdww	11	55	555	2	whuwewewe	3333	2007-01-04	hdgwdgwdwedh	0	operational@gmail.com	1599303159809	operational@gmail.com	1599303176987
106	Ipod	qwy	wgeq	yeq	gywqw	w	wy	w	yw	qwe@GMAIL.COM	ywy	qwy	2002-02-01	HWQE	hquwq	22	22	22	3	YUDGQWY	4565	2005-02-02	HDAA	0	operational@gmail.com	1599303159807	operational@gmail.com	1599303227609
107	Mobile	vvv	vvv	vvv	vvv	vv	vvv	vv	vv	vv@gmail.com	vv	jh	2020-09-07	uy	uy	555	55	55	3	trtyr	33333	2020-07-08	3333	1	operational@gmail.com	1599303159810	operational@gmail.com	1599303210930
\.


--
-- TOC entry 2444 (class 0 OID 74637)
-- Dependencies: 214
-- Data for Name: tbl_attachment_master; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_attachment_master (n_attachment_id, s_og_name, s_new_name, s_path, s_type, s_created_by, d_created_date, "s_modified_by  ", d_modified_date, n_system_param_id) FROM stdin;
1	purchase-order (1).png	1592993296248-purchase-order (1).png	/assets/img/logos/1592993296248-purchase-order (1).png	logo	afrin@gmail.com	1592993296252	\N	\N	1
2	iconfinder_order_59488.png	1592993321980-iconfinder_order_59488.png	/assets/img/logos/1592993321980-iconfinder_order_59488.png		afrin@gmail.com	1592993321985	\N	\N	1
9	2.jpg	1594104716474-2.jpg	/assets/img/logos/1594104716474-2.jpg	logo	xyz@gmail.com	1594104716483	\N	\N	3
16	Aboutedu banner.png	1599296555224-Aboutedu banner.png	/assets/img/logos/1599296555224-Aboutedu banner.png	logo	admin@gmail.com	1599296555232	\N	\N	7
17	asp.net.png	1599296687468-asp.net.png	/assets/img/logos/1599296687468-asp.net.png	logo	admin@gmail.com	1599296687476	\N	\N	9
18	emailw.jpg	1599296708595-emailw.jpg	/assets/img/logos/1599296708595-emailw.jpg	logo	admin@gmail.com	1599296708600	\N	\N	10
\.


--
-- TOC entry 2445 (class 0 OID 74644)
-- Dependencies: 215
-- Data for Name: tbl_country_master; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_country_master (n_country_id, s_country_name, s_created_by, s_modified_by, d_created_date, d_modified_date, n_status) FROM stdin;
39	hhgh	admin@gmail.com	\N	1599225825158	\N	1
38	india	admin@gmail.com	admin@gmail.com	1599225807060	1599300771138	0
40	japan	admin@gmail.com	\N	1599300775754	\N	0
41	china	admin@gmail.com	\N	1599300781808	\N	1
\.


--
-- TOC entry 2460 (class 0 OID 115473)
-- Dependencies: 231
-- Data for Name: tbl_custom_fields; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_custom_fields (n_customfield_id, s_tbl_name, s_field_nam, s_field_type, s_created_by, d_created_date, s_modified_by, d_modified_date, n_status, s_placeholder, s_default_val) FROM stdin;
13	tbl_alert_trasaction	hu	Date	admin@gmail.com	1599210608240	\N	\N	1	\N	\N
12	tbl_alert_master	uyiy	Currency	admin@gmail.com	1599210444257	\N	\N	1	\N	\N
15	tbl_alert_master	eee	Number	admin@gmail.com	1599299579099	admin@gmail.com	1599299632082	0	88ui	uyiy
14	tbl_system_parameter	uyuyeeeee	Select	admin@gmail.com	1599210623496	1599210635865	1599210635859	1	\N	\N
18	tbl_system_parameter	tyuw33333	File	admin@gmail.com	1599303481140	admin@gmail.com	1599303488712	1	yuyuy	uyuy
\.


--
-- TOC entry 2446 (class 0 OID 74655)
-- Dependencies: 216
-- Data for Name: tbl_datacenter_door; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_datacenter_door (n_door_id, n_datacenter_id, s_datacenter_location, s_door_sensor_id, s_floor_loc, s_created_by, s_modified_by, d_created_date, d_modified_date, n_status) FROM stdin;
164	70	dc11	\N	Floor-1	operational@gmail.com	\N	1599302507106	\N	0
162	69	Nerul 20 nilkamal,near railway station,7878999	2	Floor-2	operational@gmail.com	operational@gmail.com	1599302473057	1599302575619	0
161	69	Nerul 20 nilkamal,near railway station,7878999	2	Floor-1	operational@gmail.com	operational@gmail.com	1599302473057	1599302582906	0
168	71	www	\N	Floor-2	operational@gmail.com	\N	1599302636300	\N	1
167	71	www	\N	Floor-1	operational@gmail.com	\N	1599302636300	\N	1
\.


--
-- TOC entry 2457 (class 0 OID 82753)
-- Dependencies: 227
-- Data for Name: tbl_datacenter_location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_datacenter_location (n_datacenter_id, s_datacenter_desc, s_datacenter_name, s_datacenter_address, n_datacenter_pincode, s_datacenter_landmark, n_country_id, n_state_id, s_floor_loc, s_created_by, s_modified_by, d_created_date, d_modified_date, n_status) FROM stdin;
69	dc1	dc1	Nerul 20 nilkamal	7878999	near railway station	38	41	2	operational@gmail.com	\N	1599302473057	\N	0
70	dc11	dc11	dc11	5678833	jhg	38	43	1	operational@gmail.com	\N	1599302507106	\N	1
71	www	ww	www	3333333	www	40	44	2	operational@gmail.com	\N	1599302636300	\N	1
\.


--
-- TOC entry 2447 (class 0 OID 74669)
-- Dependencies: 217
-- Data for Name: tbl_datacenter_room; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_datacenter_room (n_room_id, n_room_no, s_desc, n_door_id, n_datacenter_id, s_created_by, s_modified_by, d_created_date, d_modified_date, n_status) FROM stdin;
95	room no 01	server	161	69	operational@gmail.com	\N	1599302820982	\N	0
94	Room no 001	sever room	162	69	operational@gmail.com	operational@gmail.com	1599302692201	1599302835590	0
\.


--
-- TOC entry 2448 (class 0 OID 74673)
-- Dependencies: 218
-- Data for Name: tbl_login_master; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_login_master (n_user_id, s_user_name, n_con_number, s_email, d_dob, n_active, s_role, s_created_by, s_modified_by, d_created_date, d_modified_date, s_pass, s_about_me, n_img_path) FROM stdin;
1	\N	\N	abc@gmail.com	\N	1	\N	\N	\N	\N	\N	\N	\N	\N
1	\N	\N	abc@gmail.com	\N	1	\N	\N	\N	\N	\N	\N	\N	\N
\.


--
-- TOC entry 2462 (class 0 OID 115573)
-- Dependencies: 233
-- Data for Name: tbl_racku_master; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_racku_master (n_u_id, s_racku_no, s_created_by, s_modified_by, d_created_date, d_modified_date, n_rake_id, n_racku_status, n_status) FROM stdin;
394	RU-1	operational@gmail.com	\N	1599230487647	\N	93	\N	1
395	RU-2	operational@gmail.com	\N	1599230487647	\N	93	\N	1
399	RU-2	operational@gmail.com	\N	1599302897653	\N	94	\N	0
398	RU-1	operational@gmail.com	operational@gmail.com	1599302897653	1599302975621	94	59	0
402	RU-1	operational@gmail.com	\N	1599302951020	\N	95	\N	1
403	RU-2	operational@gmail.com	\N	1599302951020	\N	95	\N	1
\.


--
-- TOC entry 2461 (class 0 OID 115500)
-- Dependencies: 232
-- Data for Name: tbl_rake_master; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_rake_master (n_rake_id, s_rake_name, n_datacenter_id, s_rake_code, n_rake_status, n_status, n_door_id, n_room_id, s_rake_model, s_created_by, s_modified_by, d_created_date, d_modified_date, s_racku_no) FROM stdin;
93	rak001	64	er3	51	1	146	92	234	operational@gmail.com	\N	1599230487647	\N	2
94	rake 01	69	rake1	52	0	161	95	23	operational@gmail.com	operational@gmail.com	1599302897653	1599302922038	2
95	rak_3	69	qw	60	1	161	95	43	operational@gmail.com	\N	1599302951020	\N	2
\.


--
-- TOC entry 2449 (class 0 OID 74701)
-- Dependencies: 219
-- Data for Name: tbl_role_master; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_role_master (n_role_id, s_role_name, s_created_by, s_modified_by, d_created_date, d_modified_date, n_status) FROM stdin;
26	ADMIN	admin@gmail.com	\N	1599216086654	\N	0
27	OPERATIONAL	admin@gmail.com	\N	1599216091971	\N	0
28	USER	admin@gmail.com	\N	1599216095116	\N	0
29	SSS22	admin@gmail.com	admin@gmail.com	1599303387355	1599303393816	1
\.


--
-- TOC entry 2450 (class 0 OID 74705)
-- Dependencies: 220
-- Data for Name: tbl_seq_no_trigger; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_seq_no_trigger (tbl_seq_no_trigger_id, n_seq_no, s_table_name, s_year) FROM stdin;
3	47	tbl_user	2020
\.


--
-- TOC entry 2451 (class 0 OID 74712)
-- Dependencies: 221
-- Data for Name: tbl_state_master; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_state_master (n_state_id, s_state_name, s_created_by, s_modified_by, d_created_date, d_modified_date, n_country_id, n_status) FROM stdin;
41	maharashtraa	admin@gmail.com	admin@gmail.com	1599225966754	1599225976014	38	0
42	sss	admin@gmail.com	\N	1599225980682	\N	38	1
43	Pune	admin@gmail.com	\N	1599300796164	\N	38	0
44	Tokiyo	admin@gmail.com	\N	1599300802449	\N	40	0
45	test	admin@gmail.com	\N	1599300807961	\N	38	1
\.


--
-- TOC entry 2458 (class 0 OID 107272)
-- Dependencies: 228
-- Data for Name: tbl_status_master; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_status_master (n_status_no, s_status_desc, s_status_name, s_status_type, s_status_colorcode, s_created_by, s_modified_by, d_created_date, d_modified_date, n_status) FROM stdin;
55	Booked	Booked	racku	#f23202	john123@gmail.com	admin@gmail.com	1596786520801	1599055756692	0
51	idle	Idle	rake	#f6f4f4	john123@gmail.com	admin@gmail.com	1596785645931	1599055762048	0
54	maintenance	maintenance	asset	#78f226	john123@gmail.com	admin@gmail.com	1596786415602	1599055766882	0
57	misplaced asset	misplaced asset	asset map	#ff0000	john123@gmail.com	admin@gmail.com	1596786592245	1599055783830	0
59	RU plan (Remove)	RU plan (Remove)	racku	#fbff00	john123@gmail.com	admin@gmail.com	1596786694344	1599055787405	0
58	RU Plan(Add)	RU Plan(Add)	racku	#f358ba	john123@gmail.com	admin@gmail.com	1596786637044	1599055790765	0
52	Used	Used	rake	#076e0e	john123@gmail.com	admin@gmail.com	1596785709281	1599055794145	0
53	Used Multiple(U)	Used Multiple(U)	asset	#1723cf	john123@gmail.com	admin@gmail.com	1596785736377	1599055797534	1
56	Alarm color	Alarm Color	asset mapp	#ff0000	john123@gmail.com	admin@gmail.com	1596786556626	1599055734540	1
60	blank tag	blank tag	rake	#ff0000	john123@gmail.com	admin@gmail.com	1596786720672	1599055742176	1
62	nnnnwwwwww	nnnnww	nnn	#050505	admin@gmail.com	admin@gmail.com	1599152400536	1599152426929	1
64	hjh	h33	hhhj	#bf9292	admin@gmail.com	admin@gmail.com	1599208322066	1599208328482	1
63	vnv	bvb3333	bnv	#8a8585	admin@gmail.com	admin@gmail.com	1599195266050	1599196578578	1
65	booked	booked	booked	#2e1414	admin@gmail.com	\N	1599223497733	\N	1
67	jjj	booked	racku	#ff0000	admin@gmail.com	\N	1599223582782	\N	1
66	dd	Booked	booked	#ff0000	admin@gmail.com	\N	1599223521866	\N	1
68	hjkhjh	jhhj	jk	#ff0000	admin@gmail.com	\N	1599224329331	\N	1
69	hjkh	test	testww	#ff0000	admin@gmail.com	admin@gmail.com	1599303509531	1599303720221	1
\.


--
-- TOC entry 2452 (class 0 OID 74723)
-- Dependencies: 222
-- Data for Name: tbl_system_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_system_logs (n_log_id, s_user_id, s_desc, d_date, s_form_name, s_task_desc, s_created_by, s_modified_by, d_created_date, d_modified_date) FROM stdin;
\.


--
-- TOC entry 2453 (class 0 OID 74730)
-- Dependencies: 223
-- Data for Name: tbl_system_parameter; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_system_parameter (n_system_param_id, s_email_setting, s_captha_setting, s_database_connection_setting, s_logo, s_company_name, s_created_by, d_created_date, s_modified_by, d_modified_date, n_status, tyuw33333) FROM stdin;
10	nbmbmn	nmbmnbnm	b	\N	nmb	admin@gmail.com	1599296710446	\N	\N	0	\N
9	oiiiiiii	iiiiiiiiiiiiii	ougv	\N	hj	admin@gmail.com	1599296690786	\N	\N	1	\N
\.


--
-- TOC entry 2454 (class 0 OID 74737)
-- Dependencies: 224
-- Data for Name: tbl_temp_img; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_temp_img (n_img_id, s_og_name, s_new_name, s_path, s_type, s_created_by, d_created_date, s_modified_by, d_modified_by) FROM stdin;
\.


--
-- TOC entry 2427 (class 0 OID 74547)
-- Dependencies: 197
-- Data for Name: tbl_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_user (n_user_seq, s_user_id, s_user_name, s_first_name, s_last_name, n_con_number, s_email, d_join_date, s_designation, s_company_name, s_department, s_address, n_active, s_created_by, s_modified_by, d_created_date, d_modified_date, s_pass, s_about_me, n_img_path, s_role, n_status) FROM stdin;
user-46-2020	44	operational	operational	operationalll	987654	operational@gmail.com	2020-06-06	Software Develpoer	Apponext	IT	 paradise -  nerul west	1	admin@gmail.com	\N	1599212692591	\N	123	hello	\N	27	0
user-45-2020	43	admin	admin	admin	234567	admin@gmail.com	2020-07-07	Softtware Developer	Apponext	IT	Nerul  sec -20	1	admin@gmail.com	\N	1599212613620	\N	123	hi 	/assets/img/avatars/1599222495763-1592349416973-RDJ-Tony-Stark.jpg	28	0
user-47-2020	45	tony22	tony	tony33	45678	tony@gmail.com	2020-08-07	werty	rtyu	rtyu	rty	1	admin@gmail.com	admin@gmail.com	1599303362229	1599303379376	123	rty	\N	29	1
\.


--
-- TOC entry 2429 (class 0 OID 74569)
-- Dependencies: 199
-- Data for Name: tbl_user_role_mapping; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_user_role_mapping (s_userrole_id, s_user_id, n_role_id, s_created_by, d_created_date, s_modified_by, d_modified_date, n_status) FROM stdin;
48	43	26	admin@gmail.com	1599222224720	\N	\N	0
49	44	27	admin@gmail.com	1599224424098	\N	\N	0
51	45	27	admin@gmail.com	1599303401026	\N	1599303408529	1
\.


--
-- TOC entry 2470 (class 0 OID 0)
-- Dependencies: 185
-- Name: alert_seq_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.alert_seq_id', 23, true);


--
-- TOC entry 2471 (class 0 OID 0)
-- Dependencies: 186
-- Name: alert_trans_seq_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.alert_trans_seq_id', 14, true);


--
-- TOC entry 2472 (class 0 OID 0)
-- Dependencies: 187
-- Name: apis_seq_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.apis_seq_id', 1, false);


--
-- TOC entry 2473 (class 0 OID 0)
-- Dependencies: 188
-- Name: asset_log_seq_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.asset_log_seq_id', 1, false);


--
-- TOC entry 2474 (class 0 OID 0)
-- Dependencies: 189
-- Name: asset_map_seq_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.asset_map_seq_id', 37, true);


--
-- TOC entry 2475 (class 0 OID 0)
-- Dependencies: 190
-- Name: asset_seq_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.asset_seq_id', 107, true);


--
-- TOC entry 2476 (class 0 OID 0)
-- Dependencies: 191
-- Name: country_seq_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.country_seq_id', 41, true);


--
-- TOC entry 2477 (class 0 OID 0)
-- Dependencies: 192
-- Name: custom_seq_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.custom_seq_id', 18, true);


--
-- TOC entry 2478 (class 0 OID 0)
-- Dependencies: 193
-- Name: datacenter_door_seq_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.datacenter_door_seq_id', 168, true);


--
-- TOC entry 2479 (class 0 OID 0)
-- Dependencies: 194
-- Name: datacenter_location_seq_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.datacenter_location_seq_id', 71, true);


--
-- TOC entry 2480 (class 0 OID 0)
-- Dependencies: 195
-- Name: datacenter_room_seq_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.datacenter_room_seq_id', 95, true);


--
-- TOC entry 2481 (class 0 OID 0)
-- Dependencies: 201
-- Name: n_attachment_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.n_attachment_id', 18, true);


--
-- TOC entry 2482 (class 0 OID 0)
-- Dependencies: 202
-- Name: n_img_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.n_img_id', 10, true);


--
-- TOC entry 2483 (class 0 OID 0)
-- Dependencies: 203
-- Name: n_system_param_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.n_system_param_id', 10, true);


--
-- TOC entry 2484 (class 0 OID 0)
-- Dependencies: 204
-- Name: racku_seq_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.racku_seq_id', 403, true);


--
-- TOC entry 2485 (class 0 OID 0)
-- Dependencies: 205
-- Name: rake_seq_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rake_seq_id', 95, true);


--
-- TOC entry 2486 (class 0 OID 0)
-- Dependencies: 206
-- Name: role_seq_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_seq_id', 29, true);


--
-- TOC entry 2487 (class 0 OID 0)
-- Dependencies: 207
-- Name: seq_no_trigger_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_no_trigger_id', 3, true);


--
-- TOC entry 2488 (class 0 OID 0)
-- Dependencies: 208
-- Name: state_seq_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.state_seq_id', 45, true);


--
-- TOC entry 2489 (class 0 OID 0)
-- Dependencies: 209
-- Name: status_seq_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.status_seq_id', 69, true);


--
-- TOC entry 2490 (class 0 OID 0)
-- Dependencies: 210
-- Name: syslog_seq_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.syslog_seq_id', 1, false);


--
-- TOC entry 2491 (class 0 OID 0)
-- Dependencies: 211
-- Name: sysparam_seq_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sysparam_seq_id', 1, false);


--
-- TOC entry 2492 (class 0 OID 0)
-- Dependencies: 198
-- Name: user_rolemap_seq_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_rolemap_seq_id', 51, true);


--
-- TOC entry 2493 (class 0 OID 0)
-- Dependencies: 196
-- Name: user_seq_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_seq_id', 45, true);


--
-- TOC entry 2275 (class 2606 OID 115472)
-- Name: tbl_alert_master tbl_alert_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_alert_master
    ADD CONSTRAINT tbl_alert_master_pkey PRIMARY KEY (n_alert_id);


--
-- TOC entry 2269 (class 2606 OID 74847)
-- Name: tbl_alert_transaction tbl_alert_transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_alert_transaction
    ADD CONSTRAINT tbl_alert_transaction_pkey PRIMARY KEY (n_alert_trans_id);


--
-- TOC entry 2247 (class 2606 OID 74749)
-- Name: tbl_asset_log tbl_asset_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_asset_log
    ADD CONSTRAINT tbl_asset_log_pkey PRIMARY KEY (n_asset_audit_id);


--
-- TOC entry 2285 (class 2606 OID 115599)
-- Name: tbl_asset_mapping tbl_asset_mapping_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_asset_mapping
    ADD CONSTRAINT tbl_asset_mapping_pkey PRIMARY KEY (n_asset_mapping_id);


--
-- TOC entry 2283 (class 2606 OID 115593)
-- Name: tbl_asset_master tbl_asset_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_asset_master
    ADD CONSTRAINT tbl_asset_master_pkey PRIMARY KEY (n_asset_id);


--
-- TOC entry 2249 (class 2606 OID 74755)
-- Name: tbl_attachment_master tbl_attachment_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_attachment_master
    ADD CONSTRAINT tbl_attachment_master_pkey PRIMARY KEY (n_attachment_id);


--
-- TOC entry 2251 (class 2606 OID 74757)
-- Name: tbl_country_master tbl_country_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_country_master
    ADD CONSTRAINT tbl_country_master_pkey PRIMARY KEY (n_country_id);


--
-- TOC entry 2277 (class 2606 OID 115481)
-- Name: tbl_custom_fields tbl_custom_fields_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_custom_fields
    ADD CONSTRAINT tbl_custom_fields_pkey PRIMARY KEY (n_customfield_id);


--
-- TOC entry 2253 (class 2606 OID 74761)
-- Name: tbl_datacenter_door tbl_datacenter_door_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_datacenter_door
    ADD CONSTRAINT tbl_datacenter_door_pkey PRIMARY KEY (n_door_id);


--
-- TOC entry 2255 (class 2606 OID 74763)
-- Name: tbl_datacenter_room tbl_datacenter_room_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_datacenter_room
    ADD CONSTRAINT tbl_datacenter_room_pkey PRIMARY KEY (n_room_id);


--
-- TOC entry 2271 (class 2606 OID 82761)
-- Name: tbl_datacenter_location tbl_datcenter_location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_datacenter_location
    ADD CONSTRAINT tbl_datcenter_location_pkey PRIMARY KEY (n_datacenter_id);


--
-- TOC entry 2279 (class 2606 OID 115508)
-- Name: tbl_rake_master tbl_rack_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_rake_master
    ADD CONSTRAINT tbl_rack_master_pkey PRIMARY KEY (n_rake_id);


--
-- TOC entry 2281 (class 2606 OID 115578)
-- Name: tbl_racku_master tbl_racku_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_racku_master
    ADD CONSTRAINT tbl_racku_master_pkey PRIMARY KEY (n_u_id);


--
-- TOC entry 2257 (class 2606 OID 74771)
-- Name: tbl_role_master tbl_role_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_role_master
    ADD CONSTRAINT tbl_role_master_pkey PRIMARY KEY (n_role_id);


--
-- TOC entry 2259 (class 2606 OID 74773)
-- Name: tbl_seq_no_trigger tbl_seq_no_trigger_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_seq_no_trigger
    ADD CONSTRAINT tbl_seq_no_trigger_pkey PRIMARY KEY (tbl_seq_no_trigger_id);


--
-- TOC entry 2261 (class 2606 OID 74775)
-- Name: tbl_state_master tbl_state_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_state_master
    ADD CONSTRAINT tbl_state_master_pkey PRIMARY KEY (n_state_id);


--
-- TOC entry 2273 (class 2606 OID 107280)
-- Name: tbl_status_master tbl_status_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_status_master
    ADD CONSTRAINT tbl_status_master_pkey PRIMARY KEY (n_status_no);


--
-- TOC entry 2263 (class 2606 OID 74779)
-- Name: tbl_system_logs tbl_system_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_system_logs
    ADD CONSTRAINT tbl_system_logs_pkey PRIMARY KEY (n_log_id);


--
-- TOC entry 2265 (class 2606 OID 74781)
-- Name: tbl_system_parameter tbl_system_parameter_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_system_parameter
    ADD CONSTRAINT tbl_system_parameter_pkey PRIMARY KEY (n_system_param_id);


--
-- TOC entry 2267 (class 2606 OID 74783)
-- Name: tbl_temp_img tbl_temp_img_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_temp_img
    ADD CONSTRAINT tbl_temp_img_pkey PRIMARY KEY (n_img_id);


--
-- TOC entry 2243 (class 2606 OID 74785)
-- Name: tbl_user tbl_user_pkey1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_user
    ADD CONSTRAINT tbl_user_pkey1 PRIMARY KEY (s_user_id);


--
-- TOC entry 2245 (class 2606 OID 74787)
-- Name: tbl_user_role_mapping tbl_user_role_mapping_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_user_role_mapping
    ADD CONSTRAINT tbl_user_role_mapping_pkey PRIMARY KEY (s_userrole_id);


--
-- TOC entry 2293 (class 2620 OID 115613)
-- Name: tbl_custom_fields delete_fields; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER delete_fields BEFORE DELETE ON public.tbl_custom_fields FOR EACH ROW EXECUTE PROCEDURE public.delete_fields();


--
-- TOC entry 2290 (class 2620 OID 82774)
-- Name: tbl_datacenter_location delete_floor_onlocation_delete; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER delete_floor_onlocation_delete AFTER DELETE ON public.tbl_datacenter_location FOR EACH ROW EXECUTE PROCEDURE public.delete_floor_onlocation_delete();


--
-- TOC entry 2286 (class 2620 OID 74788)
-- Name: tbl_user func_triger_insert_user; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER func_triger_insert_user AFTER INSERT ON public.tbl_user FOR EACH ROW EXECUTE PROCEDURE public.trigger_user_seq_no();


--
-- TOC entry 2291 (class 2620 OID 115611)
-- Name: tbl_custom_fields insert_fields; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER insert_fields AFTER INSERT ON public.tbl_custom_fields FOR EACH ROW EXECUTE PROCEDURE public.new_fields();


--
-- TOC entry 2289 (class 2620 OID 82772)
-- Name: tbl_datacenter_location insert_floor; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER insert_floor AFTER INSERT ON public.tbl_datacenter_location FOR EACH ROW EXECUTE PROCEDURE public.insert_floor();


--
-- TOC entry 2287 (class 2620 OID 74791)
-- Name: tbl_system_parameter trigger_image_upload; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_image_upload AFTER INSERT ON public.tbl_system_parameter FOR EACH ROW EXECUTE PROCEDURE public.trigger_image_upload();


--
-- TOC entry 2294 (class 2620 OID 115509)
-- Name: tbl_rake_master trigger_insert_racku; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_insert_racku AFTER INSERT ON public.tbl_rake_master FOR EACH ROW EXECUTE PROCEDURE public.trigger_insert_racku();


--
-- TOC entry 2292 (class 2620 OID 115612)
-- Name: tbl_custom_fields update_fields; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_fields AFTER UPDATE ON public.tbl_custom_fields FOR EACH ROW EXECUTE PROCEDURE public.update_field();


--
-- TOC entry 2288 (class 2620 OID 82767)
-- Name: tbl_datacenter_location update_floorbylocation; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_floorbylocation AFTER UPDATE ON public.tbl_datacenter_location FOR EACH ROW EXECUTE PROCEDURE public.insert_floorbylocation();


--
-- TOC entry 2295 (class 2620 OID 115510)
-- Name: tbl_rake_master update_rake; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_rake AFTER UPDATE ON public.tbl_rake_master FOR EACH ROW EXECUTE PROCEDURE public.update_rack();


--
-- TOC entry 2430 (class 0 OID 74573)
-- Dependencies: 200 2466
-- Name: login_process_old; Type: MATERIALIZED VIEW DATA; Schema: public; Owner: postgres
--

REFRESH MATERIALIZED VIEW public.login_process_old;


-- Completed on 2020-09-05 16:34:04

--
-- PostgreSQL database dump complete
--

