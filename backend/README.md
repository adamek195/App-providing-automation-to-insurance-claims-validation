# App providing automation to insurance claims validation backend

The server of the web-based app providing automation to insurance claims validation. Provides appropriate web api for GUI.
The server is based on clean architecture. Uses Entity Framework for mapping objects to tables in Microsoft SQL Server.
You can browse the api through Swagger UI.

Build with:

- .NET 5.0
- ASP.NET Core
- Entity Framework
- Swagger UI
- Microsoft SQL Server
- Visual Studio 2019
- Visual Studio Code

## Packages

1. InsuranceApp.Application

- AutoMapper
- Microsoft.AspNetCore.Authentication.JwtBearer
- Newtonsoft.Json

2. InsuranceApp.Domain

- Microsoft.AspNetCore.Identity.EntityFrameworkCore

3. InsuranceApp.Infrastructure

- Microsoft.EntityFrameworkCore
- Microsoft.EntityFrameworkCore.Design
- Microsoft.EntityFrameworkCore.SqlServer
- Microsoft.EntityFrameworkCore.Tools
- Microsoft.Extensions.Identity.Core

4. InsuranceApp.WebApi

- Microsoft.EntityFrameworkCore.Design
- PdfSharpCore
- Swashbuckle.AspNetCore
- System.Drawing.Common
- System.Text.Encoding.CodePages
