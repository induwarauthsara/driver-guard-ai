# GitHub to Azure Production Deployment
# Clean GitHub deployment for DriverGuard AI

Write-Host "*** DriverGuard AI - GitHub Production Deployment ***" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

$ResourceGroup = "driverguard-rg"
$AppName = "driverguardai"  # Clean production name
$AppServicePlan = "driverguard-plan"

Write-Host "[INFO] Setting up production app: $AppName" -ForegroundColor Yellow
Write-Host ""

# Delete old problematic app if it exists
Write-Host "[INFO] Cleaning up old deployments..." -ForegroundColor Yellow
az webapp delete --resource-group $ResourceGroup --name "driverguard-ai-20250626094014" --no-wait 2>$null

# Create clean production web app
Write-Host "[INFO] Creating production web app..." -ForegroundColor Yellow
az webapp create --resource-group $ResourceGroup --plan $AppServicePlan --name $AppName --runtime "PYTHON:3.9"

# Configure production app settings
Write-Host "[INFO] Configuring production settings..." -ForegroundColor Yellow
az webapp config appsettings set --resource-group $ResourceGroup --name $AppName --settings `
    SCM_DO_BUILD_DURING_DEPLOYMENT=true `
    ENABLE_ORYX_BUILD=true `
    WEBSITES_ENABLE_APP_SERVICE_STORAGE=false `
    WEBSITES_PORT=8000 `
    PORT=8000 `
    FLASK_APP=app.py `
    FLASK_ENV=production `
    WEBSITES_CONTAINER_START_TIME_LIMIT=1800

# Set production startup command
Write-Host "[INFO] Setting production startup command..." -ForegroundColor Yellow
az webapp config set --resource-group $ResourceGroup --name $AppName --startup-file "gunicorn --bind 0.0.0.0:8000 --workers 1 --timeout 600 app:app"

# Enable HTTPS only for production
Write-Host "[INFO] Enabling HTTPS-only for production..." -ForegroundColor Yellow
az webapp update --resource-group $ResourceGroup --name $AppName --https-only true

Write-Host ""
Write-Host "[SUCCESS] Production app created!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "[PRODUCTION URL] https://$AppName.azurewebsites.net" -ForegroundColor Green
Write-Host "[API ENDPOINT] https://$AppName.azurewebsites.net/api/detect" -ForegroundColor Green
Write-Host "[HEALTH CHECK] https://$AppName.azurewebsites.net/health" -ForegroundColor Green
Write-Host ""
Write-Host "[NEXT STEPS] Connect your GitHub repository:" -ForegroundColor Yellow
Write-Host "1. Create GitHub repo at: https://github.com/new" -ForegroundColor White
Write-Host "2. Repository name: 'driverguardai'" -ForegroundColor White
Write-Host "3. Upload your code files" -ForegroundColor White
Write-Host "4. Run: .\connect_github.ps1" -ForegroundColor White
Write-Host ""
Write-Host "[MONTHLY COST] ~$15-20 (Basic B1 plan)" -ForegroundColor Yellow
