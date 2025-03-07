const {Handler:AddDetailsToProductsFunction} = require('../.aws-sam/build/AddDetailsToProductsFunction/addDetailsToProducts.js');
const {Handler:AddOrRemoveProductsFunction} = require('../.aws-sam/build/AddOrRemoveProductsFunction/addOrRemoveProducts.js');
const {Handler:AddPaymentToSaleFunction} = require('../.aws-sam/build/AddPaymentToSaleFunction/addPaymentToSale.js');
const {Handler:CountFunction} = require('../.aws-sam/build/CountFunction/count.js');
const {Handler:CreateClientFunction} = require('../.aws-sam/build/CreateClientFunction/createClient.js');
const {Handler:CreateProductFunction} = require('../.aws-sam/build/CreateProductFunction/createProduct.js');
const {Handler:CreateProviderFunction} = require('../.aws-sam/build/CreateProviderFunction/createProvider.js');
const {Handler:CreateSaleFunction} = require('../.aws-sam/build/CreateSaleFunction/createSale.js');
const {Handler:CreateUserFunction} = require('../.aws-sam/build/CreateUserFunction/createUser.js');
const {Handler:DeleteClientFunction} = require('../.aws-sam/build/DeleteClientFunction/deleteClient.js');
const {Handler:DeleteProductFunction} = require('../.aws-sam/build/DeleteProductFunction/deleteProduct.js');
const {Handler:DeleteProviderFunction} = require('../.aws-sam/build/DeleteProviderFunction/deleteProvider.js');
const {Handler:DeleteSaleFunction} = require('../.aws-sam/build/DeleteSaleFunction/deleteSale.js');
const {Handler:DeleteUserFunction} = require('../.aws-sam/build/DeleteUserFunction/deleteUser.js');
const {Handler:FakeDataFunction} = require('../.aws-sam/build/FakeDataFunction/fakeData.js');
const {Handler:GetClientByIdFunction} = require('../.aws-sam/build/GetClientByIdFunction/getClientById.js');
const {Handler:GetClientSaleFunction} = require('../.aws-sam/build/GetClientSaleFunction/getClientSales.js');
const {Handler:GetClientsFunction} = require('../.aws-sam/build/GetClientsFunction/getClients.js');
const {Handler:GetClientsListFunction} = require('../.aws-sam/build/GetClientsListFunction/getClientsList.js');
const {Handler:GetLogFunction} = require('../.aws-sam/build/GetLogFunction/getLogs.js');
const {Handler:GetNextDueDateFunction} = require('../.aws-sam/build/GetNextDueDateFunction/getNextDueDate.js');
const {Handler:GetProductByIdFunction} = require('../.aws-sam/build/GetProductByIdFunction/getProductById.js');
const {Handler:GetProductsFunction} = require('../.aws-sam/build/GetProductsFunction/getProducts.js');
const {Handler:GetProductWithProviderFunction} = require('../.aws-sam/build/GetProductWithProviderFunction/getProductWithProvider.js');
const {Handler:GetProviderByIdFunction} = require('../.aws-sam/build/GetProviderByIdFunction/getProviderById.js');
const {Handler:GetProvidersFunction} = require('../.aws-sam/build/GetProvidersFunction/getProviders.js');
const {Handler:GetSaleByIdFunction} = require('../.aws-sam/build/GetSaleByIdFunction/getSaleById.js');
const {Handler:GetSalesFunction} = require('../.aws-sam/build/GetSalesFunction/getSales.js');
const {Handler:GetUsersFunction} = require('../.aws-sam/build/GetUsersFunction/getUsers.js');
const {Handler:HealthFunction} = require('../.aws-sam/build/HealthFunction/health.js');
const {Handler:LoginFunction} = require('../.aws-sam/build/LoginFunction/login.js');
const {Handler:SearchClientFunction} = require('../.aws-sam/build/SearchClientFunction/searchClient.js');
const {Handler:SearchProductFunction} = require('../.aws-sam/build/SearchProductFunction/searchProduct.js');
const {Handler:SearchProviderFunction} = require('../.aws-sam/build/SearchProviderFunction/searchProvider.js');
const {Handler:SearchSaleFunction} = require('../.aws-sam/build/SearchSaleFunction/searchSale.js');
const {Handler:SyncDbFunction} = require('../.aws-sam/build/SyncDbFunction/syncDb.js');
const {Handler:UpdateClientFunction} = require('../.aws-sam/build/UpdateClientFunction/updateClient.js');
const {Handler:UpdateProductFunction} = require('../.aws-sam/build/UpdateProductFunction/updateProduct.js');
const {Handler:UpdateProviderFunction} = require('../.aws-sam/build/UpdateProviderFunction/updateProvider.js');
const {Handler:UpdateSaleFunction} = require('../.aws-sam/build/UpdateSaleFunction/updateSale.js');
const {Handler:UpdateUserFunction} = require('../.aws-sam/build/UpdateUserFunction/updateUser.js');
module.exports={
    AddDetailsToProductsFunction,
    AddOrRemoveProductsFunction,
    AddPaymentToSaleFunction,
    CountFunction,
    CreateClientFunction,
    CreateProductFunction,
    CreateProviderFunction,
    CreateSaleFunction,
    CreateUserFunction,
    DeleteClientFunction,
    DeleteProductFunction,
    DeleteProviderFunction,
    DeleteSaleFunction,
    DeleteUserFunction,
    FakeDataFunction,
    GetClientByIdFunction,
    GetClientSaleFunction,
    GetClientsFunction,
    GetClientsListFunction,
    GetLogFunction,
    GetNextDueDateFunction,
    GetProductByIdFunction,
    GetProductsFunction,
    GetProductWithProviderFunction,
    GetProviderByIdFunction,
    GetProvidersFunction,
    GetSaleByIdFunction,
    GetSalesFunction,
    GetUsersFunction,
    HealthFunction,
    LoginFunction,
    SearchClientFunction,
    SearchProductFunction,
    SearchProviderFunction,
    SearchSaleFunction,
    SyncDbFunction,
    UpdateClientFunction,
    UpdateProductFunction,
    UpdateProviderFunction,
    UpdateSaleFunction,
    UpdateUserFunction,
}