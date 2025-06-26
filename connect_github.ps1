# GitHub Connection Script
# Run this after you create your GitHub repository

Write-Host "*** DriverGuard AI - GitHub Repository Connection ***" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

$ResourceGroup = "driverguard-rg"
$AppName = "driverguardai"

Write-Host "[INFO] This will connect your GitHub repository to Azure App Service" -ForegroundColor Yellow
Write-Host ""

# Prompt for GitHub repository URL
$GitHubRepo = Read-Host "Enter your GitHub repository URL (e.g., https://github.com/yourusername/driverguardai)"

if ([string]::IsNullOrWhiteSpace($GitHubRepo)) {
    Write-Host "[ERROR] GitHub repository URL is required!" -ForegroundColor Red
    exit 1
}

Write-Host "[INFO] Connecting repository: $GitHubRepo" -ForegroundColor Yellow

# Configure GitHub deployment
Write-Host "[INFO] Setting up GitHub deployment..." -ForegroundColor Yellow
az webapp deployment source config --resource-group $ResourceGroup --name $AppName --repo-url $GitHubRepo --branch ai-azure-prod --manual-integration

Write-Host "[INFO] Triggering initial deployment..." -ForegroundColor Yellow
az webapp deployment source sync --resource-group $ResourceGroup --name $AppName

Write-Host ""
Write-Host "[SUCCESS] GitHub deployment configured!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "[URL] Your app: https://$AppName.azurewebsites.net" -ForegroundColor Green
Write-Host "[API] API Endpoint: https://$AppName.azurewebsites.net/api/detect" -ForegroundColor Green
Write-Host "[HEALTH] Health Check: https://$AppName.azurewebsites.net/health" -ForegroundColor Green
Write-Host ""
Write-Host "[INFO] Deployment may take 3-5 minutes. Check status at:" -ForegroundColor Yellow
Write-Host "https://portal.azure.com → App Services → $AppName → Deployment Center" -ForegroundColor White
Write-Host ""
Write-Host "[TIP] Future updates: Just push to your GitHub repository!" -ForegroundColor Cyan
