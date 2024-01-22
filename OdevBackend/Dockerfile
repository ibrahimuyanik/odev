FROM mcr.microsoft.com/dotnet/sdk:6.0 as build
WORKDIR /app
COPY MapAPI/*.csproj MapAPI/
COPY *.sln .
RUN dotnet restore
COPY . .

RUN dotnet publish -c Release -o ./publish

FROM mcr.microsoft.com/dotnet/aspnet:6.0

WORKDIR /app
COPY --from=build app/publish .

ENTRYPOINT [ "dotnet", "MapAPI.dll" ]