
CREATE DATABASE dbCodeGenerator;
Go

USE dbCodeGenerator;

CREATE LOGIN tester WITH PASSWORD = 'test', CHECK_POLICY = OFF;
CREATE USER tester FOR LOGIN tester;

ALTER ROLE db_owner ADD MEMBER tester;