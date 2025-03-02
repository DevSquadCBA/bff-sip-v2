const {Handler:CountFunction} = require('../.aws-sam/build/CountFunction/count.js');
const {Handler:CreateClientFunction} = require('../.aws-sam/build/CreateClientFunction/createClient.js');
const {Handler:CreateUserFunction} = require('../.aws-sam/build/CreateUserFunction/createUser.js');
const {Handler:DeleteClientFunction} = require('../.aws-sam/build/DeleteClientFunction/deleteClient.js');
const {Handler:FakeDataFunction} = require('../.aws-sam/build/FakeDataFunction/fakeData.js');
const {Handler:GetClientByIdFunction} = require('../.aws-sam/build/GetClientByIdFunction/getClientById.js');
const {Handler:GetClientsFunction} = require('../.aws-sam/build/GetClientsFunction/getClients.js');
const {Handler:GetClientsListFunction} = require('../.aws-sam/build/GetClientsListFunction/getClientsList.js');
const {Handler:GetUsersFunction} = require('../.aws-sam/build/GetUsersFunction/getUsers.js');
const {Handler:HealthFunction} = require('../.aws-sam/build/HealthFunction/health.js');
const {Handler:LoginFunction} = require('../.aws-sam/build/LoginFunction/login.js');
const {Handler:SyncDbFunction} = require('../.aws-sam/build/SyncDbFunction/syncDb.js');
const {Handler:UpdateClientFunction} = require('../.aws-sam/build/UpdateClientFunction/updateClient.js');
module.exports={
    CountFunction,
    CreateClientFunction,
    CreateUserFunction,
    DeleteClientFunction,
    FakeDataFunction,
    GetClientByIdFunction,
    GetClientsFunction,
    GetClientsListFunction,
    GetUsersFunction,
    HealthFunction,
    LoginFunction,
    SyncDbFunction,
    UpdateClientFunction,
}