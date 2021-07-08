#rm -r Model/Migrations
dotnet ef database drop -f
#dotnet ef migrations add Initial -o Model/Migrations
dotnet watch run