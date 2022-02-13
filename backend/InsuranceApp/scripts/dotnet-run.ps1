$insuranceAppWebApiDir = $PSScriptRoot.Substring(0, $PSScriptRoot.LastIndexOf("\"))

dotnet run --project $insuranceAppWebApiDir\src\InsuranceApp.WebApi\InsuranceApp.WebApi.csproj