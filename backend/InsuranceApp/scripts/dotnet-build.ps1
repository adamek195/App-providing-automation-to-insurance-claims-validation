$insuranceAppWebApiDir = $PSScriptRoot.Substring(0, $PSScriptRoot.LastIndexOf("\"))

dotnet build $insuranceAppWebApiDir\src\InsuranceApp.WebApi\InsuranceApp.WebApi.csproj