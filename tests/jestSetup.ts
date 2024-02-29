import 'aws-sdk-client-mock-jest';
import * as iconv from 'iconv-lite';
iconv.encodingExists('foo');

process.env.DEBUG = 'true';
process.env.NODE_ENV = 'test';
process.env.HOST = "192.168.1.32",
process.env.USER = "root",
process.env.PASS = "1234",
process.env.DB = "piatti",
process.env.DEBUG = "true"